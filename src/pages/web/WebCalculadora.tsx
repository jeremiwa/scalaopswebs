import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { WebLayout } from '../../components/web/WebLayout';
import { SEO } from '../../components/SEO';
import { calculateLeakage, CalculatorData, CalculatorResult } from '../../utils/calculatorLogic';
import { Check, ChevronRight, ChevronLeft, ArrowRight, Zap, Target, Activity } from 'lucide-react';

const ENABLE_EXTENDED_DIAGNOSIS = false;

const JOTFORM_URL = "https://scalaops.com/formulario";

const formatUSD = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
}).format(value);

// --- Componentes Reutilizables ---
const StepContainer = ({ children, onNext, onPrev, disableNext, nextText = "Continuar", showNext = true }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4 }}
    className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh]"
  >
    <div className="w-full mb-8">
      {children}
    </div>
    
    <div className="flex w-full items-center justify-between mt-8">
      {onPrev ? (
        <button 
          onClick={onPrev}
          className="text-white/50 hover:text-white flex items-center gap-2 transition-colors font-medium text-sm md:text-base py-3"
        >
          <ChevronLeft size={18} /> Volver
        </button>
      ) : <div />}
      
      {showNext && (
        <button 
          onClick={onNext}
          disabled={disableNext}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
            disableNext 
              ? 'bg-white/5 text-white/30 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] text-[#000000] hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(24,93,232,0.3)]'
          }`}
        >
          {nextText} <ChevronRight size={18} />
        </button>
      )}
    </div>
  </motion.div>
);

const RadioOption = ({ label, selected, onClick, sub }: any) => (
  <div 
    onClick={onClick}
    className={`w-full p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center justify-between ${
      selected 
        ? 'bg-[rgba(255,255,255,0.08)] border-[rgba(24,93,232,0.5)] shadow-[0_4px_20px_rgba(24,93,232,0.1)]' 
        : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)]'
    }`}
  >
    <div className="flex flex-col">
      <span className={`font-medium ${selected ? 'text-white' : 'text-white/80'}`}>{label}</span>
      {sub && <span className="text-sm text-white/40 mt-1">{sub}</span>}
    </div>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
      selected ? 'border-[#6bdda1] bg-[#6bdda1]/10' : 'border-white/20'
    }`}>
      {selected && <Check size={14} className="text-[#6bdda1]" />}
    </div>
  </div>
);

// --- Pantallas ---
const Hero = ({ onStart, headline, subhead }: any) => (
  <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] gap-12 w-full max-w-6xl mx-auto px-4 py-16">
    <div className="flex-1 flex flex-col items-start">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] font-bold" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
        {headline}
      </h1>
      <p className="text-lg md:text-xl text-[#bababa] mb-8 leading-relaxed max-w-xl">
        {subhead}
      </p>
      
      <p className="text-sm text-white/50 mb-4 font-medium uppercase tracking-wider">
        Antes de invertir más en publicidad, medí dónde se escapa la venta.
      </p>
      
      <button 
        onClick={onStart}
        className="px-8 py-4 rounded-full bg-gradient-to-r from-[#185de8] to-[#6bdda1] text-[#000000] font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_4px_25px_rgba(24,93,232,0.25)] flex items-center gap-3"
      >
        Calcular mis fugas <ArrowRight size={20} />
      </button>
      <p className="text-xs text-white/30 mt-4 max-w-md">
        Estimación orientativa basada en tus respuestas. No reemplaza una auditoría comercial real.
      </p>
    </div>
    
    <div className="flex-1 w-full max-w-md mt-12 md:mt-0 relative hidden lg:block">
      <div className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#185de8] opacity-20 blur-[100px] rounded-full pointer-events-none" />
        
        <h3 className="text-xl text-white mb-6 font-bold" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>Diagnóstico operativo</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
            <span className="text-white/60">Consultas sin seguimiento</span>
            <span className="text-white font-medium text-lg">38</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
            <span className="text-white/60">Tiempo prom. respuesta</span>
            <span className="text-white font-medium text-lg">2h 14m</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-[rgba(250,204,21,0.2)]">
            <span className="text-white/60">Oportunidades en riesgo</span>
            <span className="text-[#FACC15] font-bold text-lg">USD 7,800</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF5C5C] animate-pulse" />
            <span className="text-[#FF5C5C] font-medium text-sm">Fuga alta detectada</span>
          </div>
        </div>
        
        {/* Escalera SCALA visual element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#185de8] via-[#2da6c8] to-[#6bdda1]" />
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const WebCalculadora = () => {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('v');
  
  let heroHead = "Calculá cuántas ventas está perdiendo tu negocio sin darte cuenta";
  let heroSub = "En menos de 3 minutos estimamos tus fugas comerciales por respuesta lenta, falta de seguimiento y desorden operativo.";
  
  if (variant === 'autopsy') {
    heroHead = "Tu negocio puede estar perdiendo ventas y nadie lo está viendo";
    heroSub = "Hacé una autopsia rápida de tus fugas comerciales: respuesta, seguimiento y oportunidades que se enfrían.";
  } else if (variant === 'dashboard') {
    heroHead = "Convertí el caos comercial en números claros";
    heroSub = "Estimá cuántas oportunidades se pierden por no medir respuesta, seguimiento y CRM.";
  } else if (variant === 'whatsapp') {
    heroHead = "Cada WhatsApp que se responde tarde puede ser una venta menos";
    heroSub = "Calculá cuánto te puede estar costando responder tarde o no hacer seguimiento.";
  }

  const [step, setStep] = useState(0); // 0 = Hero, 1-7 = Wizard, 8 = Result
  
  const [data, setData] = useState<CalculatorData>({
    industry: '',
    dailyLeads: 0,
    averageTicket: 0,
    closeRateRange: 0,
    responseDelayRate: 0,
    followUpRate: 0,
    crmRate: 0,
    afterHoursRate: 0
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  // Track initial load
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'calculator_viewed', page: 'calculadora' });
    }
    
    // Attempt to load previous result from localStorage
    try {
      const saved = localStorage.getItem('scala_calc_result');
      if (saved) {
        // Optional: show a "Resume" banner or load data
      }
    } catch (e) {}
  }, []);

  const handleStart = () => {
    setStep(1);
    if (typeof window !== "undefined") {
      if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'calculator_started', page: 'calculadora' });
      if ((window as any).fbq) (window as any).fbq("trackCustom", "CalculatorStarted", { industry: data.industry });
    }
  };

  const nextStep = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'calculator_step_completed', step_number: step });
    }
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const calculateAndShow = () => {
    const res = calculateLeakage(data);
    setResult(res);
    setStep(8);
    
    try {
      localStorage.setItem('scala_calc_result', JSON.stringify(res));
    } catch (e) {}

    if (typeof window !== "undefined") {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "calculator_completed",
          page: "calculadora",
          industry: data.industry,
          daily_leads: data.dailyLeads,
          average_ticket_usd: data.averageTicket,
          current_estimated_revenue: res.currentEstimatedRevenue,
          score: res.finalScore,
          risk_level: res.riskLevel,
          leakage_rate: res.leakageRate,
          monthly_loss_low: res.monthlyLossLow,
          monthly_loss_high: res.monthlyLossHigh,
          main_leak: res.mainLeak
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq("trackCustom", "CalculatorCompleted", {
          industry: data.industry,
          score: res.finalScore,
          risk_level: res.riskLevel,
          leakage_rate: res.leakageRate,
          monthly_loss_low: res.monthlyLossLow,
          monthly_loss_high: res.monthlyLossHigh,
          main_leak: res.mainLeak
        });
      }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleClick = () => {
    if (typeof window !== "undefined") {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'calculator_schedule_clicked' });
      }
      if ((window as any).fbq) {
        (window as any).fbq("trackCustom", "CalculatorScheduleClicked", {
          industry: data.industry,
          score: result?.finalScore,
          risk_level: result?.riskLevel,
          monthly_loss_low: result?.monthlyLossLow,
          monthly_loss_high: result?.monthlyLossHigh,
          main_leak: result?.mainLeak
        });
      }
    }
    
    if (result) {
      const params = new URLSearchParams({
        source: 'calculadora',
        score: result.finalScore.toString(),
        risk: result.riskLevel,
        industry: data.industry,
        dailyLeads: data.dailyLeads.toString(),
        averageTicket: data.averageTicket.toString(),
        currentEstimatedRevenue: result.currentEstimatedRevenue.toString(),
        leakageRate: result.leakageRate.toString(),
        monthlyLossLow: result.monthlyLossLow.toString(),
        monthlyLossHigh: result.monthlyLossHigh.toString(),
        annualLossLow: result.annualLossLow.toString(),
        annualLossHigh: result.annualLossHigh.toString(),
        mainLeak: result.mainLeak
      });
      window.open(`${JOTFORM_URL}?${params.toString()}`, '_blank');
    } else {
      window.open(JOTFORM_URL, '_blank');
    }
  };

  return (
    <>
      <SEO 
        title="Calculadora de Fugas Comerciales | Scala Ops"
        description="Calculá cuántas ventas podría estar perdiendo tu negocio por respuesta lenta, falta de seguimiento y desorden comercial."
        canonical="https://scalaops.com/calculadora"
      />
      
      <div className="pt-24 pb-16 min-h-screen px-4 container-custom relative z-10">
        
        {/* Progress Bar */}
        {step > 0 && step < 8 && (
          <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#185de8] via-[#2da6c8] to-[#6bdda1]"
                initial={{ width: `${((step - 1) / 7) * 100}%` }}
                animate={{ width: `${(step / 7) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-right text-xs text-white/40 mt-2 font-medium">Paso {step} de 7</div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="step-0" exit={{ opacity: 0, y: -20 }}>
              <Hero onStart={handleStart} headline={heroHead} subhead={heroSub} />
            </motion.div>
          )}

          {step === 1 && (
            <StepContainer key="step-1" onNext={nextStep} disableNext={!data.industry}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-6 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                ¿Qué tipo de negocio tenés?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: 'cursos', label: 'Cursos / educación / infoproductos' },
                  { id: 'inmobiliaria', label: 'Inmobiliaria' },
                  { id: 'autos', label: 'Autos / concesionaria / rental' },
                  { id: 'salud', label: 'Medicina estética / salud privada' },
                  { id: 'ecommerce', label: 'Ecommerce / tienda de productos' },
                  { id: 'servicios', label: 'Servicios profesionales' },
                  { id: 'turismo', label: 'Turismo / hotelería / alquileres' },
                  { id: 'otro', label: 'Otro' },
                ].map(opt => (
                  <RadioOption 
                    key={opt.id} 
                    label={opt.label} 
                    selected={data.industry === opt.id} 
                    onClick={() => setData({ ...data, industry: opt.id })} 
                  />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 2 && (
            <StepContainer key="step-2" onNext={nextStep} onPrev={prevStep} disableNext={!data.dailyLeads || data.dailyLeads < 1 || isNaN(data.dailyLeads)}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                ¿Cuántas consultas comerciales recibís por día?
              </h2>
              <p className="text-center text-white/50 mb-8">Incluí WhatsApp, Instagram, formularios, llamadas y mensajes entrantes.</p>
              
              <div className="flex justify-center">
                <input 
                  type="number" 
                  min="1" max="10000"
                  placeholder="Ej: 40"
                  value={data.dailyLeads || ''}
                  onChange={(e) => setData({ ...data, dailyLeads: parseInt(e.target.value) })}
                  className="bg-transparent border-b-2 border-white/20 focus:border-[#6bdda1] outline-none text-center text-4xl md:text-6xl text-white font-bold py-4 w-48 transition-colors"
                />
              </div>
            </StepContainer>
          )}

          {step === 3 && (
            <StepContainer key="step-3" onNext={nextStep} onPrev={prevStep} disableNext={!data.averageTicket || data.closeRateRange === 0}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                Para estimar la fuga, necesitamos dos datos rápidos
              </h2>
              
              <div className="space-y-10 mt-8">
                <div>
                  <label className="block text-white/80 font-medium mb-2 text-lg">1. Valor promedio de una venta (en USD)</label>
                  <p className="text-white/40 text-sm mb-4">Aproximado. Pensá en el valor en dólares de una venta típica.</p>
                  <div className="relative w-full md:w-1/2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl font-bold">USD</span>
                    <input 
                      type="number" 
                      min="1"
                      placeholder="Ej: 500"
                      value={data.averageTicket || ''}
                      onChange={(e) => setData({ ...data, averageTicket: parseInt(e.target.value) })}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-xl px-4 py-4 pl-16 text-xl text-white outline-none focus:border-[#185de8] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-1 text-lg">2. ¿Cómo sentís tu proceso comercial hoy?</label>
                  <p className="text-white/40 text-sm mb-4">Elegí la opción que más se acerque a tu realidad.</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { val: 0.12, label: 'Cierro casi todo lo que entra bien calificado' },
                      { val: 0.06, label: 'Cierro algo, pero se me escapan varias' },
                      { val: 0.025, label: 'Pierdo muchas, no doy abasto con el seguimiento' },
                      { val: 0.05, label: 'No tengo idea, no lo estoy midiendo' },
                    ].map(opt => (
                      <RadioOption 
                        key={opt.label} 
                        label={opt.label} 
                        selected={data.closeRateRange === opt.val} 
                        onClick={() => setData({ ...data, closeRateRange: opt.val })} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </StepContainer>
          )}

          {step === 4 && (
            <StepContainer key="step-4" onNext={nextStep} onPrev={prevStep} disableNext={!data.responseDelayRate}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                ¿Cuánto tardan en responder una consulta nueva?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { val: 0.02, label: 'Menos de 2 minutos' },
                  { val: 0.06, label: '2 a 10 minutos' },
                  { val: 0.12, label: '10 a 60 minutos' },
                  { val: 0.20, label: '1 a 6 horas' },
                  { val: 0.30, label: 'Más de 6 horas' },
                  { val: 0.38, label: 'Muchas quedan para el día siguiente' },
                  { val: 0.16, label: 'No sé' },
                ].map(opt => (
                  <RadioOption 
                    key={opt.label} 
                    label={opt.label} 
                    selected={data.responseDelayRate === opt.val} 
                    onClick={() => setData({ ...data, responseDelayRate: opt.val })} 
                  />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 5 && (
            <StepContainer key="step-5" onNext={nextStep} onPrev={prevStep} disableNext={!data.followUpRate}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                Cuando alguien pide precio o información y no compra, ¿le hacen seguimiento?
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { val: 0.03, label: 'Sí, automático' },
                  { val: 0.10, label: 'Sí, pero manual y depende del vendedor' },
                  { val: 0.17, label: 'A veces' },
                  { val: 0.26, label: 'Casi nunca' },
                  { val: 0.15, label: 'No sé' },
                ].map(opt => (
                  <RadioOption 
                    key={opt.label} 
                    label={opt.label} 
                    selected={data.followUpRate === opt.val} 
                    onClick={() => setData({ ...data, followUpRate: opt.val })} 
                  />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 6 && (
            <StepContainer key="step-6" onNext={nextStep} onPrev={prevStep} disableNext={!data.crmRate}>
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                ¿Dónde registran las oportunidades comerciales?
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { val: 0.02, label: 'En un CRM bien usado' },
                  { val: 0.08, label: 'En un CRM, pero incompleto' },
                  { val: 0.14, label: 'En Excel / Google Sheets' },
                  { val: 0.21, label: 'En WhatsApp / Instagram / notas sueltas' },
                  { val: 0.27, label: 'No registramos nada' },
                  { val: 0.16, label: 'No sé' },
                ].map(opt => (
                  <RadioOption 
                    key={opt.label} 
                    label={opt.label} 
                    selected={data.crmRate === opt.val} 
                    onClick={() => setData({ ...data, crmRate: opt.val })} 
                  />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 7 && (
            <StepContainer key="step-7" onNext={calculateAndShow} onPrev={prevStep} disableNext={!data.afterHoursRate} nextText="Ver mi resultado">
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                ¿Tu negocio responde consultas fuera del horario laboral?
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { val: 0.01, label: 'Sí, siempre' },
                  { val: 0.07, label: 'A veces' },
                  { val: 0.14, label: 'No' },
                  { val: 0.09, label: 'No sé' },
                ].map(opt => (
                  <RadioOption 
                    key={opt.label} 
                    label={opt.label} 
                    selected={data.afterHoursRate === opt.val} 
                    onClick={() => setData({ ...data, afterHoursRate: opt.val })} 
                  />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 8 && result && (
            <motion.div key="step-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center">
              
              {/* Badge */}
              <div className="px-4 py-1.5 rounded-full border border-[#6bdda1]/30 bg-[#6bdda1]/10 text-[#6bdda1] text-xs font-bold tracking-widest uppercase mb-8">
                Diagnóstico completado
              </div>

              {/* Dynamic Title based on risk */}
              <h2 className="text-2xl md:text-4xl font-bold text-center text-white max-w-2xl leading-tight mb-12" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                {result.riskLevel === 'baja' && "Tu operación parece bastante ordenada, pero todavía puede haber oportunidades ocultas."}
                {result.riskLevel === 'moderada' && "Tenés fugas comerciales moderadas que probablemente ya impactan en tus ventas."}
                {result.riskLevel === 'alta' && "Tu negocio tiene fugas comerciales altas."}
                {result.riskLevel === 'crítica' && "Tu operación comercial puede estar perdiendo oportunidades todos los días."}
              </h2>

              {/* BIG RESULT */}
              <div className="flex flex-col items-center justify-center mb-8 relative w-full">
                <span className="text-[#bababa] text-lg md:text-xl font-medium mb-4 text-center">Podrías estar perdiendo entre</span>
                
                <div className="relative">
                  <AnimatedCounter low={result.monthlyLossLow} high={result.monthlyLossHigh} />
                  {/* Glow under number */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-[#185de8] blur-[80px] opacity-20 -z-10 pointer-events-none" />
                </div>

                <span className="text-white/40 text-xl font-medium mt-2">/ mes</span>
              </div>

              <div className="text-center text-[#bababa] text-sm md:text-base mb-4 font-medium px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                Equivalente anual estimado: {formatUSD(result.annualLossLow)} — {formatUSD(result.annualLossHigh)}
              </div>
              
              <p className="text-white/30 text-xs text-center max-w-md mb-16">
                Estimación orientativa basada en tus respuestas. No representa una garantía ni reemplaza una auditoría comercial real.
                {data.closeRateRange === 0.05 && (
                  <span className="block mt-2 italic text-white/40">*Estimado sobre promedio de mercado. Con datos reales tu diagnóstico es más preciso.</span>
                )}
              </p>

              {/* Cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-white/50 text-sm mb-1">Score comercial</span>
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>{result.finalScore}/100</span>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-white/50 text-sm mb-1">Fuga estimada</span>
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>{Math.round(result.leakageRate * 100)}%</span>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-white/50 text-sm mb-1 text-center leading-tight">Referencia orientativa <br/>(operaciones ordenadas)</span>
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>~{Math.round(result.benchmark * 100)}%</span>
                </div>
              </div>

              {/* Main Leak Insight */}
              <div className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(24,93,232,0.2)] rounded-3xl p-6 md:p-8 mb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#185de8] to-[#6bdda1]" />
                
                <h3 className="text-xl md:text-2xl text-white font-bold mb-4 flex items-center gap-3">
                  <Activity className="text-[#6bdda1]" />
                  Tu principal fuga detectada
                </h3>
                <p className="text-[#d6d6d6] text-base md:text-lg leading-relaxed">
                  {result.mainLeak === 'respuesta_lenta' && "Tu mayor fuga parece estar en la velocidad de respuesta. En negocios donde el cliente consulta a varios proveedores, llegar tarde puede significar perder la venta antes de competir."}
                  {result.mainLeak === 'falta_seguimiento' && "Tu mayor fuga parece estar después del primer contacto. Muchas ventas no se pierden por falta de interés, sino porque nadie vuelve a activar la conversación."}
                  {result.mainLeak === 'crm' && "Tu mayor fuga parece estar en el desorden comercial. Si las oportunidades viven en chats, notas o planillas incompletas, es muy difícil saber qué se está perdiendo."}
                  {result.mainLeak === 'fuera_horario' && "Tu mayor fuga parece estar fuera del horario laboral. Parte de la demanda puede llegar cuando nadie está disponible para responder, calificar o avanzar."}
                </p>
              </div>

              {/* Breakdown */}
              <div className="w-full mb-20">
                <h3 className="text-2xl text-white font-bold mb-2 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                  Dónde se podrían estar escapando las oportunidades
                </h3>
                <div className="w-20 h-0.5 bg-gradient-to-r from-[#185de8] to-[#6bdda1] mx-auto mb-10" />

                <div className="space-y-6">
                  <BreakdownBar label="Velocidad de respuesta" value={data.responseDelayRate} max={0.38} />
                  <BreakdownBar label="Seguimiento" value={data.followUpRate} max={0.26} />
                  <BreakdownBar label="CRM / orden comercial" value={data.crmRate} max={0.27} />
                  <BreakdownBar label="Fuera de horario" value={data.afterHoursRate} max={0.14} />
                </div>
              </div>

              {/* Main CTA */}
              <div className="w-full flex flex-col items-center mb-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                  Ahora veamos dónde se está escapando la plata en tu operación real
                </h2>
                <p className="text-[#bababa] text-center max-w-2xl mb-10 text-lg">
                  La calculadora te da una estimación. En una llamada revisamos tu caso y te mostramos qué conviene resolver primero: respuesta, seguimiento, CRM, Sentinel o auditoría completa.
                </p>

                <button 
                  onClick={handleScheduleClick}
                  className="w-full md:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-[#185de8] to-[#6bdda1] text-[#000000] font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_4px_30px_rgba(24,93,232,0.3)] flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Venn, system-ui, sans-serif' }}
                >
                  Agendar diagnóstico con Scala <ArrowRight />
                </button>
              </div>

              {/* Scala Explanation */}
              <div className="w-full mt-10 mb-20">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-2" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                  Scala no vende bots. Ordena operaciones comerciales con IA adentro.
                </h3>
                <div className="w-32 h-0.5 bg-gradient-to-r from-[#185de8] to-[#6bdda1] mx-auto mb-8" />
                
                <p className="text-[#bababa] text-center max-w-3xl mx-auto mb-12 text-lg">
                  Ayudamos a negocios que venden por WhatsApp, Instagram o formularios a responder más rápido, hacer seguimiento automático y tener visibilidad real de sus oportunidades comerciales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(24,93,232,0.1)] transition-all">
                    <div className="w-12 h-12 rounded-full border-2 border-[#6bdda1] bg-[#050505] flex items-center justify-center mb-6">
                      <Zap className="text-[#6bdda1]" size={20} />
                    </div>
                    <h4 className="text-xl text-white font-bold mb-3">Sentinel</h4>
                    <p className="text-[#bababa]">Empleado IA que responde, califica y hace seguimiento 24/7.</p>
                  </div>
                  
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(24,93,232,0.1)] transition-all">
                    <div className="w-12 h-12 rounded-full border-2 border-[#185de8] bg-[#050505] flex items-center justify-center mb-6">
                      <Target className="text-[#185de8]" size={20} />
                    </div>
                    <h4 className="text-xl text-white font-bold mb-3">CRM + automatizaciones</h4>
                    <p className="text-[#bababa]">Para que ninguna oportunidad quede perdida entre chats, Excel o notas sueltas.</p>
                  </div>

                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(24,93,232,0.1)] transition-all">
                    <div className="w-12 h-12 rounded-full border-2 border-[#2da6c8] bg-[#050505] flex items-center justify-center mb-6">
                      <Activity className="text-[#2da6c8]" size={20} />
                    </div>
                    <h4 className="text-xl text-white font-bold mb-3">Auditoría comercial</h4>
                    <p className="text-[#bababa]">Detectamos dónde se pierden ventas y qué sistema conviene implementar primero.</p>
                  </div>
                </div>
              </div>

              {/* FAQ Breve */}
              <div className="w-full max-w-3xl mb-24">
                <h3 className="text-2xl text-white font-bold mb-8 text-center" style={{ fontFamily: 'Venn, system-ui, sans-serif' }}>
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  <FaqItem q="¿La calculadora da un número exacto?" a="No. Es una estimación orientativa basada en tus respuestas. Sirve para detectar posibles fugas y dimensionar el problema." />
                  <FaqItem q="¿Por qué puede variar tanto el rango?" a="Porque cada negocio tiene procesos, tiempos de respuesta, ticket promedio y calidad comercial diferentes. El objetivo es detectar si hay una fuga relevante, no reemplazar una auditoría real." />
                  <FaqItem q="¿Esto es solo un chatbot?" a="No. Sentinel puede ser una parte del sistema, pero Scala también trabaja CRM, automatizaciones, seguimiento, auditoría y procesos comerciales." />
                  <FaqItem q="¿Qué pasa después de agendar?" a="Completás un formulario corto de cualificación con verificación por SMS. Revisamos tu caso, entendemos tus canales de venta y te mostramos qué solución tendría más sentido para tu operación." />
                </div>
              </div>

              {/* Recalcular */}
              <button onClick={() => { setStep(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-white/40 hover:text-white underline text-sm transition-colors pb-10">
                Calcular de nuevo
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Sticky Mobile CTA post-result */}
      {step === 8 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050505]/90 backdrop-blur-md border-t border-white/10 md:hidden z-50">
           <button 
              onClick={handleScheduleClick}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#185de8] to-[#6bdda1] text-[#000000] font-bold shadow-[0_0_20px_rgba(24,93,232,0.2)]"
            >
              Agendar diagnóstico
            </button>
        </div>
      )}
    </>
  );
};

// --- Utilities & Subcomponents ---

const AnimatedCounter = ({ low, high }: { low: number, high: number }) => {
  const [displayLow, setDisplayLow] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayLow(Math.floor(easeProgress * low));
      setDisplayHigh(Math.floor(easeProgress * high));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [low, high]);

  return (
    <h1 
      className="text-[12vw] md:text-7xl lg:text-[100px] font-black leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-[#185de8] to-[#6bdda1]"
      style={{ fontFamily: 'Venn, system-ui, sans-serif', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 10px rgba(24,93,232,0.3))' }}
    >
      {formatUSD(displayLow)} — {formatUSD(displayHigh)}
    </h1>
  );
};

const BreakdownBar = ({ label, value, max }: { label: string, value: number, max: number }) => {
  const percentage = Math.min(100, Math.max(5, (value / max) * 100)); // Visual min 5%
  
  let riskLevelText = "Bajo";
  let colorClass = "bg-white/20";
  
  const rel = value / max;
  if (rel > 0.6) {
    riskLevelText = "Alto";
    colorClass = "bg-gradient-to-r from-[#185de8] to-[#6bdda1]";
  } else if (rel > 0.3) {
    riskLevelText = "Medio";
    colorClass = "bg-[#83cca1]";
  }

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-end mb-2">
        <span className="text-white/80 font-medium text-sm md:text-base">{label}</span>
        <span className="text-xs uppercase tracking-wider text-white/50">{riskLevelText}</span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
};

const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 bg-[rgba(255,255,255,0.02)] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
        <span className="text-white font-medium">{q}</span>
        <ChevronRight className={`text-[#6bdda1] transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-[#bababa]"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
