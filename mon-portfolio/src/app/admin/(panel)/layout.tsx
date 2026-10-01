import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/layout/shell";
import { requireAdmin } from "@/lib/admin/guard";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const { user } = await requireAdmin();
  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
