import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import {
    Search, Zap, Clock, MessageSquareWarning, Users, TrendingUp,
    ArrowRight, Shield, Bot, BarChart3, Target, AlertTriangle,
    Eye, PhoneCall, BrainCircuit, ChevronRight, Star, CheckCircle2,
    MessageCircle, Instagram, Send, UserCheck, BadgeDollarSign
} from 'lucide-react';
import '../sistema.css';

/* ── Mini Dashboard Preview (used in Hero + Product Preview) ── */
const DashboardPreview = () => (
    <div style={{ padding: '20px', background: 'var(--sis-bg-primary)' }}>
        {/* KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {[
                { label: 'Total Leads', value: '1,284', change: '+12%', positive: true },
                { label: 'Response Time', value: '4.2h', change: '-18%', positive: true },
                { label: 'Lost Opportunities', value: '23', change: '+3', positive: false },
                { label: 'Recoverable Revenue', value: '$47.8k', change: '+$8.2k', positive: true },
                { label: 'Leakage Score', value: '72', change: '-5pts', positive: true },
            ].map((kpi, i) => (
                <div key={i} style={{
                    background: 'var(--sis-bg-card)', border: '1px solid var(--sis-border)',
                    borderRadius: '10px', padding: '14px 16px'
                }}>
                    <div style={{ fontSize: '10px', color: 'var(--sis-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{kpi.label}</div>
                    <div style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--sis-text-primary)', marginTop: '4px' }}>{kpi.value}</div>
                    <div style={{
                        fontSize: '10px', fontWeight: 600, marginTop: '4px',
                        color: kpi.positive ? 'var(--sis-positive)' : 'var(--sis-danger)'
                    }}>{kpi.change}</div>
                </div>
            ))}
        </div>
        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--sis-bg-card)', border: '1px solid var(--sis-border)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Funnel Leakage</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                        { stage: 'Lead Ingresado', pct: 100, color: 'var(--sis-accent)' },
                        { stage: 'Contactado', pct: 72, color: 'var(--sis-accent)' },
                        { stage: 'En negociación', pct: 45, color: 'var(--sis-warning)' },
                        { stage: 'Propuesta', pct: 28, color: 'var(--sis-warning)' },
                        { stage: 'Cerrado', pct: 14, color: 'var(--sis-danger)' },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-tertiary)', minWidth: '90px' }}>{s.stage}</span>
                            <div style={{ flex: 1, height: '18px', background: 'var(--sis-bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '3px', opacity: 0.7 }} />
                            </div>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '10px', color: 'var(--sis-text-secondary)', minWidth: '32px', textAlign: 'right' }}>{s.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ background: 'var(--sis-bg-card)', border: '1px solid var(--sis-border)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Top Leaks</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { text: 'Leads sin respuesta > 24h', count: 12, color: 'var(--sis-danger)' },
                        { text: 'Objeción precio no resuelta', count: 8, color: 'var(--sis-warning)' },
                        { text: 'Follow-up sin cierre', count: 6, color: 'var(--sis-warning)' },
                        { text: 'Conversación abandonada', count: 5, color: 'var(--sis-danger)' },
                    ].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '11px', color: 'var(--sis-text-secondary)' }}>{l.text}</span>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', fontWeight: 600, color: l.color, background: l.color === 'var(--sis-danger)' ? 'var(--sis-danger-bg)' : 'var(--sis-warning-bg)', padding: '2px 8px', borderRadius: '4px' }}>{l.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const SistemaPage = () => {
    return (
        <div className="sis-page">
            {/* ── Navbar ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                background: 'rgba(10, 13, 18, 0.8)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--sis-border)'
            }}>
                <div className="sis-container" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}><Logo /></Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <a href="#problema" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-tertiary)', textDecoration: 'none', transition: 'color 0.2s' }}>Problema</a>
                        <a href="#como-funciona" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-tertiary)', textDecoration: 'none' }}>Cómo funciona</a>
                        <a href="#producto" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-tertiary)', textDecoration: 'none' }}>Producto</a>
                        <a href="#beneficios" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-tertiary)', textDecoration: 'none' }}>Beneficios</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link to="/sistema/login" className="sis-btn sis-btn-ghost" style={{ fontSize: '13px' }}>Iniciar sesión</Link>
                        <Link to="/formulario" className="sis-btn sis-btn-primary" style={{ fontSize: '13px' }}>Solicitar demo</Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="sis-hero-section" style={{ textAlign: 'center' }}>
                <div className="sis-glow-green" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px' }} />
                <div className="sis-container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="sis-hero-badge">
                        <Zap size={13} />
                        Revenue Intelligence Platform
                    </div>
                    <h1 className="sis-h1" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Descubrí por dónde se te <br />
                        <span style={{ color: 'var(--sis-accent)' }}>escapan las ventas</span>
                    </h1>
                    <p className="sis-body" style={{ maxWidth: '540px', margin: '20px auto 0', fontSize: '17px' }}>
                        Scala analiza tus conversaciones comerciales, detecta fugas en tu embudo y te da las herramientas para recuperar cada oportunidad perdida.
                    </p>
                    <div className="sis-hero-ctas" style={{ justifyContent: 'center' }}>
                        <Link to="/formulario" className="sis-btn sis-btn-primary sis-btn-lg">
                            Solicitar demo <ArrowRight size={16} />
                        </Link>
                        <a href="#producto" className="sis-btn sis-btn-secondary sis-btn-lg">
                            Ver plataforma
                        </a>
                    </div>

                    {/* Product Preview */}
                    <div className="sis-product-preview" style={{ maxWidth: '1000px', margin: '64px auto 0' }}>
                        <div className="sis-preview-topbar">
                            <div className="sis-preview-dot red" />
                            <div className="sis-preview-dot yellow" />
                            <div className="sis-preview-dot green" />
                            <span style={{ marginLeft: '12px', fontSize: '12px', color: 'var(--sis-text-muted)' }}>app.scalaops.com — Dashboard</span>
                        </div>
                        <DashboardPreview />
                    </div>
                </div>
            </section>

            {/* ── PROBLEMA ── */}
            <section id="problema" className="sis-section sis-section-alt">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-danger)' }}>EL PROBLEMA</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        Tus leads llegan. <br />Pero las ventas no cierran.
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '520px', margin: '0 auto 56px' }}>
                        La mayoría de las empresas pierden entre un 30% y 60% de sus oportunidades por problemas invisibles en su proceso comercial.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { icon: <AlertTriangle size={20} />, title: 'Leads perdidos', desc: 'Consultas que nunca reciben respuesta o se pierden entre canales.' },
                            { icon: <Clock size={20} />, title: 'Respuestas lentas', desc: 'Cada hora sin responder reduce un 10% la probabilidad de cierre.' },
                            { icon: <MessageSquareWarning size={20} />, title: 'Objeciones mal trabajadas', desc: 'Objeciones de precio, timing o confianza sin resolución efectiva.' },
                            { icon: <Users size={20} />, title: 'Equipo sin claridad', desc: 'Vendedores sin estructura, sin métricas, sin retroalimentación.' },
                        ].map((item, i) => (
                            <div key={i} className="sis-card" style={{ textAlign: 'left' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--sis-danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-danger)', marginBottom: '14px' }}>
                                    {item.icon}
                                </div>
                                <h4 className="sis-h4" style={{ fontSize: '15px', marginBottom: '6px' }}>{item.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--sis-text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CÓMO FUNCIONA ── */}
            <section id="como-funciona" className="sis-section">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>CÓMO FUNCIONA</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        De conversaciones a <span style={{ color: 'var(--sis-accent)' }}>inteligencia comercial</span>
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '480px', margin: '0 auto 56px' }}>
                        En 4 pasos, Scala transforma tus chats en insights accionables.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
                        {[
                            { step: '01', icon: <Send size={22} />, title: 'Conectás tus canales', desc: 'WhatsApp, Instagram, llamadas. Un setup, todo conectado.' },
                            { step: '02', icon: <BrainCircuit size={22} />, title: 'Scala analiza', desc: 'IA que lee, interpreta y clasifica cada interacción comercial.' },
                            { step: '03', icon: <Eye size={22} />, title: 'Detecta fugas', desc: 'Identifica exactamente dónde y por qué se pierden ventas.' },
                            { step: '04', icon: <Target size={22} />, title: 'Corregís y crecés', desc: 'Recomendaciones claras para cerrar más con el mismo tráfico.' },
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                                <div style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sis-accent)', marginBottom: '16px', letterSpacing: '0.06em' }}>{item.step}</div>
                                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--sis-accent-subtle)', border: '1px solid rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-accent)', margin: '0 auto 16px' }}>
                                    {item.icon}
                                </div>
                                <h4 className="sis-h4" style={{ fontSize: '15px', marginBottom: '8px' }}>{item.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--sis-text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                                {i < 3 && <ChevronRight size={16} style={{ position: 'absolute', right: '-20px', top: '50%', color: 'var(--sis-text-muted)' }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUÉ DETECTA ── */}
            <section className="sis-section sis-section-alt">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>DETECCIÓN INTELIGENTE</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        Lo que Scala detecta <span style={{ color: 'var(--sis-accent)' }}>por vos</span>
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '480px', margin: '0 auto 56px' }}>
                        Cada conversación analizada revela oportunidades ocultas y puntos de fuga.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { icon: <Clock size={20} />, title: 'Tiempo de respuesta', desc: 'Cuánto tarda cada asesor en responder y cómo impacta en cierres.', tag: 'Crítico' },
                            { icon: <AlertTriangle size={20} />, title: 'Leads abandonados', desc: 'Leads que dejaron de recibir seguimiento y pueden recuperarse.', tag: 'Revenue' },
                            { icon: <MessageSquareWarning size={20} />, title: 'Objeciones', desc: 'Objeciones recurrentes, cuáles se resuelven y cuáles no.', tag: 'Patrón' },
                            { icon: <BarChart3 size={20} />, title: 'Cuellos de botella', desc: 'Etapas del embudo donde más se caen las oportunidades.', tag: 'Funnel' },
                            { icon: <Users size={20} />, title: 'Performance por asesor', desc: 'Ranking de rendimiento, tasa de cierre y calidad de atención.', tag: 'Equipo' },
                            { icon: <BadgeDollarSign size={20} />, title: 'Revenue recuperable', desc: 'Ingreso potencial perdido que puede reactivarse con acción inmediata.', tag: 'Revenue' },
                        ].map((item, i) => (
                            <div key={i} className="sis-card" style={{ textAlign: 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--sis-accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-accent)' }}>
                                        {item.icon}
                                    </div>
                                    <span className="sis-tag sis-tag-green" style={{ fontSize: '10px' }}>{item.tag}</span>
                                </div>
                                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '6px' }}>{item.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--sis-text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRODUCT PREVIEW ── */}
            <section id="producto" className="sis-section">
                <div className="sis-container-wide" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>LA PLATAFORMA</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        Tu centro de control comercial
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '520px', margin: '0 auto 48px' }}>
                        Dashboard en tiempo real, análisis de conversaciones, detección de fugas, CRM liviano y recomendaciones de IA. Todo en un solo lugar.
                    </p>
                    <div className="sis-product-preview" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="sis-preview-topbar">
                            <div className="sis-preview-dot red" />
                            <div className="sis-preview-dot yellow" />
                            <div className="sis-preview-dot green" />
                            <span style={{ marginLeft: '12px', fontSize: '12px', color: 'var(--sis-text-muted)' }}>app.scalaops.com</span>
                        </div>
                        {/* Full app preview with sidebar */}
                        <div style={{ display: 'flex', minHeight: '400px' }}>
                            {/* Mini sidebar */}
                            <div style={{ width: '200px', background: 'var(--sis-bg-sidebar)', borderRight: '1px solid var(--sis-border)', padding: '16px 8px', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <div style={{ width: '10px', height: '2px', background: 'white' }} />
                                        <div style={{ width: '14px', height: '2px', background: 'white' }} />
                                        <div style={{ width: '18px', height: '2px', background: 'white' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>SCALA</span>
                                </div>
                                {['Dashboard', 'Conversations', 'Leak Analysis', 'Team', 'Objections', 'Follow-ups', 'Calls', 'AI Recs', 'CRM', 'Settings'].map((item, i) => (
                                    <div key={i} style={{
                                        padding: '7px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                                        color: i === 0 ? 'var(--sis-accent)' : 'var(--sis-text-tertiary)',
                                        background: i === 0 ? 'var(--sis-accent-subtle)' : 'transparent',
                                        marginBottom: '2px'
                                    }}>{item}</div>
                                ))}
                            </div>
                            {/* Dashboard content */}
                            <DashboardPreview />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BENEFICIOS ── */}
            <section id="beneficios" className="sis-section sis-section-alt">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>RESULTADOS</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        Más ventas con el <span style={{ color: 'var(--sis-accent)' }}>mismo tráfico</span>
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '480px', margin: '0 auto 56px' }}>
                        No necesitás más leads. Necesitás dejar de perder los que ya tenés.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
                        {[
                            { icon: <Eye size={20} />, title: 'Control total', desc: 'Visualizá cada punto de tu proceso comercial en tiempo real.' },
                            { icon: <BarChart3 size={20} />, title: 'Claridad operativa', desc: 'Sabé exactamente qué funciona y qué no en cada canal.' },
                            { icon: <TrendingUp size={20} />, title: 'Mejor seguimiento', desc: 'Cero leads olvidados. Cero oportunidades sin respuesta.' },
                            { icon: <Users size={20} />, title: 'Equipo alineado', desc: 'Métricas claras, ranking de rendimiento, coaching dirigido.' },
                            { icon: <BadgeDollarSign size={20} />, title: 'Más revenue', desc: 'Recuperá ingresos perdidos optimizando lo que ya tenés.' },
                        ].map((item, i) => (
                            <div key={i} className="sis-card" style={{ textAlign: 'left' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--sis-accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-accent)', marginBottom: '14px' }}>
                                    {item.icon}
                                </div>
                                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '6px' }}>{item.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--sis-text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PARA QUIÉN ES ── */}
            <section className="sis-section">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>¿PARA QUIÉN ES?</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        Diseñado para equipos que <span style={{ color: 'var(--sis-accent)' }}>venden en serio</span>
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '480px', margin: '0 auto 56px' }}>
                        Si tu negocio vende a través de conversaciones, Scala es para vos.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        {[
                            { icon: <MessageCircle size={16} />, text: 'Empresas que venden por WhatsApp' },
                            { icon: <Instagram size={16} />, text: 'Negocios con ventas por Instagram DM' },
                            { icon: <UserCheck size={16} />, text: 'Equipos con setters y closers' },
                            { icon: <PhoneCall size={16} />, text: 'Ventas por llamada y seguimiento' },
                            { icon: <BadgeDollarSign size={16} />, text: 'Productos y servicios high-ticket' },
                            { icon: <Users size={16} />, text: 'Equipos comerciales en crecimiento' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '12px 20px', background: 'var(--sis-bg-card)',
                                border: '1px solid var(--sis-border)', borderRadius: '100px',
                                fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-secondary)'
                            }}>
                                <span style={{ color: 'var(--sis-accent)' }}>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DIFERENCIAL ── */}
            <section className="sis-section sis-section-alt">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-accent)' }}>POR QUÉ SCALA</div>
                    <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                        No somos solo otra herramienta
                    </h2>
                    <p className="sis-body" style={{ maxWidth: '520px', margin: '0 auto 56px' }}>
                        Scala no es un CRM ni un bot ni una agencia. Es una capa de inteligencia comercial que conecta con tu operación real.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { label: 'No solo agencia', desc: 'No dependés de un tercero. Vos tenés el control y la data.' },
                            { label: 'No solo bot', desc: 'IA que analiza e interpreta, no solo responde automáticamente.' },
                            { label: 'No solo CRM', desc: 'Más que registrar contactos: detectar por qué no cierran.' },
                            { label: 'Inteligencia real', desc: 'Revenue Intelligence: la capa que conecta data con decisiones.' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: i === 3 ? 'var(--sis-accent-subtle)' : 'var(--sis-bg-card)',
                                border: `1px solid ${i === 3 ? 'rgba(16, 185, 129, 0.15)' : 'var(--sis-border)'}`,
                                borderRadius: 'var(--sis-radius-lg)', padding: '24px', textAlign: 'left'
                            }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: i === 3 ? 'var(--sis-accent)' : 'var(--sis-text-primary)', marginBottom: '8px' }}>{item.label}</div>
                                <p style={{ fontSize: '13px', color: 'var(--sis-text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOCIAL PROOF ── */}
            <section className="sis-section">
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-label" style={{ color: 'var(--sis-text-muted)' }}>EMPRESAS QUE CONFÍAN EN SCALA</div>
                    <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', alignItems: 'center', margin: '32px 0 64px', flexWrap: 'wrap' }}>
                        {['Grupo Riviera', 'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW'].map((name, i) => (
                            <span key={i} style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sis-text-primary)', opacity: 0.25, letterSpacing: '0.02em' }}>{name}</span>
                        ))}
                    </div>
                    {/* Testimonials */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
                        {[
                            { name: 'Martín R.', role: 'CEO, Grupo Riviera', text: '"Encontramos que el 40% de nuestros leads no recibían seguimiento. Scala nos lo mostró en 24 horas."', stars: 5 },
                            { name: 'Laura P.', role: 'Head of Sales, Vertex', text: '"La visibilidad que nos da Scala sobre el equipo comercial cambió completamente nuestra forma de operar."', stars: 5 },
                            { name: 'Diego S.', role: 'Founder, Capital Sur', text: '"Recuperamos $32k en oportunidades que estaban abandonadas. Sin invertir un peso más en tráfico."', stars: 5 },
                        ].map((t, i) => (
                            <div key={i} className="sis-card-static" style={{ textAlign: 'left', padding: '28px' }}>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="var(--sis-warning)" color="var(--sis-warning)" />)}
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--sis-text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{t.text}</p>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{t.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="sis-section sis-section-alt" style={{ paddingBottom: '60px' }}>
                <div className="sis-container" style={{ textAlign: 'center' }}>
                    <div className="sis-glow-green" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', position: 'absolute' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 className="sis-h2" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
                            ¿Listo para ver por dónde se escapan tus ventas?
                        </h2>
                        <p className="sis-body" style={{ maxWidth: '460px', margin: '0 auto 32px', fontSize: '16px' }}>
                            Agendá una demo y descubrí en minutos cuánto revenue estás dejando sobre la mesa.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <Link to="/formulario" className="sis-btn sis-btn-primary sis-btn-lg" target="_blank">
                                Solicitar demo gratuita <ArrowRight size={16} />
                            </Link>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginTop: '16px' }}>Setup en 24hs · Sin compromiso · Resultados inmediatos</p>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ padding: '32px 0', borderTop: '1px solid var(--sis-border)', background: 'var(--sis-bg-primary)' }}>
                <div className="sis-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}><Logo /></Link>
                    <p style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>© 2026 Scala. Todos los derechos reservados.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/" style={{ fontSize: '12px', color: 'var(--sis-text-tertiary)', textDecoration: 'none' }}>Inicio</Link>
                        <Link to="/sistema/login" style={{ fontSize: '12px', color: 'var(--sis-text-tertiary)', textDecoration: 'none' }}>Acceder</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
