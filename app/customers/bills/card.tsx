"use client";

import { useState } from "react";
import Link from "next/link";
import { Bill, BillStatus } from "@/app/types"; // Import tipe yang benar
import PaymentModal from "./payment";
import { Droplets, Calendar, Gauge } from "lucide-react";

interface BillCardProps {
  bill: Bill;
  customerId: number;
}

// Tambahkan Record untuk memastikan key sesuai dengan BillStatus
const STATUS_CONFIG: Record<BillStatus, { label: string; className: string }> = {
  paid: {
    label: "Lunas",
    className: "bg-blue-600 text-white",
  },
  pending: {
    label: "Menunggu Verifikasi",
    className: "bg-amber-100 text-amber-700",
  },
  unpaid: {
    label: "Belum Dibayar",
    className: "bg-red-100 text-red-600",
  },
};

export function BillCard({ bill, customerId }: BillCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const status = STATUS_CONFIG[bill.status];

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              #{bill.id} · {bill.customer_name}
            </p>
            <p className="mt-0.5 text-2xl font-bold text-gray-900">
              Rp {bill.total_tagihan.toLocaleString("id-ID")}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
            {status.label}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{bill.periode}</span>
          <span className="flex items-center gap-1.5"><Gauge size={14} />{bill.pemakaian} m³</span>
          <span className="flex items-center gap-1.5"><Droplets size={14} />No. Meter: {bill.no_meter}</span>
        </div>

        {bill.dibayar_at && (
          <p className="mt-1 text-xs text-gray-400">
            Dibayar: {new Date(bill.dibayar_at).toLocaleDateString("id-ID")}
          </p>
        )}

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/customers/${customerId}/bills/${bill.id}`}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Lihat Detail
          </Link>

          {bill.status === "unpaid" && (
            <button
              onClick={() => setShowPayment(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Bayar Sekarang
            </button>
          )}
        </div>
      </div>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        bill={bill}
      />
    </>
  );
}