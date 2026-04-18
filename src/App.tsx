/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QueEsScala } from './components/QueEsScala';
import { StoryboardDolor } from './components/StoryboardDolor';
import { Resultados } from './components/Resultados';

import { Sprint30Dias } from './components/Sprint30Dias';
import { CostoInvisible } from './components/CostoInvisible';
import { Escalar } from './components/Escalar';
import { CapaIA } from './components/CapaIA';
import { Diferencial } from './components/Diferencial';
import { FAQ } from './components/FAQ';
import { CtaFinal } from './components/CtaFinal';
import { Footer } from './components/Footer';
import { useAnimations } from './hooks/useAnimations';

// Pestaña nueva
import { Formulario } from './pages/Formulario';

import { Gracias } from './pages/Gracias';

// Sistema (SaaS) pages
import { SistemaPage } from './pages/SistemaPage';
import { SistemaLogin } from './pages/SistemaLogin';
import { SistemaApp } from './pages/sistema/SistemaApp';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Web Institucional Elements (Nueva Arquitectura)
import { WebLayout } from './components/web/WebLayout';
import { WebHome } from './pages/web/WebHome';
import { WebNosotros } from './pages/web/WebNosotros';
import { WebFilosofia } from './pages/web/WebFilosofia';
import { WebPrivacidad } from './pages/web/WebPrivacidad';
import { WebTerminos } from './pages/web/WebTerminos';
import { WebAuditoria } from './pages/web/WebAuditoria';
import { WebImplementacion } from './pages/web/WebImplementacion';
import { WebEmpleadoIA } from './pages/web/WebEmpleadoIA';

// Home Component that houses the main landing page
const Home = () => {
  useAnimations();

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#6bdda1] selection:text-[#030712] relative overflow-x-hidden">
      
      {/* Global Noise Layer para dar la textura tipo film grain (Premium) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] mix-blend-overlay" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03
        }} 
      />

      <div className="scroll-bar"></div>
      <Navbar />
      <main>
        {/* 1. Hero + VSL */}
        <Hero />
        {/* 2. Proof / Testimonios */}
        <Resultados />
        {/* 3. Micro-bloque */}
        <QueEsScala />
        {/* 3. Storyboard dolor */}
        <StoryboardDolor />
        {/* 4. Calculadora de impacto */}
        <CostoInvisible />

        {/* 6. Auditoría + Sprint de 30 días */}
        {/* <Sprint30Dias /> */}
        {/* 9. Ahora sí podés escalar */}
        <Escalar />
        {/* 10. Empleado IA */}
        <CapaIA />
        {/* 11. Diferenciación */}
        <Diferencial />
        {/* 12. FAQ */}
        <FAQ />
        {/* 13. CTA final */}
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* ── Public routes (unchanged) ── */}
      <Route path="/" element={<Home />} />
      <Route path="/formulario" element={<Formulario />} />
      <Route path="/gracias-por-contactarnos" element={<Gracias />} />

      {/* ── Web Institucional SCALA ── */}
      <Route path="/web" element={<WebLayout />}>
        {/* /web goes to WebHome */}
        <Route index element={<WebHome />} />
        {/* Futuras rutas:
           <Route path="soluciones" element={<WebSoluciones />} />  */}
        <Route path="nosotros" element={<WebNosotros />} /> 
        <Route path="filosofia" element={<WebFilosofia />} /> 
        <Route path="legales/privacidad" element={<WebPrivacidad />} />
        <Route path="legales/terminos" element={<WebTerminos />} />
        <Route path="contacto" element={<WebAuditoria />} />
        <Route path="auditoria" element={<WebAuditoria />} />
        <Route path="implementacion" element={<WebImplementacion />} />
        <Route path="empleado-ia" element={<WebEmpleadoIA />} />
      </Route>

      {/* ── Sistema: public product page ── */}
      <Route path="/sistema" element={<SistemaPage />} />

      {/* ── Sistema: auth-wrapped routes ── */}
      <Route path="/sistema/login" element={
        <AuthProvider>
          <SistemaLogin />
        </AuthProvider>
      } />
      <Route path="/sistema/app/*" element={
        <AuthProvider>
          <ProtectedRoute>
            <SistemaApp />
          </ProtectedRoute>
        </AuthProvider>
      } />
    </Routes>
  );
}
