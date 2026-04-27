/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { SEO } from './components/SEO';
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
import { WebPrivacidad } from './pages/web/WebPrivacidad';
import { WebTerminos } from './pages/web/WebTerminos';

const WebHome = lazy(() => import('./pages/web/WebHome').then(module => ({ default: module.WebHome })));
const WebNosotros = lazy(() => import('./pages/web/WebNosotros').then(module => ({ default: module.WebNosotros })));
const WebFilosofia = lazy(() => import('./pages/web/WebFilosofia').then(module => ({ default: module.WebFilosofia })));
const WebAuditoria = lazy(() => import('./pages/web/WebAuditoria').then(module => ({ default: module.WebAuditoria })));
const WebImplementacion = lazy(() => import('./pages/web/WebImplementacion').then(module => ({ default: module.WebImplementacion })));
const WebEmpleadoIA = lazy(() => import('./pages/web/WebEmpleadoIA').then(module => ({ default: module.WebEmpleadoIA })));
const TradingDashboard = lazy(() => import('./pages/trading/TradingDashboard').then(module => ({ default: module.TradingDashboard })));

// Home Component that houses the main landing page
const Home = () => {
  useAnimations();

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Testimonio Jordi Falcon - ScalaOps",
    "description": "Jordi Falcon, CEO de una empresa de servicios inmobiliarios en Barcelona, comparte su experiencia trabajando con ScalaOps.",
    "thumbnailUrl": "https://scalaops.com/images/jordi.jpg",
    "uploadDate": "2025-01-01",
    "contentUrl": "https://vimeo.com/1183439807",
    "embedUrl": "https://player.vimeo.com/video/1183439807"
  };

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#6bdda1] selection:text-[#030712] relative overflow-x-hidden">
      <SEO
        title="Por qué Scala | Método para escalar ventas B2B"
        description="Descubrí cómo ScalaOps ayuda a empresas B2B a detectar fugas de venta, estructurar procesos comerciales y recuperar ingresos en 30 días con IA."
        canonical="https://scalaops.com/por-que-scala"
        schema={videoSchema}
      />
      
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
    <Suspense fallback={<div className="bg-[#000000] min-h-screen"></div>}>
      <Routes>
        {/* ── Web Institucional SCALA (ahora raíz) ── */}
        <Route path="/" element={<WebLayout />}>
          <Route index element={<WebHome />} />
          <Route path="nosotros" element={<WebNosotros />} /> 
          <Route path="filosofia" element={<WebFilosofia />} /> 
          <Route path="legales/privacidad" element={<WebPrivacidad />} />
          <Route path="legales/terminos" element={<WebTerminos />} />
          <Route path="contacto" element={<WebAuditoria />} />
          <Route path="auditoria" element={<WebAuditoria />} />
          <Route path="implementacion" element={<WebImplementacion />} />
          <Route path="empleado-ia" element={<WebEmpleadoIA />} />
        </Route>

        {/* ── Landing page antigua → /por-que-scala ── */}
        <Route path="/por-que-scala" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/gracias-por-contactarnos" element={<Gracias />} />
        <Route path="/prueba123" element={<TradingDashboard />} />

        {/* ── Redirect legacy /web/* URLs ── */}
        <Route path="/web" element={<Navigate to="/" replace />} />
        <Route path="/web/*" element={<Navigate to="/" replace />} />

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
    </Suspense>
  );
}
