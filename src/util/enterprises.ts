import { Enterprise } from "@prisma/client";
import { useEnterpriseStore } from "../store";

export const fetchEnterprises = async () => {
    try {
        const response = await fetch("/enterprises/api")
        const data: Enterprise[] = await response.json();
        useEnterpriseStore.getState().setEnterprises(data);
    } catch (error) {
        console.error("Error cargando empresas:", error);
    }
}