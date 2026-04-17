import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export const WebFooter = () => {
  return (
    <footer className="relative bg-[#000000] pt-24 pb-12 overflow-hidden">
      
      {/* Línea Decorativa Superior */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #185de8 40%, #6bdda1 60%, transparent 100%)', opacity: 0.5 }} />

      {/* Watermark Gigante (Logo SCALA) en el fondo del footer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[25vw] font-black tracking-tight leading-none text-white whitespace-nowrap" style={{ fontFamily: 'var(--font-primary)' }}>
          SCALA
        </span>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Col 1 (Wider): Brand & Tagline */}
          <div className="flex flex-col gap-6 lg:col-span-5 pr-0 lg:pr-12">
            
            {/* Logo Scala en Blanco */}
            <Link to="/web" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <Logo />
            </Link>

            <p className="text-[15px] text-[#999999] leading-relaxed font-normal max-w-[320px]" style={{ fontFamily: 'var(--font-secondary)' }}>
              El sistema comercial para negocios que venden en LATAM.
            </p>

            {/* Íconos Sociales */}
            <div className="flex gap-5 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#6bdda1] hover:bg-[#6bdda1] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#6bdda1] hover:bg-[#6bdda1] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#6bdda1] hover:bg-[#6bdda1] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Soluciones */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:col-start-7">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-secondary)' }}>Soluciones</h4>
            <Link to="/web/contacto" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Auditoría</Link>
            <Link to="/web/soluciones/empleado-ia" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Empleado IA</Link>
            <Link to="/web/soluciones" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Implementación</Link>
            <Link to="/web/soluciones" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Ver todas</Link>
          </div>

          {/* Col 3: Compañía */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-secondary)' }}>Compañía</h4>
            <Link to="/web/nosotros" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Nosotros</Link>
            <Link to="/web/casos" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Casos</Link>
            <Link to="/web/blog" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>Blog</Link>
          </div>

          {/* Col 4: Contacto */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-secondary)' }}>Contacto</h4>
            <a href="mailto:info@scalaops.com" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>info@scalaops.com</a>
            
            <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              WhatsApp directo
            </a>
            
            <a href="https://linkedin.com/company/scalaops" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#999999] hover:text-[#185de8] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              LinkedIn
            </a>
          </div>

        </div>

        {/* Cierre Inferior */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-[13px] text-[#666666] font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
            Copyright © 2026 Scala
          </p>
          <div className="flex gap-4 items-center">
            <Link to="/web/legales/privacidad" className="text-[13px] text-[#666666] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>Política de privacidad</Link>
            <span className="text-white/10">|</span>
            <Link to="/web/legales/terminos" className="text-[13px] text-[#666666] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>Términos y condiciones</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
