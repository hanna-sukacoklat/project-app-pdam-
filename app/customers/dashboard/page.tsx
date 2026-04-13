import { Customer } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";

type ResultData = {
    success: boolean
    message: string
    data: Customer,
}
 
async function getCustomerProfile(): Promise<Customer | null> {
    try {
        const token = await getCookies(`AccessToken`);
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/me`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            }
        });

        const responseData: ResultData = await response.json();
        
        if (!response.ok) {
            console.error(responseData?.message);
            return null;
        }

        return responseData.data;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

export default async function CustomerDashboardPage() {
    const customerData = await getCustomerProfile();

    // Tampilan jika data tidak ditemukan (Error State)
    if (!customerData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-sky-50 p-5">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-sky-100 text-center">
                    <p className="text-sky-600 font-medium">Maaf, data Customer tidak ditemukan.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-sky-700">Dashboard Admin</h1>
                    <p className="text-sky-400 text-sm">Informasi profil akun Anda</p>
                </div>

                {/* Profile Card */}
                <div className="bg-sky-50 border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-sky-500 p-4">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            Admin Profile
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <tbody>
                                <tr className="bg-white rounded-lg shadow-sm">
                                    <td className="p-4 rounded-l-lg font-medium text-sky-600 w-1/3">Nama</td>
                                    <td className="p-4 rounded-r-lg text-gray-700">{customerData.name}</td>
                                </tr>
                                <tr className="bg-white rounded-lg shadow-sm">
                                    <td className="p-4 rounded-l-lg font-medium text-sky-600">Username</td>
                                    <td className="p-4 rounded-r-lg text-gray-700 font-mono text-sm">
                                        @{customerData.user.username}
                                    </td>
                                </tr>
                                <tr className="bg-white rounded-lg shadow-sm">
                                    <td className="p-4 rounded-l-lg font-medium text-sky-600">No. Telepon</td>
                                    <td className="p-4 rounded-r-lg text-gray-700">{customerData.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Akses */}
                <p className="mt-4 text-center text-xs text-sky-300">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
                </p>
            </div>
        </div>
    );
}


