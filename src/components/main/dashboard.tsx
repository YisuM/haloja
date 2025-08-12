import { getUser } from "@/dal/user/get-user";
export default async function Dashboard() {

    await getUser();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
}