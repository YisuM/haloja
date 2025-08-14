import { ToastContainer } from "react-toastify"
import CreateServer  from "@/components/main/CreateServer";

export default function CreateServerPage() {
    
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
            <CreateServer />        
        </>
    );
}