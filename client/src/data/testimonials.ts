export interface Testimonial {
  id: number;
  reviewerName: string;
  reviewText: string;
  productName: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    reviewerName: "Bharana",
    reviewText:
      "Alhamdulillah.. paketnya telah sampai. Dan langsung di gunakan",
    productName: "HemoClear Essential Oil",
    rating: 5,
  },
  {
    id: 2,
    reviewerName: "Indriani",
    reviewText:
      "Respon cepat, packing rapi, baik dan fluxent sudah jadi bagian dari persediaan aromatherapy yg harus ada di rumah",
    productName: "Fluxent Essential Oil",
    rating: 5,
  },
  {
    id: 3,
    reviewerName: "Farida",
    reviewText: "Pengiriman mantap, oils nya sangat bermanfaat 👍",
    productName: "HiRooF Essential Oil",
    rating: 5,
  },
  {
    id: 4,
    reviewerName: "Gunawan",
    reviewText:
      "Packingnya aman safety, delivery cepat, seller gercep, semoga bermanfaat dan berkhasiat sesuai deskripsi, recommended seller",
    productName: "Max Pain Relief Oil",
    rating: 5,
  },
  {
    id: 5,
    reviewerName: "Indriani",
    reviewText:
      "Dikirim segera, respon dan pengiriman cepat, packingnya bagus, max pain relief dan fluxent oil cocok khasiatnya utk keluarga kami",
    productName: "Max Pain Relief Oil",
    rating: 5,
  },
  {
    id: 6,
    reviewerName: "Indah",
    reviewText: "Proses pengiriman cepat dan produk sangat bermanfaat",
    productName: "Fluxent Essential Oil",
    rating: 5,
  },
];
