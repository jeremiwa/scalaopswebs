import { Settings as SettingsIcon, Users, Shield, Palette, Link2, Bell, CreditCard, Lock, Globe } from 'lucide-react';
import { useState } from 'react';

const TABS = [
    { icon: <Globe size={16} />, label: 'Workspace' },
    { icon: <Users size={16} />, label: 'Usuarios' },
    { icon: <Shield size={16} />, label: 'Permisos' },
    { icon: <Palette size={16} />, label: 'Branding' },
    { icon: <Link2 size={16} />, label: 'Canales' },
    { icon: <SettingsIcon size={16} />, label: 'Integraciones' },
    { icon: <Bell size={16} />, label: 'Notificaciones' },
    { icon: <CreditCard size={16} />, label: 'Billing' },
    { icon: <Lock size={16} />, label: 'Seguridad' },
];

export const SistemaSettings = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="sis-page-header">
                <div className="sis-page-title">Settings</div>
                <div className="sis-page-subtitle">Configuración de tu workspace y plataforma</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
                {/* Settings Nav */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {TABS.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 14px', borderRadius: '8px', border: 'none',
                                background: i === activeTab ? 'var(--sis-accent-subtle)' : 'transparent',
                                color: i === activeTab ? 'var(--sis-accent)' : 'var(--sis-text-tertiary)',
                                cursor: 'pointer', fontFamily: 'var(--sis-font-sans)', fontSize: '13px',
                                fontWeight: 500, textAlign: 'left', width: '100%', transition: 'all 0.15s'
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="sis-card-static">
                    {activeTab === 0 && (
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '20px' }}>Workspace</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
                                <div>
                                    <label className="sis-input-label">Nombre del workspace</label>
                                    <input className="sis-input" defaultValue="Grupo Riviera" />
                                </div>
                                <div>
                                    <label className="sis-input-label">URL del workspace</label>
                                    <input className="sis-input" defaultValue="grupo-riviera.scalaops.com" disabled style={{ opacity: 0.6 }} />
                                </div>
                                <div>
                                    <label className="sis-input-label">Zona horaria</label>
                                    <input className="sis-input" defaultValue="America/Argentina/Buenos_Aires" />
                                </div>
                                <div>
                                    <label className="sis-input-label">Idioma</label>
                                    <input className="sis-input" defaultValue="Español (Argentina)" />
                                </div>
                                <button className="sis-btn sis-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>Guardar cambios</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Usuarios</h3>
                                <button className="sis-btn sis-btn-primary sis-btn-sm">+ Invitar usuario</button>
                            </div>
                            <table className="sis-table">
                                <thead>
                                    <tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Última actividad</th></tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Jeremías W.', email: 'jeremias@gruporiviera.com', role: 'Admin', status: 'Activo', last: 'Ahora' },
                                        { name: 'María G.', email: 'maria@gruporiviera.com', role: 'Closer', status: 'Activo', last: 'Hace 2h' },
                                        { name: 'Carlos R.', email: 'carlos@gruporiviera.com', role: 'Closer', status: 'Activo', last: 'Hace 4h' },
                                        { name: 'Ana P.', email: 'ana@gruporiviera.com', role: 'Setter', status: 'Activo', last: 'Ayer' },
                                        { name: 'Lucas M.', email: 'lucas@gruporiviera.com', role: 'Setter', status: 'Invitado', last: '—' },
                                    ].map((u, i) => (
                                        <tr key={i}>
                                            <td><span style={{ fontWeight: 500, color: 'var(--sis-text-primary)' }}>{u.name}</span></td>
                                            <td><span style={{ fontSize: '12px' }}>{u.email}</span></td>
                                            <td><span className="sis-tag sis-tag-neutral" style={{ fontSize: '10px' }}>{u.role}</span></td>
                                            <td><span className={`sis-tag ${u.status === 'Activo' ? 'sis-tag-green' : 'sis-tag-yellow'}`} style={{ fontSize: '10px' }}>{u.status}</span></td>
                                            <td><span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{u.last}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 5 && (
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '20px' }}>Integraciones</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                {[
                                    { name: 'WhatsApp Business', status: 'connected', desc: 'Sincronizar conversaciones de WhatsApp' },
                                    { name: 'Instagram', status: 'connected', desc: 'DMs y stories de Instagram' },
                                    { name: 'Slack', status: 'available', desc: 'Notificaciones y alertas en Slack' },
                                    { name: 'HubSpot', status: 'available', desc: 'Sincronizar contactos y deals' },
                                    { name: 'Calendly', status: 'available', desc: 'Agendar demos automáticamente' },
                                    { name: 'Zapier', status: 'available', desc: 'Conectar con +5000 apps' },
                                ].map((int, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--sis-bg-secondary)', border: '1px solid var(--sis-border)', borderRadius: 'var(--sis-radius-md)' }}>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '2px' }}>{int.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>{int.desc}</div>
                                        </div>
                                        {int.status === 'connected' ? (
                                            <span className="sis-tag sis-tag-green" style={{ fontSize: '10px' }}>Conectado</span>
                                        ) : (
                                            <button className="sis-btn sis-btn-secondary sis-btn-sm" style={{ fontSize: '11px' }}>Conectar</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 7 && (
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '20px' }}>Billing</h3>
                            <div style={{ padding: '20px', background: 'var(--sis-accent-subtle)', border: '1px solid rgba(16, 185, 129, 0.12)', borderRadius: 'var(--sis-radius-md)', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-accent)', marginBottom: '2px' }}>Plan Pro</div>
                                        <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>5 usuarios · Todos los módulos · Soporte prioritario</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '24px', fontWeight: 700, color: 'var(--sis-text-primary)' }}>$299<span style={{ fontSize: '14px', color: 'var(--sis-text-muted)' }}>/mes</span></div>
                                    </div>
                                </div>
                            </div>
                            <button className="sis-btn sis-btn-secondary sis-btn-sm">Cambiar plan</button>
                        </div>
                    )}

                    {![0, 1, 5, 7].includes(activeTab) && (
                        <div className="sis-empty">
                            <div className="sis-empty-icon">{TABS[activeTab].icon}</div>
                            <div className="sis-empty-title">{TABS[activeTab].label}</div>
                            <div className="sis-empty-desc">Esta sección estará disponible próximamente.</div>
                            <div style={{ marginTop: '12px' }}><span className="sis-coming-soon">✨ Coming soon</span></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
