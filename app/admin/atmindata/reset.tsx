"use client"

import { Admin } from "@/app/types"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { getCookie } from "cookies-next"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const ResetPasswordAdmin = ({
    selectedData
}: {
    selectedData: Admin
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");

    const handleReset = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            if (!newPassword || newPassword.length < 6) {
                toast.error("Password harus minimal 6 karakter");
                return;
            }

            const token = await getCookie("AccessToken");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`;
            const payload = JSON.stringify({
                password: newPassword
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
                toast.success("Password berhasil direset!")
                setOpen(false)
                setNewPassword("")
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast.warning(result?.message || "Gagal reset password")
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    size="sm"
                    variant="outline"
                    className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200"
                >
                    Reset Pass
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleReset}>
                    <DialogHeader>
                        <DialogTitle>Reset Password Admin</DialogTitle>
                        <DialogDescription>
                            Masukkan password baru untuk {selectedData.name}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="password">Password Baru</Label>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="Minimal 6 karakter" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                            Reset Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ResetPasswordAdmin