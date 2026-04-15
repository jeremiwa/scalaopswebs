/**
 * Seed script for Firestore — Creates demo data for Scala SaaS.
 *
 * Usage:
 *   npx tsx scripts/seed-firestore.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

// Replace string literals with actual values from .env usually, but since it's a script we can hardcode for the public project.
const firebaseConfig = {
    apiKey: "AIzaSyByIWVW0L6d8Zz1gzl6Pbh21RZPM1LKiiY",
    authDomain: "scala-1a776.firebaseapp.com",
    projectId: "scala-1a776"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const now = Timestamp.now();
const ago = (days: number) => Timestamp.fromDate(new Date(Date.now() - days * 86400_000));

// ─── Demo IDs ───
const DEMO_WORKSPACE_ID = 'ws_demo_grupo_riviera';
const DEMO_USERS = {
    owner: 'user_demo_jeremias',
    sales1: 'user_demo_maria',
    sales2: 'user_demo_carlos',
    manager: 'user_demo_ana',
    analyst: 'user_demo_lucas',
};

async function seed() {
    console.log('🌱 Seeding Firestore using Client SDK...\n');

    // ─── 1. Users ───
    console.log('👤 Creating users...');
    const users = [
        { uid: DEMO_USERS.owner, fullName: 'Jeremias Walsh', email: 'jeremias@scalaops.com', photoURL: null, globalRole: 'superadmin', status: 'active' },
        { uid: DEMO_USERS.sales1, fullName: 'María García', email: 'maria@gruporiviera.com', photoURL: null, globalRole: 'user', status: 'active' },
        { uid: DEMO_USERS.sales2, fullName: 'Carlos Rodríguez', email: 'carlos@gruporiviera.com', photoURL: null, globalRole: 'user', status: 'active' },
        { uid: DEMO_USERS.manager, fullName: 'Ana Pérez', email: 'ana@gruporiviera.com', photoURL: null, globalRole: 'user', status: 'active' },
        { uid: DEMO_USERS.analyst, fullName: 'Lucas Martínez', email: 'lucas@gruporiviera.com', photoURL: null, globalRole: 'user', status: 'active' },
    ];
    for (const u of users) {
        await setDoc(doc(db, 'users', u.uid), { ...u, createdAt: ago(30), lastLoginAt: now }, { merge: true });
    }

    // ─── 2. Workspace ───
    console.log('🏢 Creating workspace...');
    await setDoc(doc(db, 'workspaces', DEMO_WORKSPACE_ID), {
        name: 'Grupo Riviera',
        companyName: 'Riviera Desarrollos SA',
        slug: 'grupo-riviera',
        ownerUserId: DEMO_USERS.owner,
        plan: 'pro',
        status: 'active',
        createdAt: ago(30),
        updatedAt: now,
    });

    // ─── 3. Workspace Members ───
    console.log('👥 Creating workspace members...');
    const members = [
        { userId: DEMO_USERS.owner, role: 'owner' },
        { userId: DEMO_USERS.sales1, role: 'sales' },
        { userId: DEMO_USERS.sales2, role: 'sales' },
        { userId: DEMO_USERS.manager, role: 'manager' },
        { userId: DEMO_USERS.analyst, role: 'analyst' },
    ];
    for (const m of members) {
        await setDoc(doc(db, 'workspace_members', `${DEMO_WORKSPACE_ID}_${m.userId}`), {
            workspaceId: DEMO_WORKSPACE_ID,
            userId: m.userId,
            role: m.role,
            invitedBy: DEMO_USERS.owner,
            invitedAt: ago(30),
            joinedAt: ago(29),
            status: 'active',
        });
    }

    // ─── 4. Conversations ───
    console.log('💬 Creating conversations...');
    const conversations = [
        { contactName: 'Roberto Méndez', channel: 'whatsapp', contactPhone: '+5411 5555-0101', assignedTo: DEMO_USERS.sales1, stage: 'negotiation', conversationScore: 78, responseTimeMinutes: 12, leakDetected: false, followUpNeeded: false, objectionMain: null },
        { contactName: 'Laura Fernández', channel: 'instagram', contactHandle: '@laurafernandez', assignedTo: DEMO_USERS.sales1, stage: 'proposal', conversationScore: 92, responseTimeMinutes: 5, leakDetected: false, followUpNeeded: false, objectionMain: null },
        { contactName: 'Martín Suárez', channel: 'whatsapp', contactPhone: '+5411 5555-0202', assignedTo: DEMO_USERS.sales2, stage: 'contacted', conversationScore: 45, responseTimeMinutes: 340, leakDetected: true, followUpNeeded: true, objectionMain: 'precio' },
        { contactName: 'Sofía Ramírez', channel: 'email', contactPhone: null, assignedTo: DEMO_USERS.sales2, stage: 'new', conversationScore: 20, responseTimeMinutes: 1440, leakDetected: true, followUpNeeded: true, objectionMain: null },
        { contactName: 'Diego Torres', channel: 'whatsapp', contactPhone: '+5411 5555-0303', assignedTo: DEMO_USERS.sales1, stage: 'closed_won', conversationScore: 95, responseTimeMinutes: 8, leakDetected: false, followUpNeeded: false, objectionMain: null },
        { contactName: 'Valentina López', channel: 'instagram', contactHandle: '@valelop', assignedTo: null, stage: 'new', conversationScore: 10, responseTimeMinutes: null, leakDetected: true, followUpNeeded: true, objectionMain: null },
        { contactName: 'Andrés Gutiérrez', channel: 'whatsapp', contactPhone: '+5411 5555-0404', assignedTo: DEMO_USERS.sales2, stage: 'negotiation', conversationScore: 65, responseTimeMinutes: 45, leakDetected: false, followUpNeeded: true, objectionMain: 'timing' },
        { contactName: 'Camila Herrera', channel: 'phone', contactPhone: '+5411 5555-0505', assignedTo: DEMO_USERS.sales1, stage: 'proposal', conversationScore: 88, responseTimeMinutes: 3, leakDetected: false, followUpNeeded: false, objectionMain: 'competencia' },
    ];
    for (const c of conversations) {
        await addDoc(collection(db, 'conversations'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...c,
            contactPhone: c.contactPhone || null,
            contactHandle: (c as any).contactHandle || null,
            status: 'active',
            tags: [],
            aiSummary: null,
            lastMessageAt: ago(Math.floor(Math.random() * 5)),
            createdAt: ago(Math.floor(Math.random() * 20) + 5),
            updatedAt: now,
        });
    }

    // ─── 5. Insights ───
    console.log('💡 Creating insights...');
    const insights = [
        { type: 'leak', title: '12 leads sin respuesta > 24h', description: 'Hay 12 conversaciones sin respuesta en as últimas 24 horas. Esto representa un riesgo de pérdida de $47,800 en revenue potencial.', severity: 'critical' },
        { type: 'performance', title: 'María G. lidera en conversión', description: 'María García tiene una tasa de conversión del 34%, 2x por encima del promedio del equipo.', severity: 'low' },
        { type: 'objection', title: '"Precio" es la objeción #1', description: 'El 42% de las objeciones detectadas mencionan precio. Se recomienda preparar templates de respuesta.', severity: 'medium' },
        { type: 'trend', title: 'Caída de leads en Instagram -18%', description: 'Los leads de Instagram cayeron 18% vs semana anterior. Revisar campaña activa.', severity: 'high' },
        { type: 'opportunity', title: '3 deals listos para cierre', description: 'Tres oportunidades están en etapa de propuesta con score > 85. Priorizar follow-up.', severity: 'medium' },
    ];
    for (const ins of insights) {
        await addDoc(collection(db, 'insights'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...ins,
            relatedConversationId: null,
            relatedUserId: null,
            status: 'new',
            createdAt: ago(Math.floor(Math.random() * 3)),
        });
    }

    // ─── 6. Leaks ───
    console.log('🚰 Creating leaks...');
    const leaks = [
        { category: 'no_response', summary: 'Lead Roberto Méndez esperó 6 horas sin respuesta en WhatsApp', severity: 'high', estimatedRevenueLost: 8500, ownerUserId: DEMO_USERS.sales2 },
        { category: 'slow_response', summary: 'Tiempo de respuesta promedio 5.6h en Instagram, 3x arriba del target', severity: 'medium', estimatedRevenueLost: 12000, ownerUserId: null },
        { category: 'dropped_follow_up', summary: 'Sofía Ramírez no recibió follow-up después de mostrar interés', severity: 'critical', estimatedRevenueLost: 15000, ownerUserId: DEMO_USERS.sales2 },
        { category: 'missed_objection', summary: 'Objeción de precio no resuelta con Martín Suárez', severity: 'high', estimatedRevenueLost: 6500, ownerUserId: DEMO_USERS.sales2 },
        { category: 'no_close_attempt', summary: 'Deal con Andrés Gutiérrez en negociación sin intento de cierre en 5 días', severity: 'medium', estimatedRevenueLost: 5800, ownerUserId: DEMO_USERS.sales2 },
    ];
    for (const l of leaks) {
        await addDoc(collection(db, 'leaks'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...l,
            source: 'ai_detection',
            conversationId: null,
            stage: 'negotiation',
            status: 'open',
            createdAt: ago(Math.floor(Math.random() * 7)),
        });
    }

    // ─── 7. Recommendations ───
    console.log('🎯 Creating recommendations...');
    const recommendations = [
        { type: 'follow_up', title: 'Recontactar 12 leads sin respuesta', actionText: 'Enviar mensaje de seguimiento personalizado a cada lead que no recibió respuesta en las últimas 48h', priority: 'urgent' },
        { type: 'response_template', title: 'Crear template para objeción de precio', actionText: 'Preparar 3 variantes de respuesta para cuando el prospecto menciona que el precio es alto', priority: 'high' },
        { type: 'reassign', title: 'Reasignar leads de Carlos R.', actionText: 'Carlos tiene 8 leads activos sin contactar. Redistribuir entre María y Ana.', priority: 'high' },
        { type: 'training', title: 'Capacitación en cierre para equipo', actionText: 'El ratio de cierre bajó 12% este mes. Agendar sesión de role-play.', priority: 'medium' },
    ];
    for (const r of recommendations) {
        await addDoc(collection(db, 'recommendations'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...r,
            relatedTo: null,
            status: 'pending',
            createdAt: ago(Math.floor(Math.random() * 3)),
        });
    }

    // ─── 8. Opportunities ───
    console.log('💰 Creating opportunities...');
    const opportunities = [
        { name: 'Proyecto Nordelta - Lote 42', contactName: 'Roberto Méndez', source: 'whatsapp', ownerUserId: DEMO_USERS.sales1, stage: 'negotiation', value: 85000, nextStep: 'Enviar propuesta actualizada' },
        { name: 'Depto Recoleta 3amb', contactName: 'Laura Fernández', source: 'instagram', ownerUserId: DEMO_USERS.sales1, stage: 'proposal', value: 120000, nextStep: 'Agendar visita' },
        { name: 'Oficina Palermo', contactName: 'Andrés Gutiérrez', source: 'referral', ownerUserId: DEMO_USERS.sales2, stage: 'negotiation', value: 45000, nextStep: 'Resolver objeción de timing' },
        { name: 'Casa Pilar Country', contactName: 'Camila Herrera', source: 'web', ownerUserId: DEMO_USERS.sales1, stage: 'proposal', value: 95000, nextStep: 'Confirmar financiación' },
        { name: 'Local Comercial CABA', contactName: 'Diego Torres', source: 'whatsapp', ownerUserId: DEMO_USERS.sales1, stage: 'closed_won', value: 67000, nextStep: null },
    ];
    for (const o of opportunities) {
        await addDoc(collection(db, 'opportunities'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...o,
            currency: 'USD',
            lastContactAt: ago(Math.floor(Math.random() * 5)),
            status: 'active',
            createdAt: ago(Math.floor(Math.random() * 20) + 5),
            updatedAt: now,
        });
    }

    // ─── 9. Tasks ───
    console.log('✅ Creating tasks...');
    const tasks = [
        { title: 'Recontactar a Sofía Ramírez por WhatsApp', assignedTo: DEMO_USERS.sales2, priority: 'urgent', dueDate: ago(-1) },
        { title: 'Preparar propuesta para Laura Fernández', assignedTo: DEMO_USERS.sales1, priority: 'high', dueDate: ago(-2) },
        { title: 'Revisar objeciones de precio con Carlos', assignedTo: DEMO_USERS.manager, priority: 'medium', dueDate: ago(-3) },
        { title: 'Actualizar pipeline semanal', assignedTo: DEMO_USERS.analyst, priority: 'low', dueDate: ago(-5) },
    ];
    for (const t of tasks) {
        await addDoc(collection(db, 'tasks'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...t,
            relatedConversationId: null,
            relatedOpportunityId: null,
            status: 'pending',
            createdAt: ago(2),
        });
    }

    // ─── 10. Channels ───
    console.log('📡 Creating channels...');
    const channels = [
        { type: 'whatsapp', connected: true, accountName: '+54 11 5555-0000', externalId: 'wa_001' },
        { type: 'instagram', connected: true, accountName: '@gruporiviera', externalId: 'ig_001' },
        { type: 'email', connected: true, accountName: 'ventas@gruporiviera.com', externalId: null },
        { type: 'webchat', connected: false, accountName: null, externalId: null },
    ];
    for (const ch of channels) {
        await addDoc(collection(db, 'channels'), {
            workspaceId: DEMO_WORKSPACE_ID,
            ...ch,
            status: ch.connected ? 'active' : 'pending',
            createdAt: ago(25),
        });
    }

    // ─── 11. AI Agent Settings ───
    console.log('🤖 Creating AI agent settings...');
    await setDoc(doc(db, 'ai_agent_settings', DEMO_WORKSPACE_ID), {
        workspaceId: DEMO_WORKSPACE_ID,
        active: true,
        tone: 'friendly',
        language: 'es',
        escalationRules: { triggerKeywords: ['hablar con gerente', 'quiero cancelar', 'no me interesa'], assignTo: DEMO_USERS.manager },
        goals: ['Reducir tiempo de respuesta a <15min', 'Aumentar tasa de cierre 20%', 'Eliminar leads sin contactar >24h'],
        knowledgeBase: { status: 'ready', docCount: 24 },
        autoReply: true,
        maxAutoReplies: 3,
        updatedAt: now,
    });

    // ─── 12. Reports ───
    console.log('📊 Creating reports...');
    const weeklyReport = {
        workspaceId: DEMO_WORKSPACE_ID,
        period: 'weekly',
        periodStart: ago(7),
        periodEnd: now,
        leakageScore: 72,
        totalLeads: 1284,
        lostOpportunities: 23,
        recoverableRevenue: 47800,
        avgResponseTimeMinutes: 252,
        closedWon: 12,
        closedLost: 8,
        teamSnapshot: [
            { userId: DEMO_USERS.sales1, name: 'María G.', score: 92, deals: 24 },
            { userId: DEMO_USERS.sales2, name: 'Carlos R.', score: 67, deals: 19 },
            { userId: DEMO_USERS.manager, name: 'Ana P.', score: 87, deals: 15 },
            { userId: DEMO_USERS.analyst, name: 'Lucas M.', score: 78, deals: 11 },
        ],
        createdAt: now,
    };
    await addDoc(collection(db, 'reports'), weeklyReport);

    console.log('\n✅ Seed complete! All 12 collections populated.');
    console.log('   Open Firebase Console → Firestore to verify.');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
