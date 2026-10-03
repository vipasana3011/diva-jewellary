'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, Sparkles, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Query',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How long does shipping take across India?',
      a: 'Orders are dispatched within 24 hours from our Raja Park atelier in Jaipur. Express delivery typically arrives within 2 to 4 business days to metro cities, and 3 to 5 business days across the rest of India. All orders over ₹999 qualify for FREE Express Shipping.'
    },
    {
      q: 'Will the jewellery tarnish or turn my skin green?',
      a: 'No! Our pieces are crafted using surgical-grade stainless steel and lead-safe brass, coated with advanced 18K/22K vacuum PVD micron gold plating and an invisible ceramic anti-tarnish shield. They are 100% hypoallergenic, water-resistant, and sweat-resistant.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 7-day hassle-free exchange policy from the date of delivery. If you are not completely delighted with your jewellery or want to swap sizes/designs, simply reach out to us on WhatsApp (+91 82390 17449) or email care@divajewels.in.'
    },
    {
      q: 'Does the jewellery arrive in gift-ready packaging?',
      a: 'Yes, every single order arrives beautifully packed in our signature DIVA protective microfiber suede pouch, packaged inside our eco-luxe keepsake box ready for personal gifting or self-pampering.'
    },
    {
      q: 'Can I visit your physical studio in Jaipur?',
      a: 'Yes! Our design studio and pickup counter is located at Raja Park, Jaipur, Rajasthan. We welcome visitors Monday to Saturday from 10:30 AM to 7:30 PM.'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] pb-24">
      {/* Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONNECT WITH US</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1615]">
            Contact Our Jaipur Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6560] max-w-lg mx-auto">
            Have questions about styling, order tracking, or custom bridal gifting? Our team in Raja Park is always here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Info & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F2] border border-[#EAE3D6] p-6 rounded-xs space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615]">
                ATELIER DETAILS
              </h2>

              <div className="space-y-4 text-xs text-[#2C2724]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#997448] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#1A1615] block">Studio Location</strong>
                    <p className="text-[#6B6560] mt-0.5">
                      Raja Park, Jaipur, Rajasthan 302004, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#997448] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#1A1615] block">Direct Phone & WhatsApp</strong>
                    <a href="tel:+918239017449" className="text-[#997448] hover:underline font-semibold block mt-0.5">
                      +91 82390 17449
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#997448] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#1A1615] block">Customer Support</strong>
                    <a href="mailto:care@divajewels.in" className="text-[#997448] hover:underline block mt-0.5">
                      care@divajewels.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#997448] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#1A1615] block">Hours of Operation</strong>
                    <p className="text-[#6B6560] mt-0.5">
                      Monday to Saturday: 10:30 AM – 7:30 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918239017449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>CHAT WITH US ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#F4EFE6] p-6 sm:p-8 rounded-xs border border-[#EAE3D6]">
            <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] mb-4">
              SEND US A MESSAGE
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF7F2] rounded-xs border border-[#EAE3D6] space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#1A1615]">Message Received</h3>
                <p className="text-xs text-[#6B6560] max-w-sm mx-auto">
                  Thank you for reaching out. A DIVA styling consultant from our Raja Park team will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6B6560] mb-1 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ananya Sharma"
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B6560] mb-1 font-medium">Mobile Number (+91) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Topic / Inquired Piece</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880] cursor-pointer"
                  >
                    <option value="Order Query">Order Status & Tracking</option>
                    <option value="Styling Advice">Occasion Styling & Sizing Advice</option>
                    <option value="Bulk / Gifting">Wedding Gifting / Bulk Orders</option>
                    <option value="Exchange">7-Day Exchange Request</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors cursor-pointer"
                >
                  SEND MESSAGE TO RAJA PARK ATELIER
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div id="faq" className="mt-20 pt-10 border-t border-[#EAE3D6] max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              HELPFUL ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1615] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#EAE3D6] border-y border-[#EAE3D6]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left text-xs sm:text-sm font-semibold text-[#1A1615] hover:text-[#C5A880] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform shrink-0 ml-2 ${
                      openFaq === idx ? 'rotate-180 text-[#C5A880]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-2.5 text-xs text-[#6B6560] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
