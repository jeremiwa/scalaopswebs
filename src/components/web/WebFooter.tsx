import React from 'react';
import { Link } from 'react-router-dom';

export const WebFooter = () => {
  return (
    <footer className="border-t border-white/5 bg-[#030712] pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/web" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#22C55E] to-[#166534] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <span className="text-white font-bold text-lg tracking-tighter mix-blend-overlay">S</span>
              </div>
              <span className="text-xl font-bold text-white tracking-widest uppercase">
                Scala
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-8">
              Ordenamos, automatizamos y optimizamos operaciones comerciales para que equipos B2B y empresas de servicios escalen sus ventas sin fricción.
            </p>
            <div className="flex gap-4">
              {/* LinkedIn Icon stub */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors border border-white/5">
                <span className="text-xs">in</span>
              </a>
              {/* Instagram Icon stub */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors border border-white/5">
                <span className="text-xs">ig</span>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-[11px] tracking-widest">Plataforma</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/web/soluciones" className="text-sm text-white/60 hover:text-scala-green transition-colors">Soluciones</Link></li>
              <li><Link to="/web/como-trabajamos" className="text-sm text-white/60 hover:text-scala-green transition-colors">Metodología</Link></li>
              <li><Link to="/web/casos" className="text-sm text-white/60 hover:text-scala-green transition-colors">Casos de Éxito</Link></li>
              <li><Link to="/sistema" className="text-sm text-white/60 hover:text-scala-green transition-colors">Scala App (SaaS)</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-[11px] tracking-widest">Compañía</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/web/nosotros" className="text-sm text-white/60 hover:text-scala-green transition-colors">Nosotros</Link></li>
              <li><Link to="/web/blog" className="text-sm text-white/60 hover:text-scala-green transition-colors">Blog & Insights</Link></li>
              <li><Link to="/web/contacto" className="text-sm text-white/60 hover:text-scala-green transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-[11px] tracking-widest">Hablemos</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:estrategia@scalaops.com" className="text-sm text-white/60 hover:text-scala-green transition-colors">
                  estrategia@scalaops.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-scala-green transition-colors">
                  WhatsApp Directo
                </a>
              </li>
              <li className="mt-4">
                <a href="https://calendar.app.google/your-link" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-scala-green underline underline-offset-4 decoration-scala-green/30 hover:decoration-scala-green transition-colors">
                  Agendar auditoría
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ScalaOps. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/web/legales/privacidad" className="text-xs text-white/40 hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/web/legales/terminos" className="text-xs text-white/40 hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
