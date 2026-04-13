"use client"

import { Admin } from "@/app/types"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const EditAdmin = ({
    selectedData
}: {
    selectedData: Admin
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>(selectedData.name)
    const [phone, setPhone] = useState<string>(selectedData.phone)

    const openDialog = () => {
        setOpen(true)
        setName(selectedData.name)
        setPhone(selectedData.phone)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            const token = await getCookie("AccessToken");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`;
            const payload = JSON.stringify({
                name, 
                phone
            })

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: payload
            })

            const result = await response.json();

            if (result?.success) {
                toast.success(result.message)
                setOpen(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast.warning(result.message)
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error}`)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    onClick={openDialog}
                    size="sm"
                    variant="outline"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Admin</DialogTitle>
                        <DialogDescription>
                            Update admin information
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder="Admin Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                                id="phone" 
                                name="phone" 
                                type="text" 
                                placeholder="Phone Number" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditAdmin