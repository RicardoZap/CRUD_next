import { User } from "@prisma/client";
import { useUserStore } from "../store";

export const fetchUsers = async () => {
    try {
        const response = await fetch("/users/api")
        const data: User[] = await response.json();
        useUserStore.getState().setUsers(data);
    } catch (error) {
        console.error("Error cargando empresas:", error);
    }
}