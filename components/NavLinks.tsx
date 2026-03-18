'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Map, MessageSquare, Clock, Activity, Brain, Columns3, BookOpen, Settings, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CronJob } from '@/lib/types';
import { useSettings } from '@/app/settings-provider';
import { useAgentsContext } from '@/app/agents-provider';
import { i18n } from '@/lib/i18n';

function getInitials(name: string | null): string {
  if (!name) return '??'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ---------------------------------------------------------------------------
// Nav item definition
// ---------------------------------------------------------------------------

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: 'agents' | 'unread' | 'errors';
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: i18n.nav.items.home, icon: Map, badge: 'agents' },
  { href: '/kanban', label: i18n.nav.items.kanban, icon: Columns3 },
  { href: '/chat', label: i18n.nav.items.chat, icon: MessageSquare, badge: 'unread' },
  { href: '/crons', label: i18n.nav.items.crons, icon: Clock, badge: 'errors' },
  { href: '/activity', label: i18n.nav.items.activity, icon: Activity },
  { href: '/costs', label: i18n.nav.items.costs, icon: DollarSign },
  { href: '/memory', label: i18n.nav.items.memory, icon: Brain },
  { href: '/docs', label: i18n.nav.items.docs, icon: BookOpen },
  { href: '/settings', label: i18n.nav.items.settings, icon: Settings },
];

// ---------------------------------------------------------------------------
// NavLinks component
// ---------------------------------------------------------------------------

export function NavLinks({ bottomSlot }: { bottomSlot?: React.ReactNode } = {}) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const { agents } = useAgentsContext();
  const agentCount = agents.length > 0 ? agents.length : null;
  const [cronCount, setCronCount] = useState<number | null>(null);
  const [cronErrorCount, setCronErrorCount] = useState<number | null>(null);

  // Fetch cron error count
  useEffect(() => {
    fetch('/api/crons')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: unknown) => {
        const crons: CronJob[] = Array.isArray(data)
          ? data
          : (data as { crons?: CronJob[] })?.crons ?? [];
        setCronCount(crons.length);
        setCronErrorCount(crons.filter((c) => c.status === 'error').length);
      })
      .catch(() => {
        setCronErrorCount(null);
      });
  }, []);

  // Resolve badge content per nav item
  function getBadge(item: NavItem): React.ReactNode {
    if (item.badge === 'agents' && agentCount !== null) {
      return (
        <span
          className="nav-badge"
          style={{
            marginLeft: 'auto',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            padding: '1px 6px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--fill-quaternary)',
            color: 'var(--text-tertiary)',
            lineHeight: '16px',
          }}
        >
          {agentCount}
        </span>
      );
    }
    if (item.badge === 'errors' && cronCount !== null) {
      const hasErrors = cronErrorCount !== null && cronErrorCount > 0;
      return (
        <span
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            className="nav-badge"
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              padding: '1px 6px',
              borderRadius: 'var(--radius-sm)',
              background: hasErrors ? 'rgba(255,69,58,0.1)' : 'var(--fill-quaternary)',
              color: hasErrors ? 'var(--system-red)' : 'var(--text-tertiary)',
              lineHeight: '16px',
              fontWeight: hasErrors ? 600 : undefined,
            }}
          >
            {hasErrors ? `${cronErrorCount} 错误` : cronCount}
          </span>
          {hasErrors && (
            <span
              aria-label={`${cronErrorCount} cron error${cronErrorCount > 1 ? 's' : ''}`}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--system-red)',
                flexShrink: 0,
                animation: 'pulse-red 1.5s ease-in-out infinite',
              }}
            />
          )}
        </span>
      );
    }
    return null;
  }

  return (
    <nav className="flex-1 flex flex-col" style={{ minHeight: 0, overflow: 'hidden' }} aria-label="Main navigation">
      {/* Scrollable nav items */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 12px 8px' }}>
        {/* Section header */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            padding: '0 8px',
            marginBottom: '2px',
          }}
        >
            {i18n.nav.workspace}
          </div>

        <div className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item focus-ring ${isActive ? 'nav-item-active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '36px',
                  padding: '0 10px 0 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-fill)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 100ms var(--ease-smooth)',
                }}
              >
                <Icon
                  size={16}
                  style={{
                    flexShrink: 0,
                    color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                    transition: 'color 100ms var(--ease-smooth)',
                  }}
                />
                <span style={{ flex: 1 }}>{item.label}</span>
                {getBadge(item)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pinned bottom: usage widget + user footer */}
      <div style={{ flexShrink: 0 }}>
        {bottomSlot}

        {/* User footer */}
        <div
          style={{
            borderTop: '1px solid var(--separator)',
            padding: '8px 16px',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'var(--accent-fill)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--accent)',
                flexShrink: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {getInitials(settings.operatorName)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {settings.operatorName ?? 'Operator'}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                }}
              >
                Owner
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
