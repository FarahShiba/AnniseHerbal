export interface CityData {
  name: string;
  zip: string;
}

export interface ProvinceData {
  cities: CityData[];
}

export const INDONESIA_DATA: Record<string, ProvinceData> = {
  "DKI Jakarta": {
    cities: [
      { name: "Jakarta Selatan", zip: "12190" },
      { name: "Jakarta Pusat", zip: "10110" },
      { name: "Jakarta Barat", zip: "11470" },
      { name: "Jakarta Timur", zip: "13220" },
      { name: "Jakarta Utara", zip: "14450" },
      { name: "Kepulauan Seribu", zip: "14550" },
    ],
  },
  "Jawa Barat": {
    cities: [
      { name: "Bandung", zip: "40111" },
      { name: "Bandung Barat", zip: "40552" },
      { name: "Bekasi", zip: "17141" },
      { name: "Bogor", zip: "16122" },
      { name: "Cimahi", zip: "40511" },
      { name: "Cirebon", zip: "45112" },
      { name: "Depok", zip: "16431" },
      { name: "Sukabumi", zip: "43111" },
      { name: "Tasikmalaya", zip: "46111" },
      { name: "Banjar", zip: "46311" },
    ],
  },
  "Jawa Tengah": {
    cities: [
      { name: "Semarang", zip: "50134" },
      { name: "Surakarta (Solo)", zip: "57111" },
      { name: "Magelang", zip: "56111" },
      { name: "Pekalongan", zip: "51111" },
      { name: "Salatiga", zip: "50711" },
      { name: "Tegal", zip: "52111" },
    ],
  },
  "Jawa Timur": {
    cities: [
      { name: "Surabaya", zip: "60111" },
      { name: "Malang", zip: "65111" },
      { name: "Batu", zip: "65311" },
      { name: "Blitar", zip: "66111" },
      { name: "Kediri", zip: "64125" },
      { name: "Madiun", zip: "63111" },
      { name: "Mojokerto", zip: "61311" },
      { name: "Pasuruan", zip: "67118" },
      { name: "Probolinggo", zip: "67211" },
    ],
  },
  Banten: {
    cities: [
      { name: "Tangerang", zip: "15111" },
      { name: "Tangerang Selatan", zip: "15310" },
      { name: "Serang", zip: "42111" },
      { name: "Cilegon", zip: "42411" },
    ],
  },
  "DI Yogyakarta": {
    cities: [
      { name: "Yogyakarta", zip: "55122" },
      { name: "Sleman", zip: "55511" },
      { name: "Bantul", zip: "55711" },
      { name: "Kulon Progo", zip: "55611" },
      { name: "Gunungkidul", zip: "55811" },
    ],
  },
  "Sumatera Utara": {
    cities: [
      { name: "Medan", zip: "20111" },
      { name: "Binjai", zip: "20711" },
      { name: "Deli Serdang", zip: "20511" },
    ],
  },
  "Sumatera Barat": {
    cities: [
      { name: "Padang", zip: "25111" },
      { name: "Bukittinggi", zip: "26111" },
    ],
  },
  Riau: {
    cities: [
      { name: "Pekanbaru", zip: "28111" },
      { name: "Dumai", zip: "28811" },
    ],
  },
  "Kalimantan Timur": {
    cities: [
      { name: "Samarinda", zip: "75111" },
      { name: "Balikpapan", zip: "76111" },
    ],
  },
  "Sulawesi Selatan": {
    cities: [
      { name: "Makassar", zip: "90111" },
      { name: "Gowa", zip: "92111" },
    ],
  },
  Bali: {
    cities: [
      { name: "Denpasar", zip: "80111" },
      { name: "Badung", zip: "80351" },
      { name: "Gianyar", zip: "80511" },
      { name: "Tabanan", zip: "82111" },
    ],
  },
  // ── Zone 2 – Luar Jawa (remaining provinces) ─────────────────────────────
  Aceh: { cities: [{ name: "Banda Aceh", zip: "23111" }] },
  "Nusa Tenggara Barat": { cities: [{ name: "Mataram", zip: "83111" }, { name: "Bima", zip: "84111" }] },
  "Kepulauan Riau": { cities: [{ name: "Batam", zip: "29411" }, { name: "Tanjung Pinang", zip: "29111" }] },
  "Sumatera Selatan": { cities: [{ name: "Palembang", zip: "30111" }, { name: "Lubuklinggau", zip: "31611" }] },
  Lampung: { cities: [{ name: "Bandar Lampung", zip: "35111" }, { name: "Metro", zip: "34111" }] },
  Jambi: { cities: [{ name: "Jambi", zip: "36111" }] },
  Bengkulu: { cities: [{ name: "Bengkulu", zip: "38111" }] },
  "Bangka Belitung": { cities: [{ name: "Pangkal Pinang", zip: "33111" }] },
  "Kalimantan Barat": { cities: [{ name: "Pontianak", zip: "78111" }, { name: "Singkawang", zip: "79111" }] },
  "Kalimantan Tengah": { cities: [{ name: "Palangkaraya", zip: "73111" }] },
  "Kalimantan Selatan": { cities: [{ name: "Banjarmasin", zip: "70111" }, { name: "Banjarbaru", zip: "70711" }] },
  "Kalimantan Utara": { cities: [{ name: "Tanjung Selor", zip: "77211" }] },
  "Sulawesi Tengah": { cities: [{ name: "Palu", zip: "94111" }] },
  "Sulawesi Utara": { cities: [{ name: "Manado", zip: "95111" }, { name: "Bitung", zip: "95511" }] },
  "Sulawesi Tenggara": { cities: [{ name: "Kendari", zip: "93111" }] },
  Gorontalo: { cities: [{ name: "Gorontalo", zip: "96111" }] },
  "Sulawesi Barat": { cities: [{ name: "Mamuju", zip: "91511" }] },
  Maluku: { cities: [{ name: "Ambon", zip: "97111" }] },
  "Maluku Utara": { cities: [{ name: "Ternate", zip: "97711" }, { name: "Sofifi", zip: "97811" }] },
  // ── Zone 3 – Papua / NTT / Remote ────────────────────────────────────────
  "Nusa Tenggara Timur": { cities: [{ name: "Kupang", zip: "85111" }] },
  Papua: { cities: [{ name: "Jayapura", zip: "99111" }] },
  "Papua Barat": { cities: [{ name: "Manokwari", zip: "98311" }] },
  "Papua Selatan": { cities: [{ name: "Merauke", zip: "99611" }] },
  "Papua Tengah": { cities: [{ name: "Nabire", zip: "98811" }] },
  "Papua Pegunungan": { cities: [{ name: "Wamena", zip: "99511" }] },
  "Papua Barat Daya": { cities: [{ name: "Sorong", zip: "98411" }] },
};

export const PROVINCES_LIST = Object.keys(INDONESIA_DATA).sort();
