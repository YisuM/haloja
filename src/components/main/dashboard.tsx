import { getUser } from "@/dal/user/get-user";
import Order from "@/components/main/Order";
import Link from "next/link";
import Image from "next/image";

const serverInfo = [
    {
        id: "001",
        icon: "file.svg",
        name: "wordpress-test",
        cpu: "0.5 vCPU",
        memory: "1 GB",
        region: "us-east-1",
        status: "running",
        public_ip: "34.152.46.148",
        date_string: '2025-08-01T12:00:00Z',
    },
    {
        id: "002",
        icon: "file.svg",
        name: "wordpress-test-2",
        cpu: "0.5 vCPU",
        memory: "1 GB",
        region: "us-east-1",
        status: "stopped",
        public_ip: "54.78.46.123",
        date_string: '2025-07-31T14:56:00Z',
    }

]

interface serverInfoType {
    id: string;
    icon: string;
    name: string;
    cpu: string;
    memory: string;
    region: string;
    status: string;
    public_ip: string;
    date_string: string;
}

export default async function Dashboard() {

    await getUser();

    return (

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-col items-center justify-center">
            <div className="mb-2 md:mb-4 flex items-center justify-center">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            </div>
            <section className="w-full flex justify-end items-center border-2 border-slate-700">
                <Link
                    href={'/dashboard/create'}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                >
                    Create Server
                </Link>
            </section>
            <section
                className="mt-8 grid grid-cols-1 gap-2 md:gap-4"
            >
                <ul className="unstyled-list space-y-2">

                    {serverInfo.map((server: serverInfoType) => (
                        <li
                            key={server.id}
                            className="bg-slate-200 dark:bg-background p-4 rounded-lg shadow-md border border-slate-300 dark:border-slate-700 transition-colors"
                        >
                            {/* Encabezado con icono y nombre */}
                            <div className="flex items-center mb-3 relative">
                                <Image
                                    src={`${server.icon}`}
                                    alt={server.name}
                                    className="h-8 w-8 rounded-full border border-slate-300 dark:border-secondary-foreground"
                                    fill
                                />
                                <span className="font-semibold text-slate-400 dark:text-secondary-foreground">
                                    {server.name}
                                </span>
                            </div>

                            {/* Datos del servidor en grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                <span className="text-gray-700 dark:text-secondary-foreground">CPU: {server.cpu}</span>
                                <span className="text-gray-700 dark:text-secondary-foreground">Memory: {server.memory}</span>
                                <span className="text-gray-700 dark:text-secondary-foreground">Region: {server.region}</span>
                                <span className="text-gray-700 dark:text-secondary-foreground">Status: {server.status}</span>
                                <span className="text-gray-700 dark:text-secondary-foreground">Public IP: {server.public_ip}</span>
                                <span className="text-gray-700 dark:text-secondary-foreground">{server.date_string}</span>
                            </div>
                        </li>
                    ))}

                </ul>
            </section>

        </main>


    );
}