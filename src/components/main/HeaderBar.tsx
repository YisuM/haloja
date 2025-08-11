import Link from "next/link";
import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";

export default async function HeaderBar() {

    const { getUser } = getKindeServerSession()
    const user = await getUser();

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Header Bar</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
                    <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
                </ul>
            </nav>
            <div>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <div className="relative w-10 h-10">
                            <Image src={user.picture || ''} alt="user logo" fill className="rounded-full" />
                        </div>


                        <LogoutLink
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "bg-rose-600 text-white hover:bg-rose-700",
                                "px-4 py-2 rounded-md"
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
                                "bg-emerald-300 text-black hover:bg-emerald-400",
                                "px-4 py-2 rounded-md"
                            )}
                        >
                            Login
                        </LoginLink>


                        <RegisterLink 
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "bg-emerald-100 text-black hover:bg-emerald-200",
                                "px-4 py-2 rounded-md"
                            )}
                        >
                            Register
                        </RegisterLink>

                    </div>
                )}
            </div>
        </header>
    )
}