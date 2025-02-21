import { Rol } from "@prisma/client";
import { useRolStore } from "../store";

export const fetchRoles = async () => {
    try {
        const response = await fetch("/roles/api")
        const data: Rol[] = await response.json();
        useRolStore.getState().setRol(data);
    } catch (error) {
        console.error("Error cargando empresas:", error);
    }
}