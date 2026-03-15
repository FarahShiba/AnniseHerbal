import React, { useState } from "react";
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
import { submitContactForm } from "../services/contactService";

interface ContactPageProps {
  t: TranslationData;
}

const ContactPage: React.FC<ContactPageProps> = ({ t }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  //loading & message state
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // function submit handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent from refreshing the page while we are processing the document

    //validate empty fields of fields
    // validate name
    if (!name.trim()) {
      setResponseMessage("please enter the name");
      return;
    }
    // validate email
    if (!email.trim()) {
      setResponseMessage("please enter the email");
      return;
    }
    // validate phone
    if (!phone.trim()) {
      setResponseMessage("please enter the phone number");
      return;
    }
    //validate message
    if (!message.trim()) {
      setResponseMessage("please enter the message");
      return;
    }

    // try catch
    try {
      setLoading(true); // set loading to true
      setResponseMessage(""); // Clear old messages

      // calling contact api
      const response = await submitContactForm(name, email, phone, message);

      // show success message
      setResponseMessage(response.message || "Contact form submitted");
      // Clear form fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      //clear message after 5 seconds
      setTimeout(() => setResponseMessage(""), 5000);
    } catch (error: unknown) {
      // Type guard to check if error is our ApiError
      if (error && typeof error === "object" && "details" in error) {
        // Format all validation errors into one message
        const errorMessages = Object.values(
          error.details as Record<string, string>,
        ).join(". ");
        setResponseMessage(errorMessages);
      } else if (error && typeof error === "object" && "message" in error) {
        setResponseMessage((error as { message: string }).message);
      } else {
        setResponseMessage(
          "Failed to submit the contact form. Please try again",
        );
      }
      console.error("Contact form error:", error);
    } finally {
      setLoading(false); // always turn off loading
    }
  };

  return (
    <div className="animate-fade-in pt-28 md:pt-48 pb-24 bg-white min-h-screen">
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
                  // href="https://www.google.com/maps/search/?api=1&query=Jl.+Kejaksaan+1+No.+3+Kreo+Larangan"
                  // target="_blank"
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
                      Tanggerang,
                      <br />
                      Banten
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
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_email}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t.contact.form_number}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-stone-800 placeholder-stone-400 transition-all"
                  placeholder="Whatsapp Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 text-white px-6 py-4 rounded-xl font-medium tracking-wide hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2
             
              "
              >
                {loading ? (
                  <span>Sending...</span> // Show this when loading
                ) : (
                  <>
                    <span>{t.contact.btn_send}</span>
                    <Send size={18} />
                  </>
                )}
              </button>
              {responseMessage && (
                <p
                  className={`text-sm ${responseMessage.includes("Failed") || responseMessage.includes("please") ? "text-red-600" : "text-green-600"}`}
                >
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
