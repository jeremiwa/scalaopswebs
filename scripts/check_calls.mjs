import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from root
dotenv.config({ path: join(__dirname, '../.env') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

async function run() {
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const q = query(collection(db, "calls"), where("status", "==", "failed"), limit(10));
        const snap = await getDocs(q);
        console.log("Failed calls: " + snap.size);
        snap.forEach(d => {
            const data = d.data();
            console.log(d.id, " | Closer:", data.closerName, " | Created:", data.createdAt?.toDate?.() || data.createdAt);
        });

        // Check if there's any call from Manuel regardless of status
        const allQ = query(collection(db, "calls"), limit(50));
        const allSnap = await getDocs(allQ);
        console.log("\nRecent calls from Manuel:");
        let found = 0;
        allSnap.forEach(d => {
            const data = d.data();
            if (data.closerName && data.closerName.toLowerCase().includes('manuel')) {
                found++;
                console.log("[MANUEL]", d.id, "Status:", data.status, "Title:", data.title, "Audio:", data.audioPath || 'transcript');
            }
        });
        if (found === 0) console.log("No calls found for Manuel in the last 50 docs.");

        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}
run();
