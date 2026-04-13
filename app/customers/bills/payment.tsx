"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ganti sesuai library toast kamu
import { X, Upload, Loader2 } from "lucide-react";

interface AddPaymentProps {
  bill: { id: number };
  open: boolean;
  onClose: () => void;
}

async function addPayment(
  token: string,
  form: FormData
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  return res.json();
}

// payment.tsx
// ... (bagian import dan interface tetap sama)

// Pastikan fungsi ini diexport sebagai default agar bisa diimport dengan nama apapun
export default function PaymentModal({ bill, open, onClose }: AddPaymentProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoad, setIsLoad] = useState(false);

  // Jika bill belum ada (saat loading di detail.tsx), jangan render dulu
  if (!open || !bill) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Pilih file bukti pembayaran terlebih dahulu.");
      return;
    }

    try {
      setIsLoad(true);
      const token = localStorage.getItem("token") ?? "";
      const form = new FormData();
      form.append("bill_id", String(bill.id)); 
      form.append("file", file);

      const result = await addPayment(token, form);

      if (result?.success) {
        onClose(); // Menutup modal
        toast.success(result.message);
        router.refresh(); // Refresh data
      } else {
        toast.warning(result.message);
      }
    } catch (error) {
      toast.error(`Terjadi kesalahan: ${error}`);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* ... (Isi form tetap sama seperti kodinganmu) ... */}
        <h2 className="text-lg font-semibold">Upload Bukti Bayar #{bill.id}</h2>
        {/* ... sisanya tetap sama ... */}
      </div>
    </div>
  );
}