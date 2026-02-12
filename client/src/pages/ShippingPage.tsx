import React from "react";
import { Truck, RefreshCw, Clock, ShieldCheck } from "lucide-react";

const ShippingPage: React.FC = () => {
  return (
    <div className="animate-fade-in pt-28 md:pt-48 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-6">
            Shipping & Returns
          </h1>
          <p className="text-stone-500 text-lg">
            Informasi lengkap mengenai pengiriman dan kebijakan pengembalian
            produk.
          </p>
        </div>

        {/* Shipping Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
            <Truck className="text-emerald-700" size={28} />
            <h2 className="text-2xl font-serif text-emerald-900">
              Kebijakan Pengiriman
            </h2>
          </div>

          <div className="space-y-8 pl-2 md:pl-10">
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
              <h3 className="font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <Clock size={18} className="text-emerald-600" />
                Waktu Proses Pesanan
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Pesanan yang masuk sebelum pukul <strong>14:00 WIB</strong> akan
                diproses dan dikirim pada hari yang sama. Pesanan setelah jam
                tersebut akan dikirim hari berikutnya. Pengiriman dilakukan hari
                Senin - Sabtu.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-emerald-950 mb-3">
                Kurir Pengiriman
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                Kami bekerja sama dengan berbagai logistik terpercaya untuk
                memastikan pesanan Anda sampai dengan aman:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "JNE",
                  "J&T",
                  "Sicepat",
                  "GoSend (Instant/Sameday)",
                  "GrabExpress",
                ].map((cour) => (
                  <span
                    key={cour}
                    className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-600 font-medium"
                  >
                    {cour}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-emerald-950 mb-3">
                Biaya Pengiriman
              </h3>
              <ul className="list-disc list-inside text-stone-600 space-y-2 marker:text-emerald-500">
                <li>
                  Ongkos kirim dihitung otomatis berdasarkan berat dan lokasi
                  tujuan.
                </li>
                <li>
                  Gratis ongkos kirim untuk pembelian minimum Rp500.000 (khusus
                  Jabodetabek).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
            <RefreshCw className="text-emerald-700" size={28} />
            <h2 className="text-2xl font-serif text-emerald-900">
              Kebijakan Pengembalian
            </h2>
          </div>

          <div className="space-y-6 pl-2 md:pl-10">
            <p className="text-stone-600 leading-relaxed">
              Kepuasan Anda adalah prioritas kami. Jika Anda menerima produk
              yang rusak, cacat, atau tidak sesuai pesanan, kami siap membantu
              proses penggantian.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-emerald-950 mb-2">
                  Syarat Pengembalian
                </h3>
                <ul className="text-stone-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    Maksimal 3 hari setelah barang diterima.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    Produk belum digunakan dan segel utuh.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    Wajib menyertakan video unboxing.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                <h3 className="font-bold text-emerald-950 mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  Garansi Annise Herbal
                </h3>
                <p className="text-sm text-stone-600">
                  Kami menjamin 100% keaslian semua produk. Jika terbukti palsu,
                  kami kembalikan uang Anda 2x lipat.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-emerald-950 mb-3">
                Cara Mengajukan Komplain
              </h3>
              <ol className="list-decimal list-inside text-stone-600 space-y-3 marker:text-emerald-900 marker:font-medium">
                <li>Foto produk yang rusak/salah.</li>
                <li>Siapkan video unboxing dari awal paket dibuka.</li>
                <li>Hubungi Customer Service kami melalui WhatsApp.</li>
                <li>
                  Tim kami akan memverifikasi dan mengirimkan produk pengganti
                  segera.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingPage;
