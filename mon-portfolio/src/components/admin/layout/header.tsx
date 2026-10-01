'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { signOut } from '@/app/admin/actions/auth';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Logo } from './sidebar-header';
import { SidebarMenu } from './sidebar-menu';

export function Header({ email }: { email: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const mobile = useIsMobile();
  const sticky = useScrollPosition() > 0;
  const { resolvedTheme, setTheme } = useTheme();

  // Close the mobile menu after navigating.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setSheetOpen(false);
  }

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
        sticky && 'border-b border-border',
      )}
    >
      <div className="container-fluid flex justify-between items-stretch lg:gap-4">
        <div className="flex lg:hidden items-center gap-2.5">
          <Link href="/admin" aria-label="Tableau de bord">
            <Logo compact />
          </Link>
          {mobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" mode="icon" aria-label="Ouvrir le menu">
                  <Menu className="text-muted-foreground/70" />
                </Button>
              </SheetTrigger>
              <SheetContent className="p-0 gap-0 w-[275px]" side="left" close={false}>
                <SheetHeader className="p-0 space-y-0">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <SheetBody className="p-0 overflow-y-auto">
                  <SidebarMenu />
                </SheetBody>
              </SheetContent>
            </Sheet>
          )}
        </div>

        <div className="hidden lg:flex items-center text-sm text-muted-foreground">Back-office du portfolio</div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/fr" target="_blank" rel="noopener noreferrer">
              <ExternalLink /> <span className="hidden sm:inline">Voir le site</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="size-9"
            aria-label="Changer de thème"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="size-4.5! hidden dark:block" />
            <Moon className="size-4.5! dark:hidden" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="grid size-9 place-items-center rounded-full bg-[#00C2FF] text-sm font-semibold text-white uppercase"
                aria-label="Compte"
              >
                {email.charAt(0) || 'A'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="font-normal">
                <span className="block text-xs text-muted-foreground">Connecté en tant que</span>
                <span className="block truncate text-sm font-medium">{email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action={signOut}>
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full">
                    <LogOut /> Se déconnecter
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
