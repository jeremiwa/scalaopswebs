import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Building2, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import '../sistema.css';

export const SistemaWelcome = () => {
    const navigate = useNavigate();

    return (
        <div className="sis-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div className="sis-glow-green" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px' }} />
            <div className="sis-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px', padding: '40px' }}>
                {/* Logo */}
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                    <Logo />
                </div>

                {/* Welcome message */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-accent)' }}>Sesión iniciada correctamente</span>
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--sis-text-primary)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    Bienvenido a Scala
                </h1>
                <p style={{ fontSize: '15px', color: 'var(--sis-text-tertiary)', marginBottom: '40px' }}>
                    Seleccioná el workspace con el que querés trabajar.
                </p>

                {/* Workspaces */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {[
                        {
                            name: 'Grupo Riviera',
                            role: 'Admin',
                            members: 8,
                            active: true,
                            icon: '🏢'
                        },
                        {
                            name: 'Vertex Digital',
                            role: 'Viewer',
                            members: 4,
                            active: false,
                            icon: '🚀'
                        },
                    ].map((ws, i) => (
                        <button
                            key={i}
                            onClick={() => navigate('/sistema/loading')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '16px',
                                padding: '18px 20px',
                                background: ws.active ? 'var(--sis-accent-subtle)' : 'var(--sis-bg-card)',
                                border: `1px solid ${ws.active ? 'rgba(16, 185, 129, 0.15)' : 'var(--sis-border)'}`,
                                borderRadius: 'var(--sis-radius-lg)',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                                transition: 'all 0.2s ease',
                                fontFamily: 'var(--sis-font-sans)',
                            }}
                        >
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '12px',
                                background: ws.active ? 'rgba(16, 185, 129, 0.12)' : 'var(--sis-bg-elevated)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px', flexShrink: 0
                            }}>
                                {ws.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '2px' }}>{ws.name}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{ws.role}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>·</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--sis-text-muted)' }}>
                                        <Users size={11} /> {ws.members} miembros
                                    </span>
                                </div>
                            </div>
                            <ArrowRight size={18} style={{ color: ws.active ? 'var(--sis-accent)' : 'var(--sis-text-muted)' }} />
                        </button>
                    ))}
                </div>

                <p style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>
                    ¿Querés crear un nuevo workspace? <span style={{ color: 'var(--sis-accent)', cursor: 'pointer' }}>Contactar equipo</span>
                </p>
            </div>
        </div>
    );
};
