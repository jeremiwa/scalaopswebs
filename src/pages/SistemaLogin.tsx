import { Navigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Shield, BarChart3, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import '../sistema.css';

export const SistemaLogin = () => {
    const { user, loading, signInWithGoogle } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [signing, setSigning] = useState(false);

    // If already logged in, redirect to app
    if (!loading && user) {
        return <Navigate to="/sistema/app" replace />;
    }

    const handleGoogleLogin = async () => {
        setError(null);
        setSigning(true);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            console.error('Firebase Auth Error:', err);
            if (err?.code === 'auth/popup-closed-by-user') {
                // User closed popup, no error to show
            } else if (err?.code === 'auth/popup-blocked') {
                setError('El navegador bloqueó el popup. Permití popups para este sitio e intentá de nuevo.');
            } else if (err?.code === 'auth/unauthorized-domain') {
                setError(`Dominio no autorizado en Firebase. Agregá "${window.location.hostname}" en Firebase Console → Authentication → Settings → Authorized domains.`);
            } else {
                setError(`Error: ${err?.code || err?.message || 'Error desconocido'}. Intentá de nuevo.`);
            }
            setSigning(false);
        }
    };

    return (
        <div className="sis-page sis-login-page">
            {/* Left Visual Panel */}
            <div className="sis-login-visual sis-grid-pattern">
                <div className="sis-glow-green" style={{ top: '30%', left: '40%', width: '500px', height: '500px' }} />
                <div className="sis-glow-blue" style={{ top: '60%', left: '60%', width: '400px', height: '400px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px', maxWidth: '440px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <Logo />
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--sis-text-primary)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                        Revenue Intelligence Platform
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--sis-text-tertiary)', lineHeight: 1.6, marginBottom: '48px' }}>
                        Detectá fugas de ventas, optimizá tu equipo comercial y recuperá revenue con inteligencia artificial.
                    </p>

                    {/* Feature pills */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                        {[
                            { icon: <BarChart3 size={16} />, text: 'Análisis de conversaciones en tiempo real' },
                            { icon: <Shield size={16} />, text: 'Detección automática de fugas de ventas' },
                            { icon: <Zap size={16} />, text: 'Recomendaciones de IA accionables' },
                        ].map((f, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 18px', borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--sis-border)',
                                fontSize: '13px', color: 'var(--sis-text-secondary)', width: '100%'
                            }}>
                                <span style={{ color: 'var(--sis-accent)' }}>{f.icon}</span>
                                {f.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="sis-login-form-panel">
                <div className="sis-login-form">
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sis-text-primary)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                        Iniciar sesión
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--sis-text-tertiary)', marginBottom: '32px' }}>
                        Ingresá a tu workspace de Scala
                    </p>

                    {/* Error message */}
                    {error && (
                        <div style={{
                            padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                            fontSize: '13px', color: '#f87171',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Google Sign-in Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={signing}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '12px', width: '100%', padding: '14px 20px',
                            borderRadius: '10px', border: '1px solid var(--sis-border)',
                            background: 'var(--sis-bg-secondary)', cursor: signing ? 'wait' : 'pointer',
                            fontSize: '15px', fontWeight: 500, color: 'var(--sis-text-primary)',
                            fontFamily: 'var(--sis-font-sans)',
                            transition: 'all 0.2s ease',
                            opacity: signing ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => { if (!signing) { e.currentTarget.style.background = 'var(--sis-bg-tertiary)'; e.currentTarget.style.borderColor = 'var(--sis-accent)'; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--sis-bg-secondary)'; e.currentTarget.style.borderColor = 'var(--sis-border)'; }}
                    >
                        {signing ? (
                            <div style={{
                                width: '20px', height: '20px',
                                border: '2px solid rgba(255,255,255,0.1)',
                                borderTopColor: 'var(--sis-accent)',
                                borderRadius: '50%',
                                animation: 'sis-spin 0.8s linear infinite',
                            }} />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        {signing ? 'Conectando...' : 'Continuar con Google'}
                    </button>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--sis-border)' }} />
                        <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)', fontWeight: 500 }}>ACCESO SEGURO</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--sis-border)' }} />
                    </div>

                    {/* Trust indicators */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { icon: '🔒', text: 'Autenticación segura con Google' },
                            { icon: '🛡️', text: 'Tus datos protegidos con Firebase' },
                            { icon: '⚡', text: 'Acceso instantáneo sin contraseña' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                fontSize: '13px', color: 'var(--sis-text-tertiary)',
                            }}>
                                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <p style={{ fontSize: '12px', color: 'var(--sis-text-muted)', textAlign: 'center', marginTop: '40px' }}>
                        ¿Necesitás acceso?{' '}
                        <a href="/formulario" style={{ color: 'var(--sis-accent)', textDecoration: 'none', fontWeight: 500 }}>
                            Contactar equipo
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
