import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import type { TranslationData } from "../data/data";

interface ContactPageProps {
  t: TranslationData;
}

const ContactPage: React.FC<ContactPageProps> = ({ t }) => {
  return (
    <div className="animate-fade-in pt-48 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">
            {t.contact.title}
          </h1>
          <p className="text-stone-600">{t.contact.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-serif text-emerald-900 mb-8 border-b border-stone-100 pb-4">
                {t.contact.info_title}
              </h3>

              <div className="space-y-8">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jl.+Kesehatan+Raya+No.+123+Jakarta+Selatan+12345+Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">
                      Visit Us
                    </h4>
                    <p className="text-stone-600 leading-relaxed group-hover:text-emerald-800 transition-colors">
                      Jl. Kesehatan Raya No. 123
                      <br />
                      Jakarta Selatan, 12345
                      <br />
                      Indonesia
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/628159118754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Call Us</h4>
                    <p className="text-stone-600 group-hover:text-emerald-800 transition-colors">
                      +62 815-9118-754
                    </p>
                    <p className="text-stone-500 text-sm mt-1">
                      Mon-Fri, 9am-5pm
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:anisherbal@gmail.com"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">
                      Email Us
                    </h4>
                    <p className="text-stone-600 group-hover:text-emerald-800 transition-colors">
                      anisherbal@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours Section */}
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-3 mb-6 text-emerald-800">
                <Clock size={20} />
                <h4 className="font-bold uppercase tracking-wider text-sm">
                  {t.contact.hours_title}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-stone-600 border-b border-stone-200 pb-2 border-dashed">
                  <span>Senin - Jumat</span>
                  <span className="font-medium text-emerald-900">
                    09:00 - 17:00
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Sabtu - Minggu</span>
                  <span className="font-medium text-emerald-900">
                    Tutup / Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-emerald-700 hover:border-emerald-700 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-emerald-700 hover:border-emerald-700 transition-all"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/50">
            <h3 className="text-2xl font-serif text-emerald-950 mb-8">
              Send a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_contact}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all"
                  placeholder="Email or Phone Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_msg}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button className="w-full bg-emerald-900 text-white px-6 py-4 rounded-xl font-medium tracking-wide hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <span>{t.contact.btn_send}</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
