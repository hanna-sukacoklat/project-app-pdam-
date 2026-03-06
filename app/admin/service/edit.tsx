"use client"

import { Service } from "@/app/types"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const EditService = ({
    selectedData
}: {
    selectedData: Service
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("")
    const [min_usage, setMinUsage] = useState<number>(0)
    const [max_usage, setMaxUsage] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModel = () => {
        setOpen(true)
        setName(selectedData.name)
        setMinUsage(selectedData.min_usage)
        setMaxUsage(selectedData.max_usage)
        setPrice(selectedData.price)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            const token = getCookie("accessToken", "");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`;
            const payload = JSON.stringify({
                name, min_usage, max_usage, price
            })

            const response = await fetch(url,{
                method: "PATCH",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: payload
            })

            const result = await response.json();

            if (result?.success) {
                toast.success(result.message)
                setOpen(false)
                setTimeout(() => router.refresh(), 1000)
            }else {
                toast.warning(result.message)
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error}`)
        }
    }

    return (
        <div className="flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className=" bg-gray-200 mt-5 border shadow-2xl rounded-full text-center" variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name" name="name" type="text" placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Field>
                            <Field >
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" type="number" placeholder="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </Field>
                            <Field >
                                <Label htmlFor="max_usage">Max Usage</Label>
                                <Input id="max_usage" name="max_usage" type="number" placeholder="0" value={max_usage} onChange={(e) => setMaxUsage(Number(e.target.value))} />
                            </Field>
                            <Field >
                                <Label htmlFor="min_usage">Min Usage</Label>
                                <Input id="min_usage" name="min_usage" type="number" placeholder="0" value={min_usage} onChange={(e) => setMinUsage(Number(e.target.value))} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline">Close</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                </form>
                    </DialogContent>
            </Dialog>
        </div>
    )
}
export default EditService