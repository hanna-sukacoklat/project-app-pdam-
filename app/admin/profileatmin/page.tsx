import { getCookies } from "@/lib/server-cookie";
import AdminProfileForm from "./form";

export default async function ProfilePage() {
    const token = await getCookies(`AccessToken`);
    
    // Ambil data profil dari endpoint profile yang sesuai dengan token
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/me`, {
        method: "GET",
        headers: {
            "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
            "Authorization": `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const res = await response.json();
    if (!response.ok) return <div className="p-10 text-red-500">Gagal mengambil data profil</div>;

    // Pastikan adminData sesuai struktur API kamu (biasanya res.data)
    return <AdminProfileForm admin={res.data} />;
}