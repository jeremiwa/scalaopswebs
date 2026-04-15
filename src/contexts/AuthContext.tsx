import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    activeWorkspaceId: string | null;
    setActiveWorkspaceId: (id: string | null) => void;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

/**
 * Upserts user document in Firestore on every login.
 * Creates the doc and a default workspace on first login.
 */
async function provisionUserAndWorkspace(firebaseUser: User): Promise<string | null> {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    let defaultWorkspaceId = null;

    if (!userSnap.exists()) {
        // --- 1. Create Workspace ---
        const wsRef = doc(collection(db, 'workspaces'));
        defaultWorkspaceId = wsRef.id;
        const wsName = firebaseUser.displayName ? `Espacio de ${firebaseUser.displayName.split(' ')[0]}` : 'Mi Espacio de Trabajo';

        await setDoc(wsRef, {
            workspaceId: wsRef.id,
            name: wsName,
            createdAt: serverTimestamp()
        });

        // --- 2. Create Workspace Membership (Role: Owner) ---
        const memberRef = doc(db, 'workspace_members', `${wsRef.id}_${firebaseUser.uid}`);
        await setDoc(memberRef, {
            workspaceId: wsRef.id,
            userId: firebaseUser.uid,
            role: 'owner',
            status: 'active',
            createdAt: serverTimestamp()
        });

        // --- 3. Create User Doc ---
        await setDoc(userRef, {
            uid: firebaseUser.uid,
            fullName: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || null,
            globalRole: 'user',
            status: 'active',
            defaultWorkspaceId: wsRef.id,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
        });
    } else {
        // Exists: update last login and get active workspace
        defaultWorkspaceId = userSnap.data().defaultWorkspaceId || null;

        // --- EDGE CASE: Legacy user has no workspace assigned ---
        if (!defaultWorkspaceId) {
            const membersRef = collection(db, 'workspace_members');
            const q = query(membersRef, where('userId', '==', firebaseUser.uid));
            const memberSnaps = await getDocs(q);

            if (!memberSnaps.empty) {
                // Fallback to the first workspace they are part of
                defaultWorkspaceId = memberSnaps.docs[0].data().workspaceId;
            } else {
                // Create a net-new workspace for this legacy user
                const wsRef = doc(collection(db, 'workspaces'));
                defaultWorkspaceId = wsRef.id;
                const wsName = firebaseUser.displayName ? `Espacio de ${firebaseUser.displayName.split(' ')[0]}` : 'Mi Espacio de Trabajo';

                await setDoc(wsRef, {
                    workspaceId: wsRef.id,
                    name: wsName,
                    createdAt: serverTimestamp()
                });

                const memberRef = doc(db, 'workspace_members', `${wsRef.id}_${firebaseUser.uid}`);
                await setDoc(memberRef, {
                    workspaceId: wsRef.id,
                    userId: firebaseUser.uid,
                    role: 'owner',
                    status: 'active',
                    createdAt: serverTimestamp()
                });
            }

            // Update the user doc to store this discovered/created workspace ID
            await setDoc(userRef, {
                defaultWorkspaceId: defaultWorkspaceId,
                lastLoginAt: serverTimestamp()
            }, { merge: true });
        } else {
            await setDoc(userRef, {
                fullName: firebaseUser.displayName || '',
                photoURL: firebaseUser.photoURL || null,
                lastLoginAt: serverTimestamp(),
            }, { merge: true });
        }
    }

    return defaultWorkspaceId;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const wsId = await provisionUserAndWorkspace(firebaseUser);
                    setActiveWorkspaceId(wsId);
                } catch (err) {
                    console.error('Error provisioning user/workspace:', err);
                }
            } else {
                setActiveWorkspaceId(null);
            }

            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, activeWorkspaceId, setActiveWorkspaceId, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
