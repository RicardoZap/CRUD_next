import { Input } from "@/components/ui/input";
import { BellIcon, MailIcon, Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

type NavBarComponentProps = {
    children: React.ReactNode
}

export default function NavBarComponent({ children }: NavBarComponentProps) {
    return (
        <div className="w-full">
            <div className="sticky top-0 z-10 flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
                    {children}
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-10 pr-4" />
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <MailIcon className="h-6 w-6 text-muted-foreground cursor-pointer" />
                        <BellIcon className="h-6 w-6 text-muted-foreground cursor-pointer" />
                        <ModeToggle />
                    </div>
                </header>
            </div>
        </div>
    );
}
