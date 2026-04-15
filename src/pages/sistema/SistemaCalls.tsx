import { useEffect, useState } from 'react';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, Plus, Clock, Search, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const SistemaCalls = () => {
    const navigate = useNavigate();
    const { user, activeWorkspaceId } = useAuth();
    const [calls, setCalls] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!activeWorkspaceId) {
            setCalls([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'calls'),
            where('workspaceId', '==', activeWorkspaceId),
            orderBy('createdAt', 'desc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setCalls(docs);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error fetching calls:", err);
            setError("Error al cargar las llamadas. Por favor, reintenta más tarde.");
            setLoading(false);
        });
        return () => unsub();
    }, [activeWorkspaceId]);

    // Derived stats
    const avgScore = calls.length ? Math.round(calls.reduce((acc, c) => acc + (c.analysis?.overallScore || c.overallScore || 0), 0) / calls.filter(c => c.analysis?.overallScore || c.overallScore).length || 0) : 0;
    const pendingAnalyzes = calls.filter(c => c.status === 'analyzing').length;

    return (
        <div>
            <div className="sis-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div className="sis-page-title">AI Call Analyzer</div>
                    <div className="sis-page-subtitle">Sube y evalúa llamadas comerciales. Feedback estructurado por un Coach de Ventas IA.</div>
                </div>
                <button className="sis-btn" onClick={() => navigate('/sistema/app/calls/new')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={16} /> Analizar Llamada
                </button>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div className="sis-kpi">
                    <span className="sis-kpi-label">Total Analizadas</span>
                    <div className="sis-kpi-value">{calls.length}</div>
                </div>
                <div className="sis-kpi">
                    <span className="sis-kpi-label">Procesando Ahora</span>
                    <div className="sis-kpi-value">{pendingAnalyzes}</div>
                </div>
                <div className="sis-kpi">
                    <span className="sis-kpi-label">Score Promedio</span>
                    <div className="sis-kpi-value" style={{ color: avgScore >= 80 ? 'var(--sis-green)' : avgScore >= 60 ? 'var(--sis-yellow)' : 'var(--sis-text-primary)' }}>{avgScore}/100</div>
                </div>
            </div>

            {/* List */}
            <div className="sis-card-static" style={{ padding: 0 }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--sis-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Historial de Llamadas</span>
                    {/* Placeholder search just for look */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--sis-bg)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--sis-border)' }}>
                        <Search size={14} style={{ color: 'var(--sis-text-muted)' }} />
                        <input type="text" placeholder="Buscar por lead..." style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '12px', outline: 'none' }} />
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" style={{ margin: '0 auto', color: 'var(--sis-accent)' }} /></div>
                ) : error ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
                        <AlertCircle size={32} style={{ margin: '0 auto 16px', opacity: 0.8 }} />
                        <div style={{ fontWeight: 600 }}>{error}</div>
                    </div>
                ) : calls.length === 0 ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--sis-text-muted)' }}>
                        <PhoneCall size={32} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                        <div style={{ fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '4px' }}>Aún no has analizado ninguna llamada</div>
                        <div style={{ fontSize: '13px', marginBottom: '16px' }}>Sube tu primera grabación o pega una transcripción para obtener feedback instantáneo de la IA.</div>
                        <button className="sis-btn-outline" onClick={() => navigate('/sistema/app/calls/new')}>Sube tu primera llamada</button>
                    </div>
                ) : (
                    <div>
                        {calls.map((c, i) => {
                            const score = c.analysis?.overallScore || c.overallScore;
                            return (
                                <div key={c.id} onClick={() => navigate(`/sistema/app/calls/${c.id}`)} style={{
                                    padding: '16px 20px', borderBottom: '1px solid var(--sis-border-subtle)',
                                    cursor: 'pointer', transition: 'background 0.15s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--sis-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--sis-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-accent)' }}>
                                            <PhoneCall size={18} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{c.title || c.leadName}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', display: 'flex', gap: '8px', marginTop: '4px' }}>
                                                <span>Lead: {c.leadName}</span> •
                                                <span>Closer: {c.closerName}</span> •
                                                <span style={{ textTransform: 'capitalize' }}>{c.callType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <span className={`sis-tag sis-tag-${c.status === 'analyzed' ? 'green' : c.status === 'failed' ? 'red' : 'yellow'}`}>
                                            {c.status.toUpperCase()}
                                        </span>
                                        <div style={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
                                            {score ? (
                                                <div className={`sis-score-ring ${score >= 80 ? 'sis-score-high' : score >= 60 ? 'sis-score-mid' : 'sis-score-low'}`} style={{ width: '32px', height: '32px', fontSize: '11px' }}>{score}</div>
                                            ) : (
                                                <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>-</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
