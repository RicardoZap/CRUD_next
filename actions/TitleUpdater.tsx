"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TitleUpdater() {
  const pathname = usePathname();

  function getTitle(path: string) {
    if (path.startsWith("/enterprises")) return "Empresas"
    if (path.startsWith("/users")) return "Usuarios"
    if (path.startsWith("/dashboard")) return "Dashboard"
    if (path.startsWith("/assignment")) return "Asignaciones"
    if (path.startsWith("/roles")) return "Roles"

    return "Mi Aplicación";
  };

  useEffect(() => {
    document.title = getTitle(pathname);
  }, [pathname]);

  return null;
}

