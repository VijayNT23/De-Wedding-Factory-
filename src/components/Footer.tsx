import React from "react";
import { Mail, Phone, MapPin, LucideArrowRight } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoWhite from '../assets/Logo-white.png';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-gray-300 w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 border-b border-gray-700 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
          <img src={LogoWhite} alt="De Wedding Factory" className="h-16 md:h-20 w-auto" />
          {/* Newsletter Box */}
          <div className="w-full md:w-auto flex flex-col items-start md:items-start">
            <p className="mb-2">
              Sign up for our <span className="italic font-serif text-yellow-400 ">Newsletter</span>
            </p>
            <div className="flex items-center border-b border-gray-600 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent flex-1 px-2 py-2 outline-none text-sm"
              />
              <button className="text-white px-3 py-2">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Links */}
        <div className="flex flex-col justify-start">
          <div>
            <h4 className="mb-4 font-serif text-yellow-400">Quick links</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link to="/about" className="transition hover:text-yellow-400 hover:scale-105 inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/parties" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Parties</Link>
              </li>
              <li>
                <Link to="/wedding" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Wedding</Link>
              </li>
              <li>
                <Link to="/services" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Services</Link>
              </li>
              <li>
                <Link to="/destinations" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Destinations</Link>
              </li>
              <li>
                <Link to="/portfolio" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Portfolio</Link>
              </li>
              <li>
                <Link to="/resources" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Resources</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="mb-4 font-serif text-yellow-400">Destinations</h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link to="/destinations?destination=udaipur" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Udaipur</Link>
            </li>
            <li>
              <Link to="/destinations?destination=jaipur" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Jaipur</Link>
            </li>
            <li>
              <Link to="/destinations?destination=kerala" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Kerala</Link>
            </li>
            <li>
              <Link to="/destinations?destination=jodhpur" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Jodhpur</Link>
            </li>
            <li>
              <Link to="/destinations?destination=rishikesh" className="transition hover:text-yellow-400 hover:scale-105 inline-block">Rishikesh</Link>
            </li>
            <li className="flex items-center text-yellow-400 hover:text-gray-300 transition hover:scale-110">
              <Link to="/destinations" className="flex items-center">
                More <LucideArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-4 font-serif text-yellow-400">Legal</h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link to="/privacy-policy" className="transition hover:text-yellow-400 hover:scale-105 inline-block">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="transition hover:text-yellow-400 hover:scale-105 inline-block">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-serif text-yellow-400">Contact Us</h4>
          <ul className="space-y-2 text-sm font-light">
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2" /> +91 73860 48000
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2" /> +91 94946 66606
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2" /> info@deweddingfactory.com
            </li>
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-yellow-400 mb-1">Head Office</div>
                <div>Flat 202, Satya Sanjeevi Apartments</div>
                <div>Akkayyapalem, Visakhapatnam - 530016</div>
                <div className="mt-2 font-semibold text-yellow-400">Branch</div>
                <div>36/23/12/B, DRS Complex</div>
                <div>Chuttugunta Main Road, Sitharampuram</div>
                <div>Vijayawada - 520004</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright and Social Media */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-700">
        <span className="text-sm text-gray-500 text-center sm:text-left">© 2025 <span className="font-serif ">De Wedding Factory</span>. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="https://wa.me/917386048000" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/designbyhasin" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaPinterest className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
