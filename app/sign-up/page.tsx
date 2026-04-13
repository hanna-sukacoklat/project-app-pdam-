"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, ShieldCheck, Phone, Loader2, Users, BadgeCheck } from "lucide-react"
import { toast } from "sonner"

export default function SignUpPage() {
    const router = useRouter()
    const [role, setRole] = useState<"ADMIN" | "CUSTOMER">("ADMIN")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleRoleSwitch(newRole: "ADMIN" | "CUSTOMER") {
        setRole(newRole)
        setUsername("")
        setPassword("")
        setName("")
        setPhone("")
    }

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const endpoint = role === "ADMIN" ? "/admins" : "/customers"

        const body = role === "ADMIN"
            ? JSON.stringify({ username, password, name })
            : JSON.stringify({ username, password, name, phone })

        try {
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "app-key": `${process.env.NEXT_PUBLIC_APP_KEY}`
                },
                body
            })

            const responseData = await response.json()

            if (!response.ok) {
                toast.error(responseData.message || "Gagal melakukan registrasi")
                return
            }

            toast.success("Registrasi berhasil! Silakan login.")
            router.push("/sign-in")

        } catch (error) {
            toast.error("Terjadi kesalahan pada server")
        } finally {
            setIsLoading(false)
        }
    }

    const isAdmin = role === "ADMIN"

    return (
        <div className="w-full h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-blue-600 to-indigo-900 flex items-center justify-center p-4">

            <div className="absolute top-20 left-20 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative bg-white/95 backdrop-blur-xl p-8 md:p-12 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white/20">

                {/* Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 rotate-3 transition-colors duration-300 ${isAdmin ? "bg-sky-500 shadow-sky-200" : "bg-indigo-500 shadow-indigo-200"}`}>
                        {isAdmin
                            ? <ShieldCheck className="text-white w-10 h-10" />
                            : <Users className="text-white w-10 h-10" />
                        }
                    </div>
                    <h1 className="text-3xl font-black text-sky-900 tracking-tight">
                        {isAdmin ? "Register Admin" : "Register Customer"}
                    </h1>
                    <p className="text-sky-500 text-sm mt-2 font-medium">PDAM Smart Billing System</p>
                </div>

                {/* Toggle */}
                <div className="flex bg-sky-50 border border-sky-100 rounded-2xl p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => handleRoleSwitch("ADMIN")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                            isAdmin
                                ? "bg-sky-500 text-white shadow-md"
                                : "text-sky-400 hover:text-sky-600"
                        }`}
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSwitch("CUSTOMER")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                            !isAdmin
                                ? "bg-indigo-500 text-white shadow-md"
                                : "text-sky-400 hover:text-sky-600"
                        }`}
                    >
                        Customer
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSignUp}>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-sky-700 ml-1">Nama Lengkap</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-sky-400">
                                <BadgeCheck size={18} />
                            </div>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className="w-full pl-11 pr-4 py-3.5 bg-sky-50 border border-sky-100 rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 rounded-2xl bg-sky-50 border"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 rounded-2xl bg-sky-50 border"
                    />

                    {/* Phone only customer */}
                    {!isAdmin && (
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="No. Telepon"
                            className="w-full p-3 rounded-2xl bg-sky-50 border"
                        />
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-3 rounded-2xl"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                    </button>

                    <p className="text-center text-sm text-sky-500">
                        Sudah punya akun?{" "}
                        <a href="/sign-in" className="font-bold">Login</a>
                    </p>

                </form>
            </div>
        </div>
    )
}