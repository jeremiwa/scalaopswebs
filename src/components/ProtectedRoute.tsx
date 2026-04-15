import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--sis-bg-primary, #0a0a0f)',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        border: '3px solid rgba(255,255,255,0.1)',
                        borderTopColor: 'var(--sis-accent, #34d399)',
                        borderRadius: '50%',
                        animation: 'sis-spin 0.8s linear infinite',
                    }} />
                    <span style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        Verificando sesión...
                    </span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/sistema/login" replace />;
    }

    return <>{children}</>;
};
