import { getCookies } from "@/lib/server-cookie";
import { Admin } from "@/app/types";
import AddAdmin from "./add";
import EditAdmin from "./edit";
import DeleteAdmin from "./delete";
import ResetPasswordAdmin from "./reset";
import Search from "@/components/search";
import SimplePagination from "@/components/pagination";
import { UserCog, Phone, ShieldCheck } from "lucide-react";

type ResultData = {
    success: boolean,
    message: string,
    data: Admin[],
    count: number
}

async function getAdmins(page: number, quantity: number, search: string): Promise<ResultData> {
    try {
        const token = await getCookies("AccessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins?page=${page}&quantity=${quantity}&search=${search}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store"
        });

        if (!response.ok) {
            return { success: false, message: "Gagal", data: [], count: 0 };
        }

        const responseData: ResultData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error", data: [], count: 0 };
    }
}

export default async function AdminDataPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
    const params = await props.searchParams;
    const page = Number(params?.page) || 1;
    const quantity = 10;
    const search = params?.search || "";
    const { data: admins, count: totalCount } = await getAdmins(page, quantity, search);

    return (
        <div className="p-6 md:p-10 min-h-screen bg-sky-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-sky-900 tracking-tight flex items-center gap-3">
                            <UserCog className="w-8 h-8 text-sky-500" /> Data Administrator
                        </h1>
                        <p className="text-sky-600 mt-1">Kelola hak akses dan informasi personil admin sistem.</p>
                    </div>
                    <AddAdmin />
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-sky-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-96">
                        <Search search={search} />
                    </div>
                    <div className="bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 text-sm font-bold text-sky-700">
                        Total: {totalCount} Admin
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-sky-500 text-white">
                                    <th className="p-5 font-bold uppercase text-xs tracking-widest">ID</th>
                                    <th className="p-5 font-bold uppercase text-xs tracking-widest">Info Nama</th>
                                    <th className="p-5 font-bold uppercase text-xs tracking-widest">Username</th>
                                    <th className="p-5 font-bold uppercase text-xs tracking-widest text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-50">
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-sky-50/50 transition-colors group">
                                        <td className="p-5 text-xs font-bold text-sky-300">#{admin.id}</td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-gray-800">{admin.name}</span>
                                                <span className="text-xs text-sky-500 flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {admin.phone}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                                <ShieldCheck className="w-4 h-4 text-sky-400" /> @{admin.user.username}
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <EditAdmin selectedData={admin} />
                                                <ResetPasswordAdmin selectedData={admin} />
                                                <DeleteAdmin selectedData={admin} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION SECTION */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm font-medium text-sky-400">Halaman {page} dari total data</p>
                    <SimplePagination count={totalCount} perPage={quantity} currentPage={page} />
                </div>
            </div>
        </div>
    );
}