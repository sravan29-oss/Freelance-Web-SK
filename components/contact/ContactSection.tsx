"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_INFO, BUSINESS_TYPES, BUDGET_RANGES } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";
import { Send, MessageSquare, Calendar, Mail, ArrowRight, X, Clock } from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM"
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Booking states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    notes: ""
  });

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleCloseBookingModal = () => {
    setIsBookingOpen(false);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "",
        notes: ""
      });
    }, 300);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/naredlasravankumar29@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `📅 Discovery Call Booking - ${bookingForm.name}`,
          Name: bookingForm.name,
          Email: bookingForm.email,
          Phone: bookingForm.phone,
          "Preferred Date": bookingForm.date,
          "Preferred Time Slot": bookingForm.timeSlot,
          "Discussion Topics": bookingForm.notes || "None provided"
        })
      });

      if (response.ok) {
        setBookingSuccess(true);
      } else {
        alert("Failed to submit booking request. Please try again.");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formEl = e.currentTarget as HTMLFormElement;
    const nameVal = (formEl.querySelector("#name") as HTMLInputElement).value;
    const emailVal = (formEl.querySelector("#email") as HTMLInputElement).value;
    const businessVal = (formEl.querySelector("#business") as HTMLSelectElement).value;
    const budgetVal = (formEl.querySelector("#budget") as HTMLSelectElement).value;
    const messageVal = (formEl.querySelector("#message") as HTMLTextAreaElement).value;

    try {
      const response = await fetch("https://formsubmit.co/ajax/naredlasravankumar29@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `💼 New Enterprise Inquiry - ${nameVal}`,
          Name: nameVal,
          Email: emailVal,
          "Business Type": businessVal || "Not specified",
          "Estimated Budget": budgetVal || "Not specified",
          "Project Details": messageVal
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        formEl.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      alert("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gray-50 dark:bg-[#060609] overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 gradient-mesh-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.p className="text-violet-500 dark:text-violet-400 text-sm font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-violet-500 dark:bg-violet-400" />
              Start Your Project
              <span className="w-8 h-[2px] bg-violet-500 dark:bg-violet-400" />
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-violet-500 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Business?
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-white/60 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10 px-4 py-2 rounded-full w-fit mx-auto shadow-sm">
              <Clock size={16} className="text-emerald-500" />
              <span>We aim to respond to all inquiries within <strong className="text-gray-900 dark:text-white">2 business hours</strong></span>
            </div>
          </div>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Info & CTAs */}
          <div className="w-full lg:w-5/12">
            <SectionReveal variant="slideLeft">
              <div className="space-y-6">
                <a
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 hover:border-[#25D366]/40 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                      <MessageSquare size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      WhatsApp Chat
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-white/50 text-sm ml-16">Direct line for quick technical discussions and project estimates.</p>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                      <Mail size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Email Us
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-white/50 text-sm ml-16">{CONTACT_INFO.email}</p>
                </a>

                <div className="relative group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
                  <div className="relative flex flex-col p-8 rounded-2xl bg-white dark:bg-[#0a0a0f] border border-black/5 dark:border-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 mb-4">
                      <Calendar size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Schedule a Discovery Call
                    </h3>
                    <p className="text-gray-500 dark:text-white/50 text-sm mb-6">
                      Book a free 30-minute strategy session with our lead architect to discuss your business goals.
                    </p>
                    <div className="w-full py-3 rounded-xl bg-violet-500 text-white font-medium text-center flex items-center justify-center gap-2 group-hover:bg-violet-600 transition-colors">
                      Pick a Time <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12">
            <SectionReveal variant="slideRight" delay={0.2}>
              <div className="bg-white dark:bg-[#0a0a0f] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Form decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">Project Inquiry</h3>
                <p className="text-gray-500 dark:text-white/50 text-sm mb-8 relative z-10">Fill out the form below with your project details and we'll be in touch shortly.</p>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center h-full relative z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                      <Send size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-500 dark:text-white/40 max-w-sm">Thank you for reaching out. A member of our team will review your requirements and contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-white/70">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full bg-gray-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-white/70">Work Email *</label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full bg-gray-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="business" className="text-sm font-medium text-gray-700 dark:text-white/70">Industry</label>
                        <select
                          id="business"
                          className="w-full bg-gray-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-700 dark:text-white/80 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none"
                        >
                          <option value="" className="bg-white dark:bg-[#0a0a0f]">Select industry</option>
                          {BUSINESS_TYPES.map(type => (
                             <option key={type} value={type} className="bg-white dark:bg-[#0a0a0f]">{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-white/70">Estimated Budget</label>
                        <select
                          id="budget"
                          className="w-full bg-gray-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-700 dark:text-white/80 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none"
                        >
                          <option value="" className="bg-white dark:bg-[#0a0a0f]">Select budget range</option>
                          {BUDGET_RANGES.map(range => (
                            <option key={range} value={range} className="bg-white dark:bg-[#0a0a0f]">{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-white/70">Project Details *</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-gray-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
                        placeholder="Tell us about your project goals, technical requirements, and timeline..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white dark:hover:text-gray-900 font-bold rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-70 shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Sending Request..." : "Submit Inquiry"}
                        {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </span>
                    </button>
                    <p className="text-center text-xs text-gray-500 dark:text-white/40 mt-4">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Booking Form Modal (same logic, updated styling for agency) */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={handleCloseBookingModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0f] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseBookingModal}
                className="absolute top-4 right-4 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer z-20"
              >
                <X size={24} />
              </button>

              {bookingSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                        <motion.path strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Session Scheduled</h3>
                  <p className="text-gray-500 dark:text-white/60 text-sm max-w-sm mb-6">
                    We've received your request for a strategy session on <span className="text-violet-400 font-semibold">{bookingForm.date}</span> at <span className="text-cyan-400 font-semibold">{bookingForm.timeSlot}</span>.
                  </p>

                  <button
                    type="button"
                    onClick={handleCloseBookingModal}
                    className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg transition-colors text-sm cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Strategy Session</h3>
                      <p className="text-gray-500 dark:text-white/40 text-xs">Select your preferred date & time</p>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 dark:text-white/60">Preferred Date *</label>
                        <input type="date" required min={minDate} value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 dark:text-white/60">Time Slot *</label>
                        <select required value={bookingForm.timeSlot} onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none">
                          <option value="" className="bg-white dark:bg-[#0a0a0f]">Select time</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot} className="bg-white dark:bg-[#0a0a0f]">{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600 dark:text-white/60">Your Name *</label>
                      <input type="text" required placeholder="John Doe" value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600 dark:text-white/60">Work Email *</label>
                      <input type="email" required placeholder="john@company.com" value={bookingForm.email} onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600 dark:text-white/60">Phone Number *</label>
                      <input type="tel" required placeholder="+1 (555) 000-0000" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600 dark:text-white/60">Brief Agenda (Optional)</label>
                      <textarea rows={2} placeholder="What are we discussing?" value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none" />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={handleCloseBookingModal} className="flex-1 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white font-medium rounded-xl transition-colors text-sm">Cancel</button>
                      <button type="submit" disabled={isSubmittingBooking} className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg transition-all text-sm disabled:opacity-50 hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white dark:hover:text-gray-900">
                        {isSubmittingBooking ? "Processing..." : "Confirm Booking"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
