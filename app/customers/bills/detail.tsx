"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddPayment from "./payment"; 
import {
  Droplets,
  Calendar,
  Gauge,
  Hash,
  User,
  ArrowLeft,
  Loader2,
  Receipt,
} from "lucide-react";
import Link from "next/link";

interface BillDetailProps {
  billId: number;
  customerId: number;
}

async function fetchBillDetail(billId: number) {
  const response = await fetch(`/api/bills/${billId}`);
  if (!response.ok) throw new Error("Failed to fetch bill");
  return response.json();
}

export default function BillDetail({ billId, customerId }: BillDetailProps) {
  const [open, setOpen] = useState(false);

  const { data: bill, isPending, error } = useQuery({
    queryKey: ["bills", billId],
    queryFn: () => fetchBillDetail(billId),
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
        Gagal memuat detail tagihan.
      </div>
    );
  }

  const statusMap = {
    paid: { label: "Lunas", color: "bg-blue-600 text-white" },
    pending: { label: "Menunggu Verifikasi", color: "bg-amber-100 text-amber-700" },
    unpaid: { label: "Belum Dibayar", color: "bg-red-100 text-red-600" },
  };
  const status = statusMap[bill.status as keyof typeof statusMap];

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6 p-4">
        {/* Back */}
        <Link
          href={`/customers/${customerId}/bills`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Tagihan
        </Link>

        {/* Main card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <Receipt size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Tagihan #{bill.id}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  Rp {bill.total_tagihan.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
              {status.label}
            </span>
          </div>

          <hr className="my-5 border-gray-100" />

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                <User size={13} /> Pelanggan
              </dt>
              <dd className="font-semibold text-gray-800">{bill.customer_name}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                <Hash size={13} /> No. Meter
              </dt>
              <dd className="font-semibold text-gray-800">{bill.no_meter}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                <Calendar size={13} /> Periode
              </dt>
              <dd className="font-semibold text-gray-800">{bill.periode}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                <Gauge size={13} /> Pemakaian
              </dt>
              <dd className="font-semibold text-gray-800">{bill.pemakaian} m³</dd>
            </div>
            {bill.no_pelanggan && (
              <div>
                <dt className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                  <Droplets size={13} /> No. Pelanggan
                </dt>
                <dd className="font-semibold text-gray-800">{bill.no_pelanggan}</dd>
              </div>
            )}
            {bill.dibayar_at && (
              <div>
                <dt className="text-gray-400 mb-0.5">Tanggal Bayar</dt>
                <dd className="font-semibold text-gray-800">
                  {new Date(bill.dibayar_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            )}
          </dl>

          {bill.status === "unpaid" && (
            <button
              onClick={() => setOpen(true)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Upload Bukti Pembayaran
            </button>
          )}
        </div>
      </div>

      <AddPayment
        bill={bill.id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}