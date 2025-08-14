import OrderForm from "@/components/main/OrderForm";
import { getUser } from "@/dal/user/get-user";

export default async function CreateServer() {
    // Ensure user is authenticated before rendering the form
    const user = await getUser();
    console.log(user);

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Create Server</h1>
            <OrderForm />
        </main>
    );
}