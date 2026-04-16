import React from 'react';
import { Link } from 'react-router-dom';

export const WebFooter = () => {
  return (
    <footer className="border-t border-white/5 bg-[#030712] pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/web" className="inline-flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-[#22C55E] to-[#166534] flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.25)]">
                <span className="text-white font-bold text-sm tracking-tighter">S</span>
              </div>
              <span className="text-lg font-bold text-white tracking-widest uppercase">Scala</span>
            </Link>
            <p className="text-[13px] text-white/40 leading-relaxed max-w-sm mb-6">
              Implementamos soluciones de IA para empresas y negocios.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-white/40 hover:bg-white/8 hover:text-white transition-colors border border-white/5 text-[10px] font-bold">in</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-white/40 hover:bg-white/8 hover:text-white transition-colors border border-white/5 text-[10px] font-bold">ig</a>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-[10px] tracking-widest">Soluciones</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/web/soluciones" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">Soluciones</Link></li>
              <li><Link to="/web/casos" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">Casos</Link></li>
              <li><Link to="/web/blog" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-[10px] tracking-widest">Compañía</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/web/nosotros" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">Nosotros</Link></li>
              <li><Link to="/web/contacto" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">Contacto</Link></li>
              <li><a href="https://calendar.app.google/your-link" target="_blank" rel="noopener noreferrer" className="text-[13px] text-scala-green/80 hover:text-scala-green transition-colors">Agendar llamada</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-[10px] tracking-widest">Contacto</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="mailto:estrategia@scalaops.com" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">estrategia@scalaops.com</a></li>
              <li><a href="https://wa.me/xxx" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">WhatsApp</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/45 hover:text-scala-green transition-colors">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">&copy; {new Date().getFullYear()} ScalaOps. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link to="/web/legales/privacidad" className="text-[11px] text-white/30 hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="/web/legales/terminos" className="text-[11px] text-white/30 hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
