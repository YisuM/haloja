import  OrderForm  from "@/components/main/OrderForm";
import { Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../ui/card";

export default function Order() {

    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Order Form</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderForm />
            </CardContent>
        </Card>
    );
}