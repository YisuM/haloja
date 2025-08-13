import { getUser } from "@/dal/user/get-user";
import  Order  from "@/components/main/Order";

export default async function Dashboard() {

    await getUser();

    return (
        
        <Order />
        
    );
}