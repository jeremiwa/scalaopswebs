import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { Check } from 'lucide-react';
import '../sistema.css';

const STEPS = [
    'Conectando canales...',
    'Analizando conversaciones...',
    'Detectando fugas de ventas...',
    'Evaluando equipo comercial...',
    'Preparando dashboard...',
];

export const SistemaLoading = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < STEPS.length - 1) return prev + 1;
                return prev;
            });
        }, 700);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 2;
            });
        }, 60);

        const redirectTimeout = setTimeout(() => {
            navigate('/sistema/app');
        }, 4000);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);

    return (
        <div className="sis-page sis-loading-page">
            <div className="sis-glow-green" style={{ top: '30%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '400px' }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* Logo */}
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <Logo />
                </div>

                {/* Spinner */}
                <div className="sis-loading-spinner" style={{ margin: '0 auto 32px' }} />

                {/* Progress bar */}
                <div style={{ width: '280px', margin: '0 auto 32px' }}>
                    <div className="sis-progress">
                        <div className="sis-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)', fontFamily: 'var(--sis-font-mono)' }}>
                            Preparando workspace
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--sis-text-tertiary)', fontFamily: 'var(--sis-font-mono)' }}>
                            {progress}%
                        </span>
                    </div>
                </div>

                {/* Steps */}
                <div className="sis-loading-steps">
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            className={`sis-loading-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}
                        >
                            <div className="sis-loading-check">
                                {i < currentStep && <Check size={11} strokeWidth={3} />}
                            </div>
                            <span>{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
