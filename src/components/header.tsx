import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

import { AccountMenu } from "./account-menu";
import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";

export function Header() {
  const [toggle, setToggle] = useState(false);

  function handleClickToggle() {
    setToggle(!toggle);
  }
  return (
    <div className="border-b">
      <div className="flex min-h-16 w-full flex-wrap items-center justify-between gap-6 px-6 pb-8 pt-8 md:justify-start">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6 pt-8" />
        <a href="#" onClick={handleClickToggle}>
          <svg
            xmlns="<http://www.w3.org/2000/svg>"
            id="menu-button"
            className="block h-6 w-6 cursor-pointer md:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </a>
        <nav
          className={`w-full gap-4 md:visible md:flex md:w-auto md:items-center ${toggle ? "visibile" : "hidden"}`}
          id="menu"
        >
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
