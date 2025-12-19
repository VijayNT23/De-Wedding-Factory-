import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useFooterVisibility } from "../hooks/isFooterVisible";
import LogoWhite from '../assets/Logo-white.png';
import LogoBlack from '../assets/Logo-black.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 96;
  const isFooterVisible = useFooterVisibility(navbarHeight);

  

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Parties', path: '/parties' },
    { name: 'Wedding', path: '/wedding' },
    // { name: 'Entertainment', path: '/entertainment' },
    { name: 'Services', path: '/services' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  const isHomePage = location.pathname === '/';

  const navLinkClasses = (path: string) =>
    `text-[13px] uppercase font-normal transition-colors duration-300 hover:text-yellow-400 ${
      location.pathname === path
        ? 'text-yellow-400'
        : isScrolled || !isHomePage
        ? 'text-white'
        : 'text-black'
    }`;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${isFooterVisible ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
          ${isScrolled || !isHomePage ? "bg-black backdrop-blur-md" : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className={`transition-all duration-300 ${
                isMenuOpen 
                  ? 'opacity-0 invisible' 
                  : 'opacity-100 visible'
              }`}
            >
              <img 
                src={isScrolled || !isHomePage ? LogoWhite : LogoBlack} 
                alt="De Wedding Factory" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className={navLinkClasses(item.path)}>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-2xl uppercase text-[13px] font-medium hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden transition-all duration-300 relative z-50 hover:scale-110 group ${
                isMenuOpen 
                  ? 'text-white' 
                  : isScrolled || !isHomePage 
                    ? 'text-white' 
                    : 'text-black'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Animated Burger Lines */}
                <div className="relative w-6 h-4 flex flex-col justify-between">
                  <span 
                    className={`block h-0.5 w-full bg-current transition-all duration-500 ease-in-out transform origin-center ${
                      isMenuOpen 
                        ? 'rotate-45 translate-y-2.5' 
                        : 'rotate-0 translate-y-0'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-full bg-current transition-all duration-500 ease-in-out transform origin-center ${
                      isMenuOpen 
                        ? 'opacity-0 scale-0' 
                        : 'opacity-100 scale-100'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-full bg-current transition-all duration-500 ease-in-out transform origin-center ${
                      isMenuOpen 
                        ? '-rotate-45 -translate-y-2.5' 
                        : 'rotate-0 translate-y-0'
                    }`}
                  />
                </div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isMenuOpen 
                    ? 'bg-transparent scale-100' 
                    : 'bg-transparent scale-100 group-hover:bg-current/10'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm transition-all duration-500 ease-in-out z-45 lg:hidden
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center space-y-6 transition-all duration-500 ease-in-out z-50 lg:hidden
        ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}
      `}
      >
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className={`text-white text-xl uppercase font-light tracking-widest hover:text-yellow-400 transition-all duration-500 transform hover:scale-110 ${
              isMenuOpen 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{
              transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms'
            }}
          >
            {item.name}
          </Link>
        ))}

        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className={`mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-3xl uppercase text-[14px] font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-500 transform hover:scale-105 ${
            isMenuOpen 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{
            transitionDelay: isMenuOpen ? `${navItems.length * 100 + 300}ms` : '0ms'
          }}
        >
          Contact
        </Link>
      </div>
    </>
  );
};

export default Header;
