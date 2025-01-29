import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-4">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-lg">Inicio</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="text-lg">Sobre nosotros</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="text-lg">Contacto</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>

      <div className="text-xl font-bold">Gestión de Usuarios</div>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="text-sm font-medium">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about" className="text-sm font-medium">Usuarios</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/contact" className="text-sm font-medium">Contacto</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

    </nav>
  )
}
