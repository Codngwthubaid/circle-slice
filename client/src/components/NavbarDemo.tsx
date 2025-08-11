import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Menu", link: "#menu" },
    { name: "Gallery", link: "#gallery" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full navbar-font">
      <Navbar className="flex items-center justify-between px-4 py-3">
        <NavBody className="hidden md:flex w-full items-center justify-between">
          {/* Left: Logo */}
          <NavbarLogo />

          {/* Right: Desktop Menu */}
          <NavItems
            items={navItems}
            className="text-pink-400 navbar-font text-2xl"
          />
        </NavBody>

        {/* Mobile: Hamburger Menu */}
        <div className="flex md:hidden w-full items-center justify-between">
          <NavbarLogo />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-md text-pink-400"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-900">
              <nav className="flex flex-col justify-center items-center h-full gap-4 mt-8">
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-pink-400"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Navbar>
    </div>
  );
}
