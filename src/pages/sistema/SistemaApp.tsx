import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import {
    LayoutDashboard, MessageSquare, TrendingDown, Users, MessageSquareWarning,
    Clock, PhoneCall, BrainCircuit, Kanban, Workflow, Bot, FileBarChart,
    Settings, Search, Bell, ChevronDown, LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../sistema.css';

import { SistemaDashboard } from './SistemaDashboard';
import { SistemaConversations } from './SistemaConversations';
import { SistemaLeakAnalysis } from './SistemaLeakAnalysis';
import { SistemaTeamPerformance } from './SistemaTeamPerformance';
import { SistemaObjections } from './SistemaObjections';
import { SistemaFollowUpGaps } from './SistemaFollowUpGaps';
import { SistemaCalls } from './SistemaCalls';
import { SistemaCallUpload } from './SistemaCallUpload';
import { SistemaCallDetail } from './SistemaCallDetail';
import { SistemaAIRecommendations } from './SistemaAIRecommendations';
import { SistemaCRM } from './SistemaCRM';
import { SistemaAutomations } from './SistemaAutomations';
import { SistemaAIAgent } from './SistemaAIAgent';
import { SistemaReports } from './SistemaReports';
import { SistemaSettings } from './SistemaSettings';

const NAV_SECTIONS = [
    {
        label: 'Overview',
        items: [
            { to: '/sistema/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
        ]
    },
    {
        label: 'Intelligence',
        items: [
            { to: '/sistema/app/conversations', icon: MessageSquare, label: 'Conversations' },
            { to: '/sistema/app/leak-analysis', icon: TrendingDown, label: 'Leak Analysis' },
            { to: '/sistema/app/team', icon: Users, label: 'Team Performance' },
            { to: '/sistema/app/objections', icon: MessageSquareWarning, label: 'Objections' },
            { to: '/sistema/app/follow-ups', icon: Clock, label: 'Follow-up Gaps' },
            { to: '/sistema/app/calls', icon: PhoneCall, label: 'Calls' },
        ]
    },
    {
        label: 'AI',
        items: [
            { to: '/sistema/app/ai-recommendations', icon: BrainCircuit, label: 'AI Recommendations' },
            { to: '/sistema/app/ai-agent', icon: Bot, label: 'AI Agent' },
        ]
    },
    {
        label: 'Operations',
        items: [
            { to: '/sistema/app/crm', icon: Kanban, label: 'CRM' },
            { to: '/sistema/app/automations', icon: Workflow, label: 'Automations' },
        ]
    },
    {
        label: 'Reportes',
        items: [
            { to: '/sistema/app/reports', icon: FileBarChart, label: 'Reports' },
        ]
    },
];

export const SistemaApp = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const userInitials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.[0]?.toUpperCase() || '?';

    return (
        <div className="sis-page sis-app-layout">
            {/* ── Sidebar ── */}
            <aside className="sis-sidebar">
                <div className="sis-sidebar-logo">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
                        <div style={{ width: '10px', height: '2.5px', background: 'white', borderRadius: '1px' }} />
                        <div style={{ width: '14px', height: '2.5px', background: 'white', borderRadius: '1px' }} />
                        <div style={{ width: '18px', height: '2.5px', background: 'white', borderRadius: '1px' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', letterSpacing: '0.12em' }}>SCALA</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'var(--sis-accent-subtle)', fontSize: '10px', fontWeight: 600, color: 'var(--sis-accent)' }}>
                        PRO
                    </div>
                </div>

                {/* Workspace Selector */}
                <div style={{ padding: '12px 12px 4px' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                        padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--sis-border)',
                        background: 'var(--sis-bg-secondary)', cursor: 'pointer', fontFamily: 'var(--sis-font-sans)'
                    }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, var(--sis-accent), var(--sis-teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0 }}>GR</div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Grupo Riviera</div>
                            <div style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>Pro Plan</div>
                        </div>
                        <ChevronDown size={14} style={{ color: 'var(--sis-text-muted)' }} />
                    </button>
                </div>

                {/* Nav Sections */}
                <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
                    {NAV_SECTIONS.map((section, si) => (
                        <div key={si} className="sis-sidebar-section">
                            <div className="sis-sidebar-section-label">{section.label}</div>
                            {section.items.map((item, ii) => (
                                <NavLink
                                    key={ii}
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) => `sis-sidebar-item ${isActive ? 'active' : ''}`}
                                >
                                    <item.icon size={18} className="sis-sidebar-icon" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Settings at bottom */}
                <div style={{ padding: '8px 12px 16px', borderTop: '1px solid var(--sis-border)' }}>
                    <NavLink
                        to="/sistema/app/settings"
                        className={({ isActive }) => `sis-sidebar-item ${isActive ? 'active' : ''}`}
                    >
                        <Settings size={18} className="sis-sidebar-icon" />
                        Settings
                    </NavLink>
                </div>
            </aside>

            {/* ── Topbar ── */}
            <div className="sis-topbar">
                <div className="sis-topbar-search">
                    <Search size={14} />
                    <span>Buscar leads, conversaciones, reportes...</span>
                    <kbd>⌘K</kbd>
                </div>
                <div className="sis-topbar-actions">
                    <button className="sis-topbar-btn">
                        <Bell size={18} />
                        <span className="sis-topbar-dot" />
                    </button>
                    {/* User info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '4px' }}>
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'Avatar'}
                                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--sis-border)' }}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="sis-topbar-avatar">{userInitials}</div>
                        )}
                        <button
                            onClick={logout}
                            title="Cerrar sesión"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '32px', height: '32px', borderRadius: '8px',
                                border: '1px solid var(--sis-border)', background: 'transparent',
                                cursor: 'pointer', color: 'var(--sis-text-muted)',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--sis-text-muted)'; e.currentTarget.style.borderColor = 'var(--sis-border)'; }}
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="sis-app-main">
                <Routes>
                    <Route index element={<SistemaDashboard />} />
                    <Route path="conversations" element={<SistemaConversations />} />
                    <Route path="leak-analysis" element={<SistemaLeakAnalysis />} />
                    <Route path="team" element={<SistemaTeamPerformance />} />
                    <Route path="objections" element={<SistemaObjections />} />
                    <Route path="follow-ups" element={<SistemaFollowUpGaps />} />
                    <Route path="calls" element={<SistemaCalls />} />
                    <Route path="calls/new" element={<SistemaCallUpload />} />
                    <Route path="calls/:id" element={<SistemaCallDetail />} />                    <Route path="ai-recommendations" element={<SistemaAIRecommendations />} />
                    <Route path="crm" element={<SistemaCRM />} />
                    <Route path="automations" element={<SistemaAutomations />} />
                    <Route path="ai-agent" element={<SistemaAIAgent />} />
                    <Route path="reports" element={<SistemaReports />} />
                    <Route path="settings" element={<SistemaSettings />} />
                </Routes>
            </main>
        </div>
    );
};
