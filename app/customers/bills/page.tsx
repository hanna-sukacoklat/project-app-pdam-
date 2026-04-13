"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BillCard } from "./card";
import { Bill } from "@/app/types"; // Pakai import ini
import { Loader2, FileX, ChevronLeft, ChevronRight } from "lucide-react";

// Mock function API (Pastikan aslinya diimport dari file api kamu)
const getCustomerBills = async (customerId: number, page: number): Promise<BillsResponse> => {
    const res = await fetch(`/api/bills?customerId=${customerId}&page=${page}`);
    return res.json();
};

interface BillsPageProps {
  customerId: number;
}

interface BillsResponse {
  data: Bill[];
  last_page: number;
}

export function BillsPage({ customerId }: BillsPageProps) {
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useQuery<BillsResponse>({
    queryKey: ["bills", customerId, page],
    queryFn: () => getCustomerBills(customerId, page),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-xl font-bold text-gray-900">Tagihan Saya</h1>

      {isPending && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 p-6 text-center text-red-500 text-sm">
          Gagal memuat data tagihan.
        </div>
      )}

      {data?.data.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
          <FileX size={40} strokeWidth={1.5} />
          <p className="text-sm">Tidak ada tagihan ditemukan.</p>
        </div>
      )}

      {data?.data.map((bill) => (
        <BillCard key={bill.id} bill={bill} customerId={customerId} />
      ))}

      {data && data.last_page > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <span className="text-sm font-medium">{page}</span>
          <button
            onClick={() => setPage((p) => Math.min(data.last_page, p + 1))}
            disabled={page === data.last_page}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}