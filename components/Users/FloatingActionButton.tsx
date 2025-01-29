"use client"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, MessageSquare, Settings, User } from "lucide-react"
import { DialogForm } from "./DialogForm"

export default function FloatingActionButton() {
    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10">
            <Popover>
                <PopoverTrigger asChild>
                    <DialogForm />
                </PopoverTrigger>
            </Popover>
        </div>
    )
}
