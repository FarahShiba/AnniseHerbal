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
  Bali: {
    cities: [
      { name: "Denpasar", zip: "80111" },
      { name: "Badung", zip: "80351" },
      { name: "Gianyar", zip: "80511" },
      { name: "Tabanan", zip: "82111" },
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
};

export const PROVINCES_LIST = Object.keys(INDONESIA_DATA).sort();
