"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    useRouter().push("/users")
  );
}
