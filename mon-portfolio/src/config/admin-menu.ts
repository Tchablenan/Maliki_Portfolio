import {
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Search,
  Settings,
  Wrench,
} from "lucide-react";

import type { MenuConfig } from "@/config/types";

export const MENU_SIDEBAR: MenuConfig = [
  { title: "Tableau de bord", icon: LayoutDashboard, path: "/admin" },
  { heading: "Contenu du site" },
  { title: "Accueil & À propos", icon: Home, path: "/admin/contenu/accueil" },
  { title: "Services", icon: Wrench, path: "/admin/contenu/services" },
  { title: "Références", icon: FolderKanban, path: "/admin/references" },
  { title: "Parcours", icon: Briefcase, path: "/admin/contenu/parcours" },
  { title: "Formation & compétences", icon: GraduationCap, path: "/admin/contenu/formation" },
  { title: "Recherche & distinctions", icon: BookOpen, path: "/admin/contenu/recherche" },
  { title: "Contact & pied de page", icon: Mail, path: "/admin/contenu/contact" },
  { title: "Référencement & navigation", icon: Search, path: "/admin/contenu/seo" },
  { heading: "Gestion" },
  { title: "Messages", icon: MessageSquareText, path: "/admin/messages" },
  { title: "Médias & CV", icon: ImageIcon, path: "/admin/medias" },
  { title: "Paramètres", icon: Settings, path: "/admin/parametres" },
];
