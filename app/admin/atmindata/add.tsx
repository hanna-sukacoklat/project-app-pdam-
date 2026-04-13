"use client"

import { getCookie } from "@/lib/client-cookies";
import { useRouter, useSearchParams } from "next/navigation";
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

const AddAdmin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setIsLoading(true)
        
            const token = getCookie("accessToken", "");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins`
            const payload = JSON.stringify({
                name,
                username,
                password,
                phone,
            })   

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                },
                body: payload
            })

            const result = await response.json()
            
            if (result?.success) {
                toast.success(result?.message || "Admin berhasil ditambahkan")
                
                // Reset form
                setName("")
                setUsername("")
                setPassword("")
                setPhone("")
                setOpen(false)
                
                // Tunggu sebentar baru refresh
                await new Promise(resolve => setTimeout(resolve, 800))
                
                // Push ke halaman 1 (reset pagination)
                router.push("?page=1")
                router.refresh()
            } else {
                toast.error(result?.message || "Gagal membuat admin")
            }

        } catch (error) {
            console.log("Error:", error);
            toast.error("Terjadi kesalahan")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Add Admin</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add New Admin</DialogTitle>
                        <DialogDescription>
                            Create a new admin account
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
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
                                    disabled={isLoading}
                                    required
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="username">Username</Label>
                                <Input 
                                    id="username" 
                                    name="username" 
                                    type="text" 
                                    placeholder="Username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    disabled={isLoading}
                                    required
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                    required
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" disabled={isLoading}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Admin"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddAdmin;