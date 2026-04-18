import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const Formulario = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // We only want to append the script once
        if (containerRef.current && !containerRef.current.querySelector('script')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://form.jotform.com/jsform/260604555033046';
            script.async = true;
            containerRef.current.appendChild(script);
        }

        const handleIframeMessage = (e: MessageEvent) => {
            console.log('Jotform Message Received:', e.data);

            // Sometimes Jotform sends an object instead of a string
            let dataStr = '';
            if (typeof e.data === 'string') {
                dataStr = e.data;
            } else if (typeof e.data === 'object') {
                try {
                    dataStr = JSON.stringify(e.data);
                } catch (err) {
                    // Ignore
                }
            }

            // Jotform sends 'setHeight' or similar events when it renders
            if (dataStr.includes('setHeight') || dataStr.includes('MinHeight')) {
                setIsLoaded(true);
            }

            // Check if it's from Jotform and indicates a completion
            if (
                dataStr.includes('JotFormIFrame') &&
                (dataStr.includes('completed') || dataStr.includes('submission-completed'))
            ) {
                navigate('/gracias-por-contactarnos');
            } else if (
                // Some jotform embeds send a different action when redirecting
                e.data && e.data.action === 'submission-completed'
            ) {
                navigate('/gracias-por-contactarnos');
            }
        };

        window.addEventListener('message', handleIframeMessage);

        return () => {
            window.removeEventListener('message', handleIframeMessage);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-scala-bg selection:bg-scala-green selection:text-[#030712] relative overflow-x-hidden flex flex-col">
            <main className="flex-grow flex items-center justify-center pt-16 pb-16 px-4">
                <div className="w-full max-w-4xl mx-auto bg-[#0C0C14] rounded-3xl border border-white/5 p-4 md:p-8 shadow-2xl relative">
                    {/* The Jotform script will inject the iframe here */}
                    <div ref={containerRef} className="jotform-container w-full min-h-[600px] flex items-center justify-center">
                    </div>

                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-white/50 animate-pulse text-lg font-medium tracking-wide">Cargando formulario...</div>
                        </div>
                    )}

                    {/* Legal consent */}
                    <p className="text-center text-[12px] text-white/30 mt-6 leading-[1.6]">
                      Al enviar este formulario aceptás nuestra{' '}
                      <Link to="/web/legales/privacidad" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">Política de Privacidad</Link>
                      {' '}y nuestros{' '}
                      <Link to="/web/legales/terminos" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">Términos y Condiciones</Link>.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};
