"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoaderComponent() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null

    const loaderColor = theme === "dark" ? "#ffffff" : "#000000"

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <p>Cargando...</p>
            <ClipLoader color={loaderColor} size={150} />
        </div>
    );
}
