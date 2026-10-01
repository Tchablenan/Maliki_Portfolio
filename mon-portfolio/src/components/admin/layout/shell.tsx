'use client';

import { useEffect, type ReactNode } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';

import { LayoutProvider, useLayout } from './context';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

function Main({ children, email }: { children: ReactNode; email: string }) {
  const isMobile = useIsMobile();
  const { sidebarCollapse } = useLayout();

  useEffect(() => {
    document.body.classList.toggle('sidebar-collapse', sidebarCollapse);
  }, [sidebarCollapse]);

  useEffect(() => {
    const body = document.body.classList;
    body.add('demo1', 'sidebar-fixed', 'header-fixed');
    const timer = setTimeout(() => body.add('layout-initialized'), 1000);
    return () => {
      body.remove('demo1', 'sidebar-fixed', 'sidebar-collapse', 'header-fixed', 'layout-initialized');
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!isMobile && <Sidebar />}
      <div className="wrapper flex grow flex-col">
        <Header email={email} />
        <main className="grow pt-5" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

/** Metronic « Layout 1 » shell: fixed sidebar, sticky header, content and footer. */
export function AdminShell({ children, email }: { children: ReactNode; email: string }) {
  return (
    <LayoutProvider>
      <Main email={email}>{children}</Main>
    </LayoutProvider>
  );
}
