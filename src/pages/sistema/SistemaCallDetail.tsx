import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Loader2, Bot, PhoneCall, AlertTriangle, Zap, Send } from 'lucide-react';

export const SistemaCallDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [call, setCall] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'chat'>('overview');

    // Chat state
    const [messages, setMessages] = useState<any[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatSending, setIsChatSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const MOCK_WORKSPACE_ID = 'ws_demo_grupo_riviera';

    useEffect(() => {
        if (!id) return;

        // Subscribe to call document (real-time to catch 'analyzing' -> 'analyzed')
        const unsub = onSnapshot(doc(db, 'calls', id), (docSnap) => {
            if (docSnap.exists()) {
                setCall({ id: docSnap.id, ...docSnap.data() });
            }
            setLoading(false);
        });

        // Subscribe to chat messages
        const q = query(collection(db, `calls/${id}/messages`), orderBy('createdAt', 'asc'));
        const unsubChat = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        return () => {
            unsub();
            unsubChat();
        };
    }, [id]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || !id || isChatSending) return;

        const messageText = chatInput;
        setChatInput('');
        setIsChatSending(true);

        try {
            // 1. Save user message to Firestore
            await addDoc(collection(db, `calls/${id}/messages`), {
                role: 'user',
                content: messageText,
                createdAt: serverTimestamp()
            });

            // 2. Call the AI Proxy
            const res = await fetch('/api/chat-call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    previousAnalysis: call?.analysis,
                    transcript: call?.transcript,
                    history: messages
                })
            });
            const data = await res.json();

            // 3. Save AI response to Firestore
            if (data.success && data.reply) {
                await addDoc(collection(db, `calls/${id}/messages`), {
                    role: 'assistant',
                    content: data.reply,
                    createdAt: serverTimestamp()
                });
            } else {
                console.error("Chat API returned error:", data.error);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            // Revert message if needed
            setChatInput(messageText);
        } finally {
            setIsChatSending(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" style={{ margin: '0 auto', color: 'var(--sis-accent)' }} /></div>;
    }

    if (!call) {
        return <div style={{ padding: '40px', color: 'var(--sis-text-muted)' }}>Llamada no encontrada.</div>;
    }

    const { analysis, status } = call;

    return (
        <div style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/sistema/app/calls')} className="sis-btn-outline" style={{ display: 'flex', padding: '8px' }}>
                    <ArrowLeft size={16} />
                </button>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{call.title}</h1>
                        <span className={`sis-tag sis-tag-${status === 'analyzed' ? 'green' : status === 'failed' ? 'red' : 'yellow'}`}>
                            {status === 'analyzing' && <Loader2 size={12} className="animate-spin" />}
                            {status.toUpperCase()}
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--sis-text-muted)' }}>
                        Lead: {call.leadName} • Closer: {call.closerName} • {call.callType}
                    </div>
                </div>
                {analysis?.overallScore && (
                    <div className={`sis-score-ring ${analysis.overallScore >= 80 ? 'sis-score-high' : analysis.overallScore >= 60 ? 'sis-score-mid' : 'sis-score-low'}`} style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                        {analysis.overallScore}
                    </div>
                )}
            </div>

            {status === 'analyzing' && (
                <div className="sis-card-static" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Bot size={48} style={{ color: 'var(--sis-accent)', margin: '0 auto 16px', animation: 'pulse 2s infinite' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Coach AI Analizando la Llamada...</h3>
                    <p style={{ color: 'var(--sis-text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                        Estamos transcribiendo, detectando objeciones formales y evaluando el desempeño del closer en cada etapa de la venta. Esto puede tardar unos segundos.
                    </p>
                </div>
            )}

            {status === 'failed' && (
                <div className="sis-card-static" style={{ border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
                    <div style={{ color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} /> Error en el Análisis
                    </div>
                    <p style={{ color: 'var(--sis-text-muted)', fontSize: '14px', marginTop: '8px' }}>{call.errorMessage}</p>
                </div>
            )}

            {status === 'analyzed' && analysis && (() => {
                // ── NORMALIZER: tries both v2 and v1 field names with fallbacks ──
                const a = analysis;

                const closingProb = a.closing_probability ?? a.closeProbability ?? 0;
                const riskLevel = a.risk_level ?? (closingProb < 30 ? 'Crítico' : closingProb < 70 ? 'Moderado' : 'Bajo');
                const mainObjection = a.main_objection ?? (a.primaryObjection && a.primaryObjection !== 'Null' ? a.primaryObjection : 'Ninguna');
                const talkListen = a.talk_listen_ratio ?? a.talkListenEstimate ?? 'N/A';
                const overallScore = a.overall_score ?? a.overallScore ?? 0;

                // Executive summary: structured object (v2) or parsed from string (v1)
                const execSummary = a.executive_summary ?? (() => {
                    const parts = (a.summary || '').split(/(?<=\.)\s+/).filter((s: string) => s.length > 5);
                    return { situation: parts[0] || a.summary || '', problem: parts[1] || '', impact: parts.slice(2).join(' ') || '' };
                })();

                // Key insights: typed array (v2) or built from v1 fields
                const keyInsights = a.key_insights ?? (() => {
                    const r: any[] = [];
                    const obj = a.main_objection ?? a.primaryObjection;
                    if (obj && obj !== 'Ninguna' && obj !== 'Null') r.push({ type: 'critical', title: 'Bloqueador principal', description: `Objeción: ${obj}` });
                    if (a.weaknesses?.length) r.push({ type: 'warning', title: 'Riesgo identificado', description: a.weaknesses[0] });
                    if (a.missedOpportunities?.length) r.push({ type: 'opportunity', title: 'Oportunidad perdida', description: a.missedOpportunities[0] });
                    return r.length ? r.slice(0, 3) : [{ type: 'warning', title: 'Atención', description: 'Datos insuficientes para generar insights.' }];
                })();

                // AI Recommendation
                const aiRec = a.ai_recommendation ?? {
                    suggested_phrase: a.rewrittenBetterVersion || a.recommendedPhrases?.[0] || 'Llamada muy breve para generar recomendación.',
                    why_it_works: 'Reencuadra la conversación hacia el valor y genera reflexión en el lead.'
                };

                // Top improvements: structured array (v2) or parsed from v1 strings
                const topImprovements = a.top_improvements ?? (a.improvementPlan || []).slice(0, 5).map((item: string) => {
                    const parts = item.split(/[:\.\-–—]\s*/);
                    return { title: parts[0]?.slice(0, 40) || 'Mejora', description: parts.slice(1).join('. ').trim() || item };
                });

                // Next best action
                const nextAction = a.next_best_action ?? {
                    action: a.nextBestAction || 'No se registraron próximos pasos.',
                    goal: ''
                };

                // Category scores: array of {name, score} (v2) or converted from v1 object
                const catLabels: Record<string, string> = {
                    authority: 'Autoridad', clarity: 'Claridad', closing: 'Cierre',
                    discovery: 'Descubrimiento', followUp: 'Seguimiento', objections: 'Objeciones',
                    rapport: 'Rapport', urgency: 'Urgencia'
                };
                const categoryScores: { name: string; score: number }[] = Array.isArray(a.category_scores) ? a.category_scores
                    : Array.isArray(a.categoryScores) ? a.categoryScores
                        : typeof a.categoryScores === 'object' && a.categoryScores
                            ? Object.entries(a.categoryScores).map(([k, v]: any) => ({ name: catLabels[k] || k, score: v }))
                            : [];

                const probColor = closingProb >= 70 ? '#3E8E7E' : closingProb >= 30 ? '#B98A2F' : '#D95C5C';
                const insightColors: Record<string, string> = { critical: '#D95C5C', warning: '#B98A2F', opportunity: '#3E8E7E' };

                return (
                    <div>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px' }}>
                            {(['overview', 'transcript', 'chat'] as const).map(tab => {
                                const tabLabels: Record<string, string> = { overview: 'Análisis', transcript: 'Transcripción', chat: 'Coach IA' };
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            padding: '12px 0', background: 'none', border: 'none',
                                            borderBottom: activeTab === tab ? '2px solid #00E5FF' : '2px solid transparent',
                                            color: activeTab === tab ? '#FFFFFF' : '#6B7280',
                                            fontWeight: activeTab === tab ? 600 : 400, fontSize: '13px', textTransform: 'uppercase',
                                            cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.2s',
                                            textShadow: activeTab === tab ? '0 0 10px rgba(0, 229, 255, 0.3)' : 'none'
                                        }}
                                    >
                                        {tabLabels[tab]}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ═══ OVERVIEW TAB ═══ */}
                        {activeTab === 'overview' && (() => {
                            // SVG Radar Chart Logic
                            const radarSize = 400;
                            const radarCenter = radarSize / 2;
                            const radarRadius = 130;
                            const angleStep = (Math.PI * 2) / categoryScores.length;

                            const getRadarPoint = (score: number, index: number) => {
                                const angle = index * angleStep - Math.PI / 2;
                                const distance = (score / 100) * radarRadius;
                                return {
                                    x: radarCenter + distance * Math.cos(angle),
                                    y: radarCenter + distance * Math.sin(angle)
                                };
                            };

                            const radarPathData = categoryScores.map((d, i) => {
                                const p = getRadarPoint(d.score, i);
                                return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                            }).join(' ') + ' Z';

                            const sortedCategories = [...categoryScores].sort((a, b) => b.score - a.score);
                            const topStrengths = sortedCategories.slice(0, 2);
                            const topWeaknesses = sortedCategories.slice(-2).reverse();

                            const probColorPrimary = closingProb >= 70 ? '#00E5FF' : closingProb >= 30 ? '#5468FF' : '#FF2A55';

                            return (
                                <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                    {/* ── ROW 1: PREMIUM HERO ── */}
                                    <div style={{
                                        background: 'radial-gradient(ellipse at top right, rgba(79, 174, 157, 0.08) 0%, rgba(11, 15, 20, 1) 70%)',
                                        backgroundColor: '#0B0F14',
                                        border: '1px solid #232B36',
                                        borderRadius: '16px', padding: '40px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                        position: 'relative', overflow: 'hidden'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '32px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#A3AFBD', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Probabilidad de Cierre</span>
                                                    <div style={{
                                                        padding: '4px 10px', background: `rgba(255,255,255,0.03)`,
                                                        border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '6px',
                                                        fontSize: '10px', fontWeight: 600, color: probColorPrimary,
                                                        letterSpacing: '0.04em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px'
                                                    }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: probColorPrimary, boxShadow: `0 0 8px ${probColorPrimary}` }} />
                                                        Riesgo {riskLevel}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                                                    <div style={{
                                                        fontSize: '80px', fontWeight: 700, lineHeight: 0.9,
                                                        color: '#F5F7FA', letterSpacing: '-0.04em',
                                                        fontFamily: 'var(--sis-font-sans)'
                                                    }}>
                                                        {closingProb}<span style={{ fontSize: '40px', fontWeight: 600, marginLeft: '2px', color: probColorPrimary }}>%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                                                <div style={{ fontSize: '10px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '8px' }}>Interpretación del IA</div>
                                                <p style={{ fontSize: '16px', color: '#E6EDF3', fontWeight: 400, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
                                                    {closingProb >= 70 ? 'Alto potencial de conversión asegurada con seguimiento estructural.' : closingProb >= 40 ? 'Oportunidad en riesgo moderado. Requiere clarificación de valor urgente.' : 'Alta probabilidad de pérdida si no hay recuperación táctica profunda en la próxima interacción.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── DIAGNOSTIC WIDGETS (4 COLUMNS) ── */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>

                                        {/* Widget 1: Habla / Escucha */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
                                                <svg width="56" height="56" viewBox="0 0 36 36">
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0033FF" strokeWidth="4" strokeDasharray={`${Number(talkListen.split('/')[0])}, 100`} />
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00E5FF" strokeWidth="4" strokeDasharray={`${Number(talkListen.split('/')[1])}, 100`} strokeDashoffset={`-${Number(talkListen.split('/')[0])}`} style={{ filter: 'drop-shadow(0 0 4px rgba(0,229,255,0.5))' }} />
                                                </svg>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Relación Habla/Escucha</div>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                    <span style={{ fontSize: '24px', fontWeight: 400, color: '#FFFFFF', fontFamily: 'var(--sis-font-mono)', letterSpacing: '-0.02em' }}>{talkListen.split('/')[0]}</span>
                                                    <span style={{ fontSize: '14px', color: '#00E5FF', fontFamily: 'var(--sis-font-mono)' }}>/ {talkListen.split('/')[1]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Widget 2: Objeción */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '12px' }}>Fricción Principal</div>
                                            <div style={{ fontSize: '15px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.01em', marginBottom: '12px', lineHeight: 1.3 }}>{mainObjection || 'Ninguna'}</div>
                                            <div>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(255, 42, 85, 0.08)', border: '1px solid rgba(255, 42, 85, 0.2)', borderRadius: '6px', fontSize: '10px', color: '#FF2A55', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF2A55', boxShadow: '0 0 8px #FF2A55' }} /> Bloqueante Crítico
                                                </span>
                                            </div>
                                        </div>

                                        {/* Widget 3: Score General */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
                                                <svg width="56" height="56" viewBox="0 0 36 36">
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={probColorPrimary} strokeWidth="4" strokeDasharray={`${overallScore}, 100`} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${probColorPrimary}80)` }} />
                                                </svg>
                                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '14px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--sis-font-mono)' }}>{overallScore}</div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Score General</div>
                                                <div style={{ fontSize: '13px', color: '#A0AAB5', fontWeight: 300 }}>Calidad técnica</div>
                                            </div>
                                        </div>

                                        {/* Widget 4: Puntuación Closer */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.05))' }} />
                                            <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '8px', zIndex: 1 }}>Score del Closer</div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px', zIndex: 1 }}>
                                                <span style={{ fontSize: '28px', fontWeight: 400, color: '#FFFFFF', fontFamily: 'var(--sis-font-mono)', letterSpacing: '-0.04em' }}>{(overallScore / 10).toFixed(1)}</span>
                                                <span style={{ fontSize: '14px', color: '#00E5FF', fontWeight: 400, fontFamily: 'var(--sis-font-mono)' }}>/ 10</span>
                                            </div>
                                            <div style={{ fontSize: '10px', color: probColorPrimary, fontWeight: 600, letterSpacing: '0.02em', zIndex: 1, textShadow: `0 0 10px ${probColorPrimary}40` }}>
                                                {overallScore >= 70 ? 'SUPERIOR AL ESTÁNDAR' : overallScore >= 40 ? 'PERFORMANCE MEDIA' : 'CRÍTICO: RIESGO DE DESEMPEÑO'}
                                            </div>
                                        </div>

                                    </div>

                                    {/* ── ROW 3: RADAR & STRENGTHS ── */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="md:!grid-cols-[1.5fr_1fr]">

                                        {/* Left: Radar */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ position: 'relative', width: radarSize, height: radarSize, flexShrink: 0 }}>
                                                <svg width={radarSize} height={radarSize} style={{ overflow: 'visible' }}>
                                                    {/* Defs for subtle gradients */}
                                                    <defs>
                                                        <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                                                            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
                                                            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                                                        </radialGradient>
                                                    </defs>

                                                    {/* Background Grid Rings */}
                                                    {[20, 40, 60, 80, 100].map(percentage => {
                                                        const r = (percentage / 100) * radarRadius;
                                                        return (
                                                            <polygon key={percentage}
                                                                points={categoryScores.map((_, i) => `${radarCenter + r * Math.cos(i * angleStep - Math.PI / 2)},${radarCenter + r * Math.sin(i * angleStep - Math.PI / 2)}`).join(' ')}
                                                                fill={percentage === 100 ? "url(#radarBg)" : "none"}
                                                                stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1"
                                                            />
                                                        );
                                                    })}

                                                    {/* Spokes */}
                                                    {categoryScores.map((_, i) => (
                                                        <line key={i} x1={radarCenter} y1={radarCenter}
                                                            x2={radarCenter + radarRadius * Math.cos(i * angleStep - Math.PI / 2)}
                                                            y2={radarCenter + radarRadius * Math.sin(i * angleStep - Math.PI / 2)}
                                                            stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                                    ))}

                                                    {/* Data Area */}
                                                    <path d={radarPathData} fill="rgba(0, 229, 255, 0.15)" stroke="#00E5FF" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.2))' }} />

                                                    {/* Data Nodes */}
                                                    {categoryScores.map((d, i) => {
                                                        const p = getRadarPoint(d.score, i);
                                                        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#000000" stroke="#00E5FF" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px #00E5FF)' }} />;
                                                    })}
                                                </svg>
                                                {/* Labels */}
                                                {categoryScores.map((d, i) => {
                                                    const angle = i * angleStep - Math.PI / 2;
                                                    const p = {
                                                        x: radarCenter + (radarRadius + 40) * Math.cos(angle),
                                                        y: radarCenter + (radarRadius + 40) * Math.sin(angle)
                                                    };
                                                    return (
                                                        <div key={i} style={{
                                                            position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)',
                                                            fontSize: '11px', color: '#8B949E', fontWeight: 500, whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase'
                                                        }}>
                                                            {d.name} <span style={{ color: '#E6EDF3', marginLeft: '6px', fontFamily: 'var(--sis-font-mono)' }}>{d.score}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Right: Strengths & Weaknesses */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                            <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', flex: 1, boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                                <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} /> Fortalezas
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                    {topStrengths.map(s => (
                                                        <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
                                                            <span style={{ fontSize: '15px', color: '#F5F7FA', fontWeight: 300, letterSpacing: '-0.01em' }}>{s.name}</span>
                                                            <span style={{ fontSize: '14px', color: '#00E5FF', fontFamily: 'var(--sis-font-mono)', fontWeight: 500 }}>{s.score}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', flex: 1, boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                                <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF2A55', boxShadow: '0 0 8px #FF2A55' }} /> Puntos Críticos
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                    {topWeaknesses.map(s => (
                                                        <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
                                                            <span style={{ fontSize: '15px', color: '#F5F7FA', fontWeight: 300, letterSpacing: '-0.01em' }}>{s.name}</span>
                                                            <span style={{ fontSize: '14px', color: '#FF2A55', fontFamily: 'var(--sis-font-mono)', fontWeight: 500 }}>{s.score}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── ROW 4: DIAGNÓSTICO INTEGRAL ── */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', paddingTop: '16px' }} className="md:!grid-cols-[1fr_2.5fr]">
                                        {/* Modulo Izquierdo: Momento Crítico */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', borderLeft: '4px solid #FF2A55', display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF2A55" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                Momento Crítico
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
                                                <div style={{ fontSize: '24px', fontWeight: 400, color: '#FF2A55', fontFamily: 'var(--sis-font-mono)', letterSpacing: '-0.02em', textShadow: '0 0 10px rgba(255,42,85,0.4)' }}>{(call as any).critical_moment?.time || '14:22'}</div>
                                                <div style={{ fontSize: '15px', color: '#F5F7FA', fontWeight: 300, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
                                                    {(call as any).critical_moment?.description || 'El prospecto duda del ROI a corto plazo; el vendedor responde con características técnicas en lugar de reafirmar el caso de negocio.'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Modulo Derecho: Resumen y Alertas Tácticas */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <div>
                                                <h3 style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', marginTop: 0 }}>Resumen Ejecutivo</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                                                    {[
                                                        { label: 'Situación Actual', value: execSummary.situation },
                                                        { label: 'Problema Principal', value: execSummary.problem },
                                                        { label: 'Impacto en el Negocio', value: execSummary.impact }
                                                    ].filter(s => s.value).map((s, idx) => (
                                                        <div key={idx}>
                                                            <span style={{ fontSize: '11px', fontWeight: 500, color: '#A0AAB5', display: 'block', marginBottom: '8px' }}>{s.label}</span>
                                                            <p style={{ fontSize: '15px', color: '#FFFFFF', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{s.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />

                                            <div>
                                                <h3 style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', marginTop: 0 }}>Alertas Tácticas</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                                    {keyInsights.map((insight: any, idx: number) => {
                                                        const ic = { critical: '#FF2A55', warning: '#5468FF', opportunity: '#00E5FF' }[insight.type as string] || '#5468FF';
                                                        return (
                                                            <div key={idx} style={{
                                                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px',
                                                                borderLeft: `3px solid ${ic}`, display: 'flex', flexDirection: 'column', gap: '8px'
                                                            }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ic, boxShadow: `0 0 8px ${ic}80` }} />
                                                                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                                                                        {insight.title}
                                                                    </div>
                                                                </div>
                                                                <div style={{ fontSize: '14px', color: '#A0AAB5', lineHeight: 1.5, fontWeight: 300, paddingLeft: '14px' }}>{insight.description}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── ROW 5: PLAYBACK TÁCTICO ── */}
                                    <div style={{ paddingTop: '16px' }}>
                                        <div style={{ background: 'radial-gradient(ellipse at center, rgba(0, 51, 255, 0.15) 0%, rgba(0, 0, 0, 1) 100%)', backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ fontSize: '9px', color: '#00E5FF', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px #00E5FF)' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                Playback Táctico
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
                                                <p style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 300, lineHeight: 1.4, margin: 0, fontStyle: 'italic', letterSpacing: '-0.01em', textShadow: '0 0 20px rgba(0, 51, 255, 0.2)' }}>
                                                    "{aiRec.suggested_phrase}"
                                                </p>
                                                {aiRec.why_it_works && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                                                        <span style={{ fontSize: '9px', color: '#8B949E', fontWeight: 600, letterSpacing: '0.15em', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '12px' }}>POR QUÉ FUNCIONA</span>
                                                        <span style={{ fontSize: '14px', color: '#A0AAB5', fontWeight: 300 }}>{aiRec.why_it_works}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── ROW 6: ROADMAP & NEXT BEST ACTION ── */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', paddingTop: '16px' }} className="md:!grid-cols-2">

                                        {/* Roadmap de Mejora */}
                                        <div style={{ background: '#06080A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', boxShadow: 'inset 0 0 20px rgba(0, 51, 255, 0.03)' }}>
                                            <h3 style={{ fontSize: '9px', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '32px', marginTop: 0 }}>Roadmap de Mejora</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                {topImprovements.map((item: any, idx: number) => (
                                                    <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', borderBottom: idx < topImprovements.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none', paddingBottom: idx < topImprovements.length - 1 ? '20px' : '0' }}>
                                                        <div style={{
                                                            fontSize: '15px', color: '#00E5FF', fontFamily: 'var(--sis-font-mono)', fontWeight: 400, paddingTop: '2px'
                                                        }}>
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '15px', fontWeight: 400, color: '#FFFFFF', marginBottom: '6px', letterSpacing: '-0.01em' }}>{item.title}</div>
                                                            <div style={{ fontSize: '14px', color: '#A0AAB5', lineHeight: 1.5, fontWeight: 300 }}>{item.description}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {topImprovements.length === 0 && (
                                                    <p style={{ fontSize: '14px', color: '#8B949E' }}>Sin datos suficientes.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Próxima Mejor Acción */}
                                        <div style={{ background: '#000000', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 30px rgba(0, 51, 255, 0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.05))', pointerEvents: 'none' }} />
                                            <div style={{ fontSize: '9px', color: '#00E5FF', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center', zIndex: 1 }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 12px #00E5FF' }} />
                                                Próxima Mejor Acción
                                            </div>

                                            <p style={{ fontSize: '22px', color: '#FFFFFF', lineHeight: 1.4, margin: 0, fontWeight: 300, marginBottom: '24px', letterSpacing: '-0.01em', zIndex: 1, textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>{nextAction.action}</p>

                                            {nextAction.goal && (
                                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '2px solid rgba(0, 229, 255, 0.3)', zIndex: 1 }}>
                                                    <span style={{ fontSize: '9px', color: '#8B949E', fontWeight: 600, letterSpacing: '0.15em', marginTop: '2px' }}>OBJETIVO TÁCTICO</span>
                                                    <span style={{ fontSize: '14px', color: '#A0AAB5', fontWeight: 300, lineHeight: 1.5 }}>{nextAction.goal}</span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })()}

                        {activeTab === 'transcript' && (
                            <div className="sis-card-static">
                                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: 'var(--sis-text-primary)' }}>Transcripción Original</h3>
                                <div style={{ background: 'var(--sis-bg-secondary)', padding: '20px', borderRadius: '8px', fontSize: '14px', lineHeight: 1.6, color: 'var(--sis-text-secondary)', whiteSpace: 'pre-wrap', maxHeight: '600px', overflowY: 'auto' }}>
                                    {call.transcript || 'Transcripción no disponible.'}
                                </div>
                            </div>
                        )}

                        {activeTab === 'chat' && (
                            <div className="sis-card-static" style={{ height: '600px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: '16px', borderBottom: '1px solid var(--sis-border)', background: 'var(--sis-bg-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Bot style={{ color: 'var(--sis-accent)' }} size={24} />
                                    <div>
                                        <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--sis-text-primary)' }}>Coach de Ventas IA</h3>
                                        <p style={{ fontSize: '12px', color: 'var(--sis-text-muted)', margin: 0 }}>Consultá dudas específicas sobre esta llamada (ej: "¿Cómo debería haber respondido al minuto 5?")</p>
                                    </div>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {messages.length === 0 && (
                                        <div style={{ textAlign: 'center', color: 'var(--sis-text-muted)', margin: 'auto 0', fontSize: '14px' }}>
                                            No hay mensajes. Hacé una pregunta para empezar.
                                        </div>
                                    )}
                                    {messages.map(msg => (
                                        <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                            <div style={{
                                                background: msg.role === 'user' ? 'var(--sis-accent)' : 'var(--sis-bg-secondary)',
                                                color: msg.role === 'user' ? 'white' : 'var(--sis-text-primary)',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                                                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
                                                fontSize: '14px',
                                                lineHeight: 1.5,
                                                border: msg.role !== 'user' ? '1px solid var(--sis-border)' : 'none'
                                            }}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isChatSending && (
                                        <div style={{ alignSelf: 'flex-start', padding: '12px 16px', background: 'var(--sis-bg-secondary)', borderRadius: '12px', borderBottomLeftRadius: '4px', border: '1px solid var(--sis-border)' }}>
                                            <Loader2 size={16} className="animate-spin" style={{ color: 'var(--sis-text-muted)' }} />
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div style={{ padding: '16px', borderTop: '1px solid var(--sis-border)' }}>
                                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            className="sis-input"
                                            style={{ flex: 1 }}
                                            placeholder="Preguntale al Coach IA sobre esta llamada..."
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            disabled={isChatSending}
                                        />
                                        <button type="submit" className="sis-btn" disabled={!chatInput.trim() || isChatSending} style={{ padding: '10px 16px' }}>
                                            {isChatSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })()}
        </div>
    );
};
