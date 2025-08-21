"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { toast } from "react-toastify"

export default function ButtonSubmit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="cursor-pointer"
      onClick={() => toast.info("Submitting form...")}
    >
      {pending ? "Deploying..." : children}
    </Button>
  )
}
