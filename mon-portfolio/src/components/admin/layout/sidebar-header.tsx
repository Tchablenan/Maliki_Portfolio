'use client';

import Link from 'next/link';
import { ChevronFirst } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useLayout } from './context';

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-mono">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#00C2FF] text-sm font-bold text-white">
        M
      </span>
      {!compact && (
        <span className="default-logo">
          Dr Maliki<span className="text-[#00C2FF]">.</span>
        </span>
      )}
    </span>
  );
}

export function SidebarHeader() {
  const { sidebarCollapse, setSidebarCollapse } = useLayout();

  return (
    <div className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
      <Link href="/admin" aria-label="Tableau de bord">
        <Logo />
      </Link>
      <Button
        onClick={() => setSidebarCollapse(!sidebarCollapse)}
        size="sm"
        mode="icon"
        variant="outline"
        aria-label="Réduire le menu"
        className={cn(
          'size-7 absolute start-full top-2/4 rtl:translate-x-2/4 -translate-x-2/4 -translate-y-2/4',
          sidebarCollapse ? 'ltr:rotate-180' : 'rtl:rotate-180',
        )}
      >
        <ChevronFirst className="size-4!" />
      </Button>
    </div>
  );
}

export { Logo };
