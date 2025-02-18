import { WorkflowIcon, Home, User2Icon, Search, Settings, UserCheck } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2 } from 'lucide-react';


const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Usuarios", url: "/users", icon: User2Icon },
    { title: "Empresas", url: "/enterprises", icon: WorkflowIcon },
    { title: "Roles", url: "/roles", icon: UserCheck },
    { title: "Asignaciones", url: "/assignment", icon: Search },
];

export function AppSidebar() {
    return (
        <Sidebar className="w-64 h-full">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="m-5 flex flex-row gap-2">
                            <Building2></Building2>
                            <p>Gestión Empresarial</p>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
