import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import "@/styles/admin/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s · Back-office", default: "Back-office · Dr Maliki" },
  robots: { index: false, follow: false },
};

/** Root layout of the back office (Metronic, Layout 1) — fully separate from the public site. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body className={cn("antialiased flex h-full text-base text-foreground bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" storageKey="admin-theme" enableSystem disableTransitionOnChange enableColorScheme>
          <TooltipProvider delayDuration={0}>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
