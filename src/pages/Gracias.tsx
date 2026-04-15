import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useEffect } from 'react';

export const Gracias = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-4 relative overflow-hidden">
            {/* Background glow similar to Hero */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-scala-green/20 to-transparent rounded-full flex items-center justify-center mb-6 border border-scala-green/20">
                    <svg className="w-8 h-8 text-scala-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-[800] text-white leading-tight mb-4 tracking-tight">
                    ¡Gracias por contactarnos!
                </h1>

                <p className="text-lg md:text-xl text-[#A0A0B5] mb-10 max-w-lg mx-auto">
                    Hemos recibido tu solicitud. Nos estaremos comunicando a la brevedad para entender cómo podemos ayudarte a escalar tu negocio.
                </p>

                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="primary" className="px-8 py-3 text-lg btn-hover-lift">
                        Volver al inicio
                    </Button>
                </Link>
            </div>
        </div>
    );
};
