import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  User,
  MapPin,
  Phone,
  Building,
  Hash,
} from "lucide-react";

import Button from "../components/Button";
import type { CartItem, ShippingOption } from "../types";
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

import { PROVINCES_LIST } from "../data/indonesia-data";
import { getShippingOptions } from "../data/shippingData";
import { createOrder } from "../services/orderService";

// Helper function to categorize delivery type and return colors
const getDeliveryTypeColors = (label: string, duration: string) => {
  const lowerLabel = label.toLowerCase();
  const lowerDuration = duration.toLowerCase();

  // Same Day services (8-12 hours)
  if (
    lowerLabel.includes("same day") ||
    lowerDuration.includes("8 - 12 hours") ||
    lowerDuration.includes("8-12")
  ) {
    return {
      border: "border-red-300",
      selectedBg: "from-red-50 to-red-100/50",
      selectedShadow: "shadow-lg shadow-red-200/50",
      badgeBg: "bg-red-500",
      badgeText: "text-white",
      textColor: "text-red-900",
      labelColor: "text-red-700",
      badgeUnselectedBg: "bg-red-100",
      badgeUnselectedText: "text-red-600",
    };
  }

  // Next Day services (1 day, 1-1 days, yakin esok, besok)
  if (
    lowerLabel.includes("next day") ||
    lowerLabel.includes("yes") ||
    lowerLabel.includes("besok") ||
    lowerDuration.includes("1 - 1") ||
    lowerDuration.includes("1 day")
  ) {
    return {
      border: "border-amber-300",
      selectedBg: "from-amber-50 to-amber-100/50",
      selectedShadow: "shadow-lg shadow-amber-200/50",
      badgeBg: "bg-amber-500",
      badgeText: "text-white",
      textColor: "text-amber-900",
      labelColor: "text-amber-700",
      badgeUnselectedBg: "bg-amber-100",
      badgeUnselectedText: "text-amber-600",
    };
  }

  // Regular/Standard (2+ days)
  return {
    border: "border-emerald-300",
    selectedBg: "from-emerald-50 to-emerald-100/50",
    selectedShadow: "shadow-lg shadow-emerald-200/50",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    textColor: "text-emerald-900",
    labelColor: "text-emerald-700",
    badgeUnselectedBg: "bg-emerald-100",
    badgeUnselectedText: "text-emerald-600",
  };
};

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [apartment, setApartment] = useState("");

  // Shipping rates (fetched live from Biteship via backend)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);

  // Validation State — string = error message, empty = no error
  const [errors, setErrors] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    whatsapp: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  // Field-level validation helpers (mirrors backend rules)
  const validateField = (field: string, value: string): string => {
    const v = value.trim();
    switch (field) {
      case "firstName":
      case "lastName": {
        if (!v) return "Wajib diisi";
        if (v.length < 2) return "Minimal 2 karakter";
        if (v.length > 20) return "Maksimal 20 karakter";
        if (!/^[a-zA-Z\s]+$/.test(v)) return "Hanya huruf dan spasi";
        return "";
      }
      case "whatsapp": {
        if (!v) return "Wajib diisi";
        if (!/^08\d{8,11}$/.test(v)) return "Harus diawali 08, 10-13 digit";
        return "";
      }
      case "address": {
        if (!v) return "Wajib diisi";
        if (v.length >= 200) return "Maksimal 200 karakter";
        return "";
      }
      case "city": {
        if (!v) return "Wajib diisi";
        if (v.length > 20) return "Maksimal 20 karakter";
        return "";
      }
      case "province":
        return !v ? "Wajib dipilih" : "";
      case "postalCode": {
        if (!v) return "Wajib diisi";
        if (!/^\d{5}$/.test(v)) return "Harus 5 digit angka";
        return "";
      }
      default:
        return "";
    }
  };

  const handleBlur = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  // --- HANDLERS ---
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProv = e.target.value;
    setProvince(selectedProv);
    setShipping(null);
    if (errors.province) setErrors({ ...errors, province: "" });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const shippingCost = shipping?.price || 0;
  const total = subtotal + shippingCost;

  // Fetch live rates whenever the postal code becomes a valid 5-digit code
  useEffect(() => {
    if (!postalCode || !/^\d{5}$/.test(postalCode)) {
      setShippingOptions([]);
      return;
    }
    setShippingLoading(true);
    setShipping(null);
    getShippingOptions(postalCode, cartItems)
      .then(setShippingOptions)
      .catch(() => setShippingOptions([]))
      .finally(() => setShippingLoading(false));
  }, [postalCode]);

  const handleNextStep1 = () => {
    const newErrors = {
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      whatsapp: validateField("whatsapp", whatsapp),
      address: validateField("address", address),
      city: validateField("city", city),
      province: validateField("province", province),
      postalCode: validateField("postalCode", postalCode),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== "")) {
      return;
    }

    setStep(2);
  };

  const confirmPayment = async () => {
    setOrderError(null);

    // --- VALIDATION: Check all fields are filled ---
    if (
      !firstName ||
      !lastName ||
      !whatsapp ||
      !address ||
      !city ||
      !province ||
      !postalCode
    ) {
      setOrderError(
        "Mohon lengkapi semua data diri Anda sebelum melanjutkan pembayaran.",
      );
      return;
    }

    // --- VALIDATION: Check shipping is selected ---
    if (!shipping) {
      setOrderError(
        "Mohon pilih opsi pengiriman sebelum melanjutkan pembayaran.",
      );
      return;
    }

    // --- All validations passed, proceed with payment ---
    setOrderLoading(true);

    try {
      const response = await createOrder({
        customer: {
          name: `${firstName} ${lastName}`,
          email: "customer@anniseherbal.com", // placeholder until email field added
          phoneNumber: whatsapp,
          address,
          city,
          province,
          postalCode,
          specialInstructions: apartment || undefined,
        },
        items: cartItems.map((item) => ({
          productId: String(item.id),
          category: item.category,
          quantity: item.qty,
          sizeName: item.sizeName ?? "100ml",
        })),
        shipping: {
          tier: shipping.tier,
          courierUsed: shipping.courier,
          courierServiceCode: shipping.serviceCode,
          shippingPrice: shipping.price,
        },
        paymentMethod: "bank_transfer",
        idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      });

      // Open Midtrans Snap payment popup
      if (response.midtransToken && window.snap) {
        setOrderLoading(false);

        window.snap.pay(response.midtransToken, {
          onSuccess: () => {
            setIsSuccess(true);
            setTimeout(() => clearCart(), 1000);
          },
          onPending: () => {
            setOrderError(
              "Pembayaran sedang diproses. Silakan selesaikan pembayaran.",
            );
          },
          onError: () => {
            setOrderError("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            setOrderError(
              "Popup pembayaran ditutup. Klik 'Bayar' untuk mencoba lagi.",
            );
          },
        });
      } else {
        throw new Error(
          "Payment system unavailable. Please refresh and try again.",
        );
      }
    } catch (err: unknown) {
      console.error("❌ Payment error:", err);
      let msg = "Terjadi kesalahan. Silakan coba lagi.";
      if (err && typeof err === "object" && "details" in err) {
        const apiErr = err as {
          message: string;
          details?: Record<string, unknown>;
        };
        const detailMessages = apiErr.details
          ? Object.entries(apiErr.details)
              .map(([key, val]) => {
                if (typeof val === "object" && val !== null) {
                  return Object.values(val as Record<string, string>).join(
                    ", ",
                  );
                }
                return `${key}: ${val}`;
              })
              .join(" | ")
          : "";
        msg = detailMessages || apiErr.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setOrderError(msg);
    } finally {
      setOrderLoading(false);
    }
  };

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
                          setErrors({ ...errors, firstName: "" });
                      }}
                      onBlur={() => handleBlur("firstName", firstName)}
                      error={errors.firstName}
                    />
                    <FloatingInput
                      label="Nama Belakang"
                      icon={User}
                      value={lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLastName(e.target.value);
                        if (errors.lastName)
                          setErrors({ ...errors, lastName: "" });
                      }}
                      onBlur={() => handleBlur("lastName", lastName)}
                      error={errors.lastName}
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
                        setErrors({ ...errors, whatsapp: "" });
                    }}
                    onBlur={() => handleBlur("whatsapp", whatsapp)}
                    error={errors.whatsapp}
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
                          setErrors({ ...errors, address: "" });
                      }}
                      onBlur={() => handleBlur("address", address)}
                      className={`peer w-full pl-12 pr-4 pt-5 pb-2 rounded-xl border outline-none transition-all placeholder-transparent bg-stone-50/50 focus:bg-white text-stone-800 font-medium ${
                        errors.address
                          ? "border-red-300 focus:border-red-500 bg-red-50/10"
                          : "border-stone-200 focus:border-emerald-600 focus:shadow-lg focus:shadow-emerald-500/5"
                      }`}
                    ></textarea>
                    <label className="absolute left-12 top-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-500 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-emerald-600 pointer-events-none">
                      Alamat Lengkap
                    </label>
                    {errors.address && (
                      <p className="text-red-500 text-[10px] mt-1 ml-4">
                        {errors.address}
                      </p>
                    )}
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
                    {errors.province && (
                      <p className="text-red-500 text-[10px] mt-1 ml-4">
                        {errors.province}
                      </p>
                    )}
                  </div>

                  {/* City & Zip Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-10">
                    <FloatingInput
                      label="Kota / Kabupaten"
                      icon={Building}
                      value={city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: "" });
                      }}
                      onBlur={() => handleBlur("city", city)}
                      error={errors.city}
                    />

                    <div>
                      <FloatingInput
                        label="Kode Pos"
                        icon={Hash}
                        value={postalCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPostalCode(e.target.value);
                          if (errors.postalCode)
                            setErrors({ ...errors, postalCode: "" });
                        }}
                        onBlur={() => handleBlur("postalCode", postalCode)}
                        error={errors.postalCode}
                      />
                      <p className="text-xs text-stone-400 mt-1.5 ml-1">
                        Kode pos digunakan untuk menghitung ongkir
                      </p>
                    </div>
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
                  {shippingLoading && (
                    <p className="text-stone-500 text-sm text-center py-4">
                      Mengambil harga pengiriman…
                    </p>
                  )}
                  {!shippingLoading && shippingOptions.length === 0 && (
                    <p className="text-stone-400 text-sm text-center py-4">
                      Masukkan kode pos yang valid untuk melihat opsi
                      pengiriman.
                    </p>
                  )}
                  {shippingOptions.map((option) => {
                    const isSelected =
                      shipping?.courierCode === option.courierCode &&
                      shipping?.serviceCode === option.serviceCode;
                    const colors = getDeliveryTypeColors(
                      option.label,
                      option.duration,
                    );
                    return (
                      <div
                        key={`${option.courierCode}-${option.serviceCode}`}
                        onClick={() => setShipping(option)}
                        className={`relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${isSelected ? `border-emerald-600 bg-gradient-to-r ${colors.selectedBg} ${colors.selectedShadow}` : `${colors.border} hover:border-emerald-400 hover:bg-stone-50/50`}`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-emerald-600 bg-emerald-50" : "border-stone-300"}`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            )}
                          </div>
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-bold text-sm ${isSelected ? `${colors.badgeBg} ${colors.badgeText} shadow-md` : `${colors.badgeUnselectedBg} ${colors.badgeUnselectedText}`}`}
                          >
                            {option.courierCode.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p
                              className={`font-serif font-medium text-lg transition-colors ${isSelected ? colors.textColor : "text-stone-700"}`}
                            >
                              {option.label}
                            </p>
                            {option.courier && (
                              <p
                                className={`text-xs font-semibold mt-0.5 uppercase tracking-wide transition-colors ${isSelected ? colors.labelColor : "text-stone-500"}`}
                              >
                                {option.courier}
                              </p>
                            )}
                            <p
                              className={`text-sm font-light flex items-center gap-1 mt-0.5 transition-colors ${isSelected ? colors.labelColor : "text-stone-500"}`}
                            >
                              <Clock size={12} className="inline" /> Estimasi:{" "}
                              {option.duration}
                            </p>
                            {option.notes && (
                              <p
                                className={`text-xs mt-1 transition-colors ${isSelected ? colors.labelColor : "text-stone-400"}`}
                              >
                                {option.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <span
                          className={`font-semibold text-lg transition-colors ${isSelected ? colors.textColor : "text-stone-700"}`}
                        >
                          Rp {option.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    );
                  })}
                  <div className="pt-6 flex gap-4">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      {t.back}
                    </Button>
                    <Button
                      disabled={!shipping || orderLoading}
                      onClick={confirmPayment}
                    >
                      {orderLoading ? "Memproses..." : t.pay_now}
                    </Button>
                  </div>
                  {orderError && (
                    <p className="text-red-500 text-sm mt-3 text-center font-medium">
                      {orderError}
                    </p>
                  )}
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
