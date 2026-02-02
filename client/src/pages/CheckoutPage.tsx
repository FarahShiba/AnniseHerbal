import React, { useState, useMemo, useEffect } from "react";
import {
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle,
  Truck,
  Zap,
  Clock,
  User,
  MapPin,
  Phone,
  Building,
  Hash,
} from "lucide-react";

import Button from "../components/Button";
import type { CartItem, ShippingOption, PaymentOption } from "../types";
import type { TranslationData } from "../data/data";

interface CheckoutPageProps {
  cartItems: CartItem[];
  navigateTo: (page: string) => void;
  clearCart: () => void;
  t: TranslationData["checkout"];
  suggestions?: string[];
  showSuggestions?: boolean;
  onSuggestionClick?: (val: string) => void;
}

import { INDONESIA_DATA, PROVINCES_LIST } from "../data/indonesia-data";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
  suggestions?: string[];
  showSuggestions?: boolean;
  onSuggestionClick?: (val: string) => void;
}

const FloatingInput = ({
  label,
  icon: Icon,
  className,
  error,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  ...props
}: FloatingInputProps) => (
  <div className={`relative group ${className}`}>
    <div
      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
        error
          ? "text-red-400"
          : "text-stone-400 group-focus-within:text-emerald-600"
      }`}
    >
      <Icon size={18} />
    </div>
    <input
      placeholder=" " // Required for :placeholder-shown trick
      className={`peer w-full pl-12 pr-4 pt-5 pb-2 rounded-xl border outline-none transition-all placeholder-transparent bg-stone-50/50 focus:bg-white text-stone-800 font-medium ${
        error
          ? "border-red-300 focus:border-red-500 bg-red-50/10"
          : "border-stone-200 focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-500/5"
      }`}
      {...props}
    />
    <label
      className={`absolute left-12 top-2 text-[10px] font-bold uppercase tracking-wider transition-all pointer-events-none
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm 
      peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px]
      ${
        error
          ? "text-red-400 peer-placeholder-shown:text-red-400 peer-focus:text-red-500"
          : "text-stone-400 peer-placeholder-shown:text-stone-500 peer-focus:text-emerald-600"
      }`}
    >
      {label}
    </label>
    {error && <p className="text-red-500 text-[10px] mt-1 ml-4">{error}</p>}

    {/* Suggestions Dropdown */}
    {showSuggestions && suggestions && suggestions.length > 0 && (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto animate-fade-in">
        {suggestions.map((item: string, idx: number) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSuggestionClick && onSuggestionClick(item)}
            className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-stone-700 text-sm border-b last:border-0 border-stone-50 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
);

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  navigateTo,
  clearCart,
  t,
}) => {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const [payment, setPayment] = useState<PaymentOption | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  // CC State
  const [ccStep, setCcStep] = useState<"input" | "processing" | "otp">("input");
  const [ccForm, setCcForm] = useState({ number: "", expiry: "", cvv: "" });
  const [ccErrors, setCcErrors] = useState({
    number: false,
    expiry: false,
    cvv: false,
  });
  const [otp, setOtp] = useState("");

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [apartment, setApartment] = useState("");

  // Smart Address State
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Validation State
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    whatsapp: false,
    address: false,
    city: false,
    province: false,
    postalCode: false,
  });

  // --- HANDLERS ---
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProv = e.target.value;
    setProvince(selectedProv);
    if (errors.province) setErrors({ ...errors, province: false });

    // Optional: clear city/zip if they don't match or just focus city
    // For smoother UX, we won't clear city hard, but we reset suggestions
    setCitySuggestions(
      INDONESIA_DATA[selectedProv]?.cities.map((c) => c.name) || [],
    );
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCity(val);
    setShowCitySuggestions(true);

    // Filter suggestions based on input if province is selected
    if (province && INDONESIA_DATA[province]) {
      const allCities = INDONESIA_DATA[province].cities.map((c) => c.name);
      const filtered = allCities.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase()),
      );
      setCitySuggestions(filtered);
    } else {
      // If no province selected, maybe show popular cities? Or nothing.
      // For now, let's keep it empty unless province is selected to avoid overwhelming
      setCitySuggestions([]);
    }

    if (errors.city) setErrors({ ...errors, city: false });
  };

  const handleCitySelect = (cityName: string) => {
    setCity(cityName);
    setShowCitySuggestions(false);

    // Auto-fill postal code
    if (province && INDONESIA_DATA[province]) {
      const cityData = INDONESIA_DATA[province].cities.find(
        (c) => c.name === cityName,
      );
      if (cityData) {
        setPostalCode(cityData.zip);
        if (errors.postalCode) setErrors({ ...errors, postalCode: false });
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClick = () => setShowCitySuggestions(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const shippingCost = shipping?.price || 0;
  const total = subtotal + shippingCost;

  // Calculate shipping cost
  const shippingOptions = useMemo(() => {
    // If no province selected, show "Select Province" or default
    if (!province) return [];

    // Simple logic: if Jawa/Jakarta = cheaper/faster. Outside Java = more expensive/longer
    const isJava =
      province.includes("Jakarta") ||
      province.includes("Jawa") ||
      province.includes("Banten") ||
      province.includes("Yogyakarta");

    // ... (rest of simple logic)
    // For now, let's keep it simple as before but reactive to 'province'
    return [
      {
        id: "reg",
        name: "Regular Shipping",
        price: isJava ? 15000 : 35000,
        eta: isJava ? "2-3 Days" : "4-7 Days",
        icon: Truck,
      },
      {
        id: "express",
        name: "Express Shipping",
        price: isJava ? 30000 : 65000,
        eta: isJava ? "1 Day" : "2-3 Days",
        icon: Zap,
      },
      {
        id: "sameday",
        name: "Same Day Delivery",
        price: 50000,
        eta: "Today",
        icon: Clock,
        disabled: !province.includes("Jakarta"), // Only available in Jakarta
      },
    ];
  }, [province]);

  const paymentOptions: PaymentOption[] = [
    { id: "cc", name: "Credit Card", icon: CreditCard },
    { id: "tf", name: "Bank Transfer (BCA/Mandiri)", icon: Banknote },
    { id: "ewallet", name: "E-Wallet (GoPay/Ovo/QRIS)", icon: Wallet },
  ];

  const handleNextStep1 = () => {
    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      whatsapp: !whatsapp,
      address: !address,
      city: !city,
      province: !province,
      postalCode: !postalCode,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((hasError) => hasError)) {
      return;
    }

    setStep(2);
  };

  const handlePlaceOrder = () => {
    setPendingPayment(true);
    // Reset CC step if that's the chosen method
    if (payment?.id === "cc") {
      setCcStep("input");
      setCcForm({ number: "", expiry: "", cvv: "" });
      setOtp("");
    }
  };

  const handleCcNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCcForm({ ...ccForm, number: formatted });
    if (ccErrors.number) setCcErrors({ ...ccErrors, number: false });
  };

  const handleCcExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) return;

    let formatted = value;
    if (value.length >= 2) {
      formatted = value.substring(0, 2) + "/" + value.substring(2);
    }
    setCcForm({ ...ccForm, expiry: formatted });
    if (ccErrors.expiry) setCcErrors({ ...ccErrors, expiry: false });
  };

  const processCreditCard = () => {
    const newErrors = {
      number: ccForm.number.length < 19, // 16 digits + 3 spaces
      expiry: ccForm.expiry.length < 5,
      cvv: ccForm.cvv.length < 3,
    };

    setCcErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    setCcStep("processing");
    setTimeout(() => {
      setCcStep("otp");
    }, 2000);
  };

  const verifyOtp = () => {
    setCcStep("processing");
    setTimeout(() => {
      confirmPayment();
    }, 1500);
  };

  const confirmPayment = () => {
    // Simulate Order Saving for Admin Dashboard
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 1000000),
      customer: {
        name: `${firstName} ${lastName}`,
        email: "simulated@email.com", // In a real app we'd ask for this
        whatsapp: whatsapp,
      },
      items: cartItems,
      total: total,
      status: "paid",
      date: new Date().toISOString(),
      paymentMethod: payment?.name || "Unknown",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders]),
    );

    // Simulate Email Email Notification
    console.log(
      `[EMAIL SIMULATION] Sending order confirmation to ${firstName} (${whatsapp})...`,
    );
    console.log(
      `[EMAIL SIMULATION] Subject: Order Confirmation #${newOrder.id}`,
    );
    console.log(
      `[EMAIL SIMULATION] Body: Thank you for your order! Your payment of Rp ${total.toLocaleString("id-ID")} has been received.`,
    );

    setPendingPayment(false);
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (pendingPayment) {
    // CREDIT CARD FLOW
    if (payment?.id === "cc") {
      return (
        <div className="pt-32 pb-24 min-h-screen bg-stone-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full mx-4 border border-stone-100 relative overflow-hidden">
            {ccStep === "processing" && (
              <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                <p className="font-serif text-emerald-900 animate-pulse">
                  Memproses Transaksi...
                </p>
                <p className="text-xs text-stone-500 mt-2">
                  Jangan tutup halaman ini
                </p>
              </div>
            )}

            {ccStep === "input" && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif text-emerald-950">
                    Kartu Kredit
                  </h2>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-stone-200 rounded"></div>
                    <div className="w-8 h-5 bg-stone-200 rounded"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Nomor Kartu
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={ccForm.number}
                        onChange={handleCcNumberChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-colors font-mono text-stone-700 ${
                          ccErrors.number
                            ? "border-red-500 bg-red-50"
                            : "border-stone-200 focus:border-emerald-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Berlaku Hingga
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={ccForm.expiry}
                        onChange={handleCcExpiryChange}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors font-mono text-stone-700 ${
                          ccErrors.expiry
                            ? "border-red-500 bg-red-50"
                            : "border-stone-200 focus:border-emerald-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={ccForm.cvv}
                        onChange={(e) => {
                          setCcForm({ ...ccForm, cvv: e.target.value });
                          if (ccErrors.cvv)
                            setCcErrors({ ...ccErrors, cvv: false });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors font-mono text-stone-700 ${
                          ccErrors.cvv
                            ? "border-red-500 bg-red-50"
                            : "border-stone-200 focus:border-emerald-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex justify-between items-center mt-6">
                    <span className="text-stone-600 font-medium">
                      Total Tagihan
                    </span>
                    <span className="text-xl font-bold text-emerald-900">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setPendingPayment(false)}
                      className="w-full"
                    >
                      Kembali
                    </Button>
                    <Button className="w-full" onClick={processCreditCard}>
                      Bayar Sekarang
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {ccStep === "otp" && (
              <div className="animate-fade-in text-center">
                <div className="mb-6 flex justify-center">
                  <div className="h-8 w-20 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs italic">
                    Visa
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  Verifikasi 3D Secure
                </h3>
                <p className="text-sm text-stone-500 mb-6">
                  Masukkan kode OTP yang telah dikirim ke nomor{" "}
                  <span className="font-mono font-bold text-stone-800">
                    +62 812-****-****
                  </span>
                </p>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Masukkan OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-500 outline-none transition-colors font-mono text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-stone-400 mt-2">
                    Tidak menerima kode?{" "}
                    <button className="text-blue-600 hover:underline">
                      Kirim Ulang
                    </button>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setCcStep("input");
                      setPendingPayment(false);
                    }}
                  >
                    Kembali ke Metode Pembayaran
                  </Button>
                  <Button className="w-full" onClick={verifyOtp}>
                    Konfirmasi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // STANDARD FLOW (Bank Transfer / E-Wallet)
    return (
      <div className="pt-32 pb-24 min-h-screen bg-stone-50 flex items-center justify-center animate-fade-in">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full mx-4 border border-stone-100">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Menunggu Pembayaran
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-emerald-950 mb-2">
              Selesaikan Pembayaran
            </h2>
            <p className="text-stone-500 text-sm">
              Selesaikan pembayaran dalam{" "}
              <span className="text-orange-600 font-bold">23:59:59</span>
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-stone-200">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-200">
              <span className="text-stone-600">Total Pembayaran</span>
              <span className="font-bold text-xl text-emerald-900">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-stone-600 text-sm block mb-2">
                Metode Pembayaran
              </span>
              <div className="flex items-center gap-3 font-medium text-emerald-950">
                {payment?.icon && (
                  <payment.icon size={20} className="text-emerald-700" />
                )}
                {payment?.name}
              </div>
            </div>

            {payment?.id === "tf" && (
              <div className="bg-white p-4 rounded-xl border border-stone-200 relative group cursor-pointer hover:border-emerald-300 transition-colors">
                <p className="text-xs text-stone-400 mb-1">
                  Nomor Virtual Account (BCA)
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-mono text-lg font-bold text-stone-800 tracking-wider">
                    8801 2938 4728 1920
                  </p>
                  <button className="text-xs font-bold text-emerald-600 uppercase hover:text-emerald-700 px-3 py-1 bg-emerald-50 rounded-md">
                    Salin
                  </button>
                </div>
              </div>
            )}

            {payment?.id === "ewallet" && (
              <div className="bg-white p-8 rounded-xl border border-stone-200 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-stone-900 mb-4 flex items-center justify-center text-white text-xs">
                  [QR Code Here]
                </div>
                <p className="text-sm text-stone-500">
                  Scan QRIS menggunakan aplikasi pembayaran Anda
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button onClick={confirmPayment} className="w-full">
              Saya Sudah Bayar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPendingPayment(false)}
              className="w-full"
            >
              Ubah Metode Pembayaran
            </Button>
            <p className="text-xs text-stone-400 text-center mt-2">
              Butuh mengubah metode pembayaran? Klik tombol di atas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-stone-50 flex items-center justify-center animate-fade-in">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-serif text-emerald-950 mb-4">
            {t.success_title}
          </h2>
          <p className="text-stone-600 mb-8">{t.success_desc}</p>
          <Button onClick={() => navigateTo("home")}>{t.home_btn}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#fafaf9] animate-fade-in">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-serif text-emerald-950 mb-8 text-center">
          {t.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN - FORMS */}
          <div className="lg:w-2/3 space-y-6">
            {/* Step 1: Alamat */}
            <div
              className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border ${step === 1 ? "border-emerald-500 ring-1 ring-emerald-500" : "border-stone-100"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-emerald-950 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center text-sm font-bold shadow-emerald-900/20 shadow-lg">
                    1
                  </span>
                  {t.step1}
                </h3>
                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-800 transition-colors border border-emerald-100 hover:border-emerald-200 bg-emerald-50 px-3 py-1 rounded-full"
                  >
                    Edit
                  </button>
                )}
              </div>

              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Nama Depan"
                      icon={User}
                      value={firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFirstName(e.target.value);
                        if (errors.firstName)
                          setErrors({ ...errors, firstName: false });
                      }}
                      error={errors.firstName ? "Wajib diisi" : ""}
                    />
                    <FloatingInput
                      label="Nama Belakang"
                      icon={User}
                      value={lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLastName(e.target.value);
                        if (errors.lastName)
                          setErrors({ ...errors, lastName: false });
                      }}
                      error={errors.lastName ? "Wajib diisi" : ""}
                    />
                  </div>
                  <FloatingInput
                    label="Nomor WhatsApp"
                    icon={Phone}
                    type="tel"
                    value={whatsapp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp)
                        setErrors({ ...errors, whatsapp: false });
                    }}
                    error={errors.whatsapp ? "Wajib diisi" : ""}
                  />
                  <div className="relative group">
                    <div className="absolute left-4 top-5 text-stone-400 group-focus-within:text-emerald-600 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <textarea
                      placeholder=" "
                      rows={3}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address)
                          setErrors({ ...errors, address: false });
                      }}
                      className={`peer w-full pl-12 pr-4 pt-5 pb-2 rounded-xl border outline-none transition-all placeholder-transparent bg-stone-50/50 focus:bg-white text-stone-800 font-medium ${
                        errors.address
                          ? "border-red-300 focus:border-red-500 bg-red-50/10"
                          : "border-stone-200 focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-500/5"
                      }`}
                    ></textarea>
                    <label className="absolute left-12 top-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-500 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-emerald-600 pointer-events-none">
                      Alamat Lengkap
                    </label>
                  </div>

                  <FloatingInput
                    label="Apartement, suite, dsb. (opsional)"
                    icon={Building}
                    value={apartment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setApartment(e.target.value)
                    }
                  />

                  {/* Province Selector - Styled to match FloatingInput */}
                  <div className="relative group z-20">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none z-10">
                      <MapPin size={18} />
                    </div>
                    <select
                      value={province}
                      onChange={handleProvinceChange}
                      className={`peer w-full pl-12 pr-4 pt-5 pb-2 rounded-xl border outline-none transition-all bg-stone-50/50 focus:bg-white text-stone-800 font-medium appearance-none cursor-pointer ${
                        errors.province
                          ? "border-red-300 focus:border-red-500"
                          : "border-stone-200 focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-500/5"
                      }`}
                    >
                      <option value="" disabled></option>
                      {PROVINCES_LIST.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    <label
                      className={`absolute left-12 text-[10px] font-bold uppercase tracking-wider text-stone-400 transition-all pointer-events-none 
                      ${
                        !province
                          ? "peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-emerald-600 top-1/2 -translate-y-1/2 text-sm text-stone-500"
                          : "top-2 text-[10px] text-emerald-600"
                      }`}
                    >
                      Provinsi
                    </label>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* City & Zip Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-10">
                    <div onClick={(e) => e.stopPropagation()}>
                      <FloatingInput
                        label="Kota / Kabupaten"
                        icon={Building}
                        value={city}
                        onChange={handleCityChange}
                        onFocus={() => {
                          if (province) setShowCitySuggestions(true);
                        }}
                        error={errors.city ? "Wajib diisi" : ""}
                        suggestions={citySuggestions}
                        showSuggestions={showCitySuggestions}
                        onSuggestionClick={handleCitySelect}
                        autoComplete="off"
                      />
                    </div>

                    <FloatingInput
                      label="Kode Pos"
                      icon={Hash}
                      value={postalCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPostalCode(e.target.value);
                        if (errors.postalCode)
                          setErrors({ ...errors, postalCode: false });
                      }}
                      error={errors.postalCode ? "Wajib diisi" : ""}
                    />
                  </div>
                  <div className="pt-6">
                    <Button
                      onClick={handleNextStep1}
                      className="w-full md:w-auto"
                    >
                      {t.next_ship}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Pengiriman */}
            <div
              className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border ${step === 2 ? "border-emerald-500 ring-1 ring-emerald-500" : "border-stone-100"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-serif flex items-center gap-3 ${step >= 2 ? "text-emerald-950" : "text-stone-400"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-emerald-900 text-white" : "bg-stone-200 text-stone-500"}`}
                  >
                    2
                  </span>
                  {t.step2}
                </h3>
                {step > 2 && (
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setShipping(option)}
                      className={`relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${shipping?.id === option.id ? "border-emerald-600 bg-emerald-50/30 shadow-md" : "border-stone-100 hover:border-emerald-200 hover:bg-stone-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${shipping?.id === option.id ? "border-emerald-600" : "border-stone-300"}`}
                        >
                          {shipping?.id === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                          )}
                        </div>
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${shipping?.id === option.id ? "bg-emerald-100/50 text-emerald-700" : "bg-stone-50 text-stone-400"}`}
                        >
                          <option.icon size={22} />
                        </div>
                        <div>
                          <p className="font-serif font-medium text-emerald-950 text-lg">
                            {option.name}
                          </p>
                          <p className="text-sm text-stone-500 font-light flex items-center gap-1">
                            <Clock size={12} className="inline" /> Estimasi:{" "}
                            {option.eta}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-emerald-900 text-lg">
                        Rp {option.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                  <div className="pt-6 flex gap-4">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      {t.back}
                    </Button>
                    <Button disabled={!shipping} onClick={() => setStep(3)}>
                      {t.next_pay}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Pembayaran */}
            <div
              className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border ${step === 3 ? "border-emerald-500 ring-1 ring-emerald-500" : "border-stone-100"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-serif flex items-center gap-3 ${step >= 3 ? "text-emerald-950" : "text-stone-400"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? "bg-emerald-900 text-white" : "bg-stone-200 text-stone-500"}`}
                  >
                    3
                  </span>
                  {t.step3}
                </h3>
              </div>

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setPayment(option)}
                      className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${payment?.id === option.id ? "border-emerald-600 bg-emerald-50/30 shadow-md" : "border-stone-100 hover:border-emerald-200 hover:bg-stone-50"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${payment?.id === option.id ? "border-emerald-600" : "border-stone-300"}`}
                      >
                        {payment?.id === option.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        )}
                      </div>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${payment?.id === option.id ? "bg-emerald-100/50 text-emerald-700" : "bg-stone-50 text-stone-400"}`}
                      >
                        <option.icon size={22} />
                      </div>
                      <p className="font-serif font-medium text-emerald-950 text-lg">
                        {option.name}
                      </p>
                    </div>
                  ))}
                  <div className="pt-6 flex gap-4">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                      {t.back}
                    </Button>
                    <Button disabled={!payment} onClick={handlePlaceOrder}>
                      {t.pay_now}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - SUMMARY */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24 border border-stone-100">
              <h3 className="text-xl font-serif text-emerald-950 mb-6">
                {t.summary}
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className={`w-12 h-12 bg-white border border-stone-100 rounded-md flex items-center justify-center shrink-0 overflow-hidden`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grow">
                      <p className="text-sm font-medium text-emerald-950 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-900">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>
                    {shipping
                      ? `Rp ${shipping.price.toLocaleString("id-ID")}`
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-emerald-950 pt-2 border-t border-stone-100 mt-2">
                  <span>{t.total}</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
