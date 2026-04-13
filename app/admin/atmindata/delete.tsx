"use client"

import { Admin } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { getCookie } from "cookies-next"

const DeleteAdmin = ({
    selectedData
}: {
    selectedData: Admin
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            const token = await getCookie("AccessToken");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`
            
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
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast.warning(result?.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button 
                    size="sm"
                    variant="destructive"
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete {selectedData.name}? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAdmin