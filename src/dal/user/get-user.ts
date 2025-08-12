import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getUser() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        redirect("/api/auth/login");
    }

    return user;
}