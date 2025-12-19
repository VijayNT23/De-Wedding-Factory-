import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import contactHeroImage from "../assets/images/contact-hero.jpg";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { sendInquiryEmail, EmailData } from "../services/emailService";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  budget: string;
  message: string;
}

const Contact: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.2,
        y: 200,
      });

      gsap.fromTo(
        ".contact-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-card",
            start: "top 80%",
          },
          stagger: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Send email using the email service
      const result = await sendInquiryEmail(formData as EmailData);
      
      setIsSubmitting(false);
      
      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          eventType: "",
          guestCount: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setSubmitMessage("An unexpected error occurred. Please try again later.");
    }

    // Auto-hide status message after 8 seconds
    setTimeout(() => {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }, 8000);
  };

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="Contact Wedding Planners Vizag | Get Quote for Your Dream Wedding"
        description="Contact our expert wedding planners in Vizag for your dream Indian wedding. Get personalized quotes, consultation, and planning services for international couples. Located in Visakhapatnam, Andhra Pradesh."
        keywords="contact wedding planners vizag, wedding consultation vizag, wedding planning quote, event planners contact, vizag wedding services, wedding planning consultation, international couples contact"
        canonical="https://deweddingfactory.com/contact"
      />
      <section className="relative h-screen overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img
            src={contactHeroImage}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6"
        >
          <div className="text-center max-w-5xl">
            <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">
              Plan with
              <span className="italic text-gray-200">us</span>
              
            </h1>

            <motion.div
              className="w-24 h-px bg-white mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <p className="text-xl md:text-2xl font-light text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Share your vision with us and let's create an unforgettable
              celebration together
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-5xl md:text-6xl font-serif mb-6">
                  Get In Touch
                </h2>
                <div className="w-24 h-px bg-black mb-8" />
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  We're here to answer your questions and bring your dream
                  wedding to life
                </p>
              </div>

              <div className="space-y-8">
                <div className="contact-card group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white group-hover:bg-gray-900 transition-colors duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-2">Phone</h3>
                      <p className="text-gray-600 font-light">+91 73860 48000</p>
                      <p className="text-gray-600 font-light">+91 94946 66606</p>
                    </div>
                  </div>
                </div>

                <div className="contact-card group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white group-hover:bg-gray-900 transition-colors duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-2">Email</h3>
                      <p className="text-gray-600 font-light">
                        info@wedinindia.com
                      </p>
                      <p className="text-gray-600 font-light">
                        contact@wedinindia.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="contact-card group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white group-hover:bg-gray-900 transition-colors duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-2">Our Locations</h3>
                      <div className="text-gray-600 font-light leading-relaxed">
                        <div className="mb-4">
                          <div className="font-semibold text-black mb-1">Head Office</div>
                          <div>Flat 202, Satya Sanjeevi Apartments</div>
                          <div>Akkayyapalem, Visakhapatnam - 530016</div>
                        </div>
                        <div>
                          <div className="font-semibold text-black mb-1">Branch</div>
                          <div>36/23/12/B, DRS Complex</div>
                          <div>Chuttugunta Main Road, Sitharampuram</div>
                          <div>Vijayawada - 520004</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-3">
              <div className="contact-card bg-white p-10 border border-gray-200">
                <h2 className="text-4xl font-serif mb-8">Send Us a Message</h2>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-green-50 border border-green-200 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-green-800 font-light">
                      {submitMessage || "Thank you for reaching out! We'll get back to you within 24 hours."}
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-red-50 border border-red-200 flex items-center gap-3"
                  >
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <p className="text-red-800 font-light">
                      {submitMessage || "Sorry, there was an error sending your message. Please try again."}
                    </p>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="wedding">Wedding</option>
                        <option value="engagement">Engagement</option>
                        <option value="reception">Reception</option>
                        <option value="pre-wedding">Pre-Wedding Events</option>
                        <option value="destination">Destination Wedding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block text-sm font-light mb-2 tracking-wide uppercase"
                      >
                        Expected Guest Count
                      </label>
                      <select
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="0-50">0-50 guests</option>
                        <option value="50-100">50-100 guests</option>
                        <option value="100-200">100-200 guests</option>
                        <option value="200-500">200-500 guests</option>
                        <option value="500+">500+ guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-light mb-2 tracking-wide uppercase"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="10-25">₹10-25 Lakhs</option>
                      <option value="25-50">₹25-50 Lakhs</option>
                      <option value="50-100">₹50 Lakhs - ₹1 Crore</option>
                      <option value="100+">₹1 Crore+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-light mb-2 tracking-wide uppercase"
                    >
                      Tell Us About Your Vision *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Share your ideas, preferences, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full md:w-auto inline-flex items-center justify-center gap-4 px-12 py-4 bg-black text-white font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 uppercase">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <Send className="relative z-10 w-5 h-5" />
                    <div className="absolute inset-0 bg-gray-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Visit Our Studio
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation at our luxury studio to discuss your wedding
              plans in detail
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Head Office Map */}
            <div>
              <h3 className="text-2xl font-serif mb-4 text-center">Head Office - <span className="italic">Visakhapatnam</span></h3>
              <div className="aspect-[16/9] w-full bg-gray-200 overflow-hidden border border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d83.2185!3d17.6868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e0ad2d%3A0x5a5a5a5a5a5a5a5a!2sAkkayyapalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Head Office Location - Visakhapatnam"
                />
              </div>
            </div>

            {/* Branch Office Map */}
            <div>
              <h3 className="text-2xl font-serif mb-4 text-center">Branch Office - <span className="italic">Vijayawada</span></h3>
              <div className="aspect-[16/9] w-full bg-gray-200 overflow-hidden border border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.123456789!2d80.6480!3d16.5062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35a4c8b8b8b8b8%3A0x5a5a5a5a5a5a5a5a!2sSitharampuram%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Branch Office Location - Vijayawada"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32 border-t border-gray-200" />
    </div>
  );
};

export default Contact;
