"use client";

import { useState } from "react";
import { Admin } from "@/app/types";
import { getCookie } from "cookies-next";
import { toast } from "sonner"; // Opsional: gunakan alert() jika belum install

export default function AdminProfileForm({ admin }: { admin: Admin }) {
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [profile, setProfile] = useState({
        name: admin.name,
        username: admin.user.username,
        phone: admin.phone,
    });

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const token = getCookie("AccessToken");
            // MENGGUNAKAN METHOD PATCH SESUAI GAMBAR POSTMAN
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${admin.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: profile.name,
                    phone: profile.phone
                    // username biasanya tidak diupdate di PATCH admin, sesuaikan dengan API mu
                }),
            });

            if (response.ok) {
                alert("Profil berhasil diperbarui!");
                setIsEdit(false);
                window.location.reload(); // Refresh data terbaru
            } else {
                const err = await response.json();
                alert(err.message || "Gagal update");
            }
        } catch (error) {
            alert("Terjadi kesalahan jaringan");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-sky-50 p-6">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-sky-50 bg-white">
                    <div>
                        <h1 className="text-xl font-bold text-sky-700">Admin Profile</h1>
                        <p className="text-sm text-sky-400">Informasi akun login</p>
                    </div>

                    {!isEdit ? (
                        <button onClick={() => setIsEdit(true)} className="px-5 py-2 rounded-full bg-sky-500 text-white text-sm font-bold">
                            Edit Profil
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => setIsEdit(false)} className="px-5 py-2 rounded-full bg-gray-100 text-gray-500 text-sm">
                                Batal
                            </button>
                            <button onClick={handleSave} disabled={isLoading} className="px-5 py-2 rounded-full bg-sky-600 text-white text-sm font-bold">
                                {isLoading ? "Loading..." : "Simpan"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-6 space-y-4">
                    {/* Input Field Sama Seperti Kodingan Kamu Sebelumnya */}
                    <div>
                        <label className="text-xs font-bold text-sky-700 ml-1">Nama</label>
                        <input 
                            value={profile.name} 
                            disabled={!isEdit} 
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className={`w-full p-3 rounded-xl border mt-1 ${isEdit ? "border-sky-300" : "bg-gray-50 border-gray-100"}`}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-sky-700 ml-1">Username (Read Only)</label>
                        <input value={profile.username} disabled className="w-full p-3 rounded-xl border mt-1 bg-gray-50 border-gray-100 text-gray-400" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-sky-700 ml-1">No. Telepon</label>
                        <input 
                            value={profile.phone} 
                            disabled={!isEdit} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className={`w-full p-3 rounded-xl border mt-1 ${isEdit ? "border-sky-300" : "bg-gray-50 border-gray-100"}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}