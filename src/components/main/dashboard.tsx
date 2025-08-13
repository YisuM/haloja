import { getUser } from "@/dal/user/get-user";
import { OrderForm } from "./OrderForm";
export default async function Dashboard() {

    await getUser();

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center">
            <OrderForm />
        </div>
    );
}