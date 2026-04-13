"use client"

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddService = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [min_usage, setMinUsage] = useState<number>(0);
    const [max_usage, setMaxUsage] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    // const openModal = (
    //     alert("Modal Clicked"),
    //     setIsShow(true),
    //     setName(""),
    //     setMinUsage(0),
    //     setMaxUsage(0),
    //     setPrice(0)
    // )

    const openModal = () => {
    alert("Modal Clicked");
    setIsShow(true);
    setName("");
    setMinUsage(0);
    setMaxUsage(0);
    setPrice(0);
};

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
        
        const toke = await getCookie("AccessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services${toke ? "" : ""}`
        const payload = JSON.stringify({
            name,
            min_usage,
            max_usage,
            price,
        })   
        
        console.log(payload);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${toke}`,
            },
            body: payload
        })

        const result = await response.json()
        if (result?.success) {
            setIsShow(false)
            toast.success(result?.message)
            setTimeout(() =>
                router.refresh(), 1000)
        } else {
            toast.warning(result?.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
        
    }
    return (
        <div>
            <div>
               <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button onClick={openModal} variant="default">add data service</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>
            Add new service here.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field>
            <Label htmlFor="min_usage">Min Usage</Label>
            <Input id="min_usage" name="min_usage" type="number" placeholder="0" value={min_usage} onChange={(e) => setMinUsage(Number(e.target.value))} />
          </Field>
          <Field>
            <Label htmlFor="max_usage">Max Usage</Label>
            <Input id="max_usage" name="max_usage" type="number" placeholder="0" value={max_usage} onChange={(e) => setMaxUsage(Number(e.target.value))} />
          </Field>
          <Field>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" placeholder="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
</Dialog>
            </div>
        </div>
        
    )
}

export default AddService;