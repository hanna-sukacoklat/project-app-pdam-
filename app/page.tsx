import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50/30 font-sans text-slate-900">
      
      {/* Navigation Mini */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-sky-500 p-2 rounded-xl shadow-lg shadow-sky-200">
            <Droplets className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black text-sky-900 tracking-tight">PDAM<span className="text-sky-500">Smart</span></span>
        </div>
        <Link 
          href="/login" 
          className="bg-white px-6 py-2.5 rounded-full text-sm font-bold text-sky-600 shadow-sm border border-sky-100 hover:bg-sky-50 transition-all"
        >
          Masuk Portal
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative inline-block px-4 py-1.5 mb-6 bg-sky-100 rounded-full border border-sky-200">
            <span className="text-xs font-black text-sky-600 uppercase tracking-[0.2em]">Next-Gen Billing System</span>
          </div>
          
          <h1 className="max-w-4xl text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-sky-950 mb-6">
            Kelola Distribusi Air <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              Lebih Pintar & Akurat.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-slate-500 mb-10">
            Platform manajemen PDAM modern untuk memantau penggunaan, mengelola layanan pelanggan, 
            dan optimasi billing dalam satu dashboard terintegrasi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-bold">
            <Link
              href="/login"
              className="group flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-sky-600 px-8 text-white transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-1"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="https://nextjs.org/docs"
              className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl border-2 border-sky-100 bg-white px-8 text-sky-900 transition-all hover:bg-sky-50"
            >
              Pelajari Fitur
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-10">
          <div className="bg-white p-8 rounded-[2rem] border border-sky-50 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sky-900 text-lg mb-2">Billing Cepat</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Otomatisasi perhitungan tagihan berdasarkan kategori layanan tanpa ribet.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-sky-50 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sky-900 text-lg mb-2">Keamanan Data</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Enkripsi data pelanggan dan admin yang aman dengan standar industri terkini.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-sky-50 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sky-900 text-lg mb-2">Analitik Real-time</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Pantau pertumbuhan pelanggan dan pendapatan melalui dashboard visual.</p>
          </div>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full border-t border-sky-100 mt-20 gap-6">
        <p className="text-sm text-sky-400 font-medium">
          © 2026 PDAM Smart System. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm font-bold text-sky-900/40">
          <a href="#" className="hover:text-sky-600">Privacy Policy</a>
          <a href="#" className="hover:text-sky-600">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}