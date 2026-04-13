import { getCookies } from "@/lib/server-cookie";
import { Service } from "@/app/types";
import AddService from "./add";
import EditService from "./edit";
import Search from "@/components/search";
import DeleteService from "./delete";
import { Droplets, Info, Settings2 } from "lucide-react";
import SimplePagination from "@/components/pagination";

async function getServices(page: number, quantity: number, search: string) {
    try {
        const token = await getCookies(`AccessToken`);
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?page=${page}&quantity=${quantity}&search=${search}`;
        const response = await fetch(url, {
            headers: { "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "", "Authorization": `Bearer ${token}` },
            cache: "no-store",
        });
        return await response.json();
    } catch (error) { return { data: [], count: 0 }; }
}

export default async function ServicesPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
    const params = await props.searchParams;
    const page = Number(params?.page) || 1;
    const quantity = 9; // Grid biasanya bagus dalam kelipatan 3
    const search = params?.search || "";
    
    const response = await getServices(page, quantity, search);
    const services: Service[] = response?.data || [];
    const totalCount = response?.count || 0;

    return (
        <div className="min-h-screen bg-sky-50/50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-sky-900 tracking-tight">Daftar Layanan</h1>
                        <p className="text-sky-600 mt-1 flex items-center gap-2"><Droplets className="w-4 h-4" /> Kelola kategori tarif air</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="bg-white rounded-xl shadow-sm border border-sky-100 p-1 flex items-center"><Search search={search} /></div>
                        <AddService />
                    </div>
                </div>

                {services.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border shadow-sm"><h3 className="text-xl font-bold text-sky-900">Tidak Ditemukan</h3></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-sky-400 to-blue-500 w-full" />
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-sky-50 p-3 rounded-2xl text-sky-500"><Settings2 className="w-6 h-6" /></div>
                                        <span className="text-[10px] font-black text-sky-300 bg-sky-50 px-3 py-1 rounded-full uppercase">ID: {service.id}</span>
                                    </div>
                                    <h2 className="text-xl font-extrabold text-gray-800 mb-2 truncate">{service.name}</h2>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-end border-b pb-2"><span className="text-xs text-gray-400 font-medium">Tarif / m³</span><span className="text-2xl font-black text-sky-600">Rp{service.price.toLocaleString('id-ID')}</span></div>
                                        <div className="flex gap-4"><div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center"><span className="block text-[10px] text-gray-400 font-bold uppercase">Min</span><span className="font-bold">{service.min_usage} m³</span></div><div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center"><span className="block text-[10px] text-gray-400 font-bold uppercase">Max</span><span className="font-bold">{service.max_usage} m³</span></div></div>
                                    </div>
                                    <div className="flex gap-2"><div className="flex-1"><EditService selectedData={service} /></div><div className="flex-none"><DeleteService selectedData={service} /></div></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* PAGINATION SECTION */}
                <div className="mt-10 flex flex-col items-center gap-6">
                    <SimplePagination count={totalCount} perPage={quantity} currentPage={page} />
                    <div className="bg-white px-6 py-2 rounded-full border border-sky-100 text-xs font-bold text-sky-400 shadow-sm uppercase">TOTAL: {totalCount} LAYANAN</div>
                </div>
            </div>
        </div>
    );
}