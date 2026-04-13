"use client"

import { Service } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const DeleteService = (
    { selectedData}: {
    selectedData: Service
}) => {
    const router = useRouter();
     const [open, setOpen] = useState<boolean>(false);

     const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
        
        const token = await getCookie("AccessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`
        
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
        })

        const result = await response.json()
        if (result?.success) {
            setOpen(false)
            toast.success(result?.message)
            setTimeout(() =>
                window.location.reload(), 1000)
        } else {
            toast.warning(result?.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
        
    }

    return (
    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogTrigger asChild>
        <Button variant="outline" color="red">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account {selectedData.name} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteService

function getCookie(arg0: string) {
  throw new Error("Function not implemented.")
}


