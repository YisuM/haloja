import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";
import { Server } from "lucide-react";
import ThemeToggle from "./ThemToggle";
import Link from "next/link";

export default async function HeaderBar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
      <header className="bg-gray-900 border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href={"/"} className="flex items-center cursor-pointer">
              <Server className="h-8 w-8 text-emerald-400 mr-3" />
              <span className="text-2xl font-bold text-white font-serif">Haloja Cloud</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-emerald-400 transition-colors">
                Features
              </a>
              <a href="/pricing" className="text-white hover:text-emerald-400 transition-colors">
                Pricing
              </a>
              <a href="#support" className="text-white hover:text-emerald-400 transition-colors">
                Support
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10">
                    <Image src={user.picture || ''} alt="user logo" fill className="rounded-full" />
                  </div>
                  <LogoutLink
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "bg-emerald-500 text-white border-none hover:bg-emerald-600 font-semibold px-5 py-2 rounded-md shadow"
                    )}
                  >
                    Logout
                  </LogoutLink>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <LoginLink
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "bg-emerald-500 text-white border-none hover:bg-emerald-600 font-semibold px-5 py-2 rounded-md shadow"
                    )}
                  >
                    Sign In
                  </LoginLink>
                  <RegisterLink
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "bg-white text-emerald-600 border-emerald-500 hover:bg-emerald-100 font-semibold px-5 py-2 rounded-md shadow"
                    )}
                  >
                    Sign Up
                  </RegisterLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
}