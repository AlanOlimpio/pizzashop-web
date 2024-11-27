import { Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";
export function AuthLayout() {
  return (
    <div className="grid md:min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground max-md:h-full">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 flex items-center border-t border-foreground/5 bg-muted px-10 py-4 text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center pb-20">
        <Outlet />
      </div>
    </div>
  );
}
