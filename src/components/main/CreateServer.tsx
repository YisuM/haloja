import OrderForm from "@/components/main/OrderForm";
import { getUser } from "@/dal/user/get-user";

export default async function CreateServer() {
    // Ensure user is authenticated before rendering the form
    const user = await getUser();
    console.log(user);

    return (
        <main className="max-w-3xl min-h-dvh mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <h1 className="text-3xl font-bold mb-6">Create Server</h1>
            <OrderForm />
        </main>
    );
}