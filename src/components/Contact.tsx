import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    weddingDate: '',
    guestCount: '',
    message: ''
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      weddingDate: '',
      guestCount: '',
      message: ''
    });
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-yellow-400">Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to begin planning your dream Indian wedding? We're here to make your 
              vision come to life with our expertise and attention to detail.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-white mb-8">
                Let's Start Planning Your Perfect Day
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-gray-300">+91 73860 48000</div>
                    <div className="text-gray-300">+91 94946 66606</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">info@wedinindia.com</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-2">Our Locations</div>
                    <div className="text-gray-300 mb-3">
                      <div className="font-semibold text-yellow-400">Head Office</div>
                      <div>Flat 202, Satya Sanjeevi Apartments</div>
                      <div>Akkayyapalem, Visakhapatnam - 530016</div>
                    </div>
                    <div className="text-gray-300">
                      <div className="font-semibold text-yellow-400">Branch</div>
                      <div>36/23/12/B, DRS Complex</div>
                      <div>Chuttugunta Main Road, Sitharampuram</div>
                      <div>Vijayawada - 520004</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Response Time</div>
                    <div className="text-gray-300">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg p-6 border border-yellow-400/20">
                <h4 className="font-semibold text-white mb-3">Why Choose Us?</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• 10+ years of experience with international couples</li>
                  <li>• Full-service planning from concept to execution</li>
                  <li>• Deep knowledge of Indian customs and traditions</li>
                  <li>• Luxury venues across India</li>
                  <li>• Dedicated support throughout your journey</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="weddingDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Wedding Date
                    </label>
                    <input
                      type="date"
                      id="weddingDate"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Guest Count
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select guest count</option>
                      <option value="50-100">50-100 guests</option>
                      <option value="100-200">100-200 guests</option>
                      <option value="200-300">200-300 guests</option>
                      <option value="300+">300+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your dream wedding *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Share your vision, preferred locations, special requirements, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;