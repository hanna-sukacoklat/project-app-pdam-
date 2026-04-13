import { Customer, Service } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { AddCustomer } from "./add";
import EditCustomer from "./edit";
import DeleteCustomer from "./delet";
import ResetPasswordCustomer from "./reset";
import { Search as SearchIcon, Phone, MapPin, Users, CreditCard, Filter } from "lucide-react";
import SimplePagination from "@/components/pagination";

async function getCustomers(page: number, quantity: number, search: string) {
    try {
        const token = await getCookies('accessToken');
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?page=${page}&quantity=${quantity}&search=${encodeURIComponent(search)}`;
        const response = await fetch(url, {
            headers: { "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "", "Authorization": `Bearer ${token}` },
            cache: "no-store",
        });
        const result = await response.json();
        return { data: result?.data || [], count: result?.count || 0 };
    } catch (error) { return { data: [], count: 0 }; }
}

async function getServices() {
    try {
        const token = await getCookies('accessToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/services?quantity=100`, {
            headers: { "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "", "Authorization": `Bearer ${token}` },
        });
        const result = await response.json();
        return result?.data || [];
    } catch (error) { return []; }
}

export default async function CustomersPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || "";
    const quantity = 10;

    const { data: customers, count: totalData } = await getCustomers(page, quantity, search);
    const services = await getServices();

    return (
        <div className="p-6 bg-slate-50/50 min-h-screen space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 flex flex-col justify-center">
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Data Pelanggan</h1>
                    <p className="text-slate-500 text-sm">Kelola informasi pelanggan dan layanan aktif mereka.</p>
                </div>
                <div className="bg-sky-500 rounded-2xl p-4 text-white flex items-center gap-4 shadow-lg shadow-sky-200">
                    <div className="bg-white/20 p-3 rounded-xl"><Users className="w-6 h-6" /></div>
                    <div><p className="text-sky-100 text-xs font-bold uppercase">Total Pelanggan</p><p className="text-2xl font-black">{totalData} Orang</p></div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <form action="" method="GET" className="relative flex-1 max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="search" type="text" defaultValue={search} placeholder="Cari... (Enter)" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none focus:border-sky-400" />
                </form>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl border text-sm font-bold"><Filter className="w-4 h-4" /> Filter</button>
                    {/* <AddCustomer serviceData={services} /> */}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pelanggan</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kontak</th>
                            <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {customers.map((c: Customer) => (
                            <tr key={c.id} className="group hover:bg-sky-50/30 transition-all">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">{c.name?.substring(0, 2).toUpperCase()}</div>
                                        <div><p className="font-bold text-slate-800">{c.name}</p><p className="text-[10px] font-mono text-slate-400 flex items-center gap-1"><CreditCard className="w-3 h-3" /> {c.customer_number}</p></div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="text-sm text-slate-600 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /> {c.phone || "-"}</div>
                                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-1"><MapPin className="w-3.5 h-3.5 text-slate-300" /> {c.alamat || "-"}</div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="flex gap-2 justify-center">
                                        <EditCustomer selectedData={c} serviceData={services} />
                                        <ResetPasswordCustomer selectedData={c} />
                                        <DeleteCustomer selectedData={c} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION SECTION */}
                <div className="px-6 py-4 bg-slate-50/50 border-t flex justify-between items-center">
                    <p className="text-xs text-slate-400">Menampilkan {customers.length} dari {totalData}</p>
                    <SimplePagination count={totalData} perPage={quantity} currentPage={page} />
                </div>
            </div>
        </div>
    );
}