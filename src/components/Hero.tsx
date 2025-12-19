import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/Boat.jpg';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); 
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Indian Wedding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent"></div>
      </div>

      {/* Content */}
     <div className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center text-white w-full px-6 transition-all duration-1000 ${
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
}`}>
  <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
    Experience the Magic of <span className='italic'>India</span> .

    <span className="block  mt-2">Your Dream <span className='italic'>wedding</span> Awaits.</span>
  </h1> 
{/*         
        <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
          Experience the magic of India through bespoke wedding celebrations that blend 
          <br className="hidden md:block" />
          traditional heritage with contemporary luxury
        </p> */}
{/* 
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Services
          </a>
          <a
            href="#portfolio"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            View Portfolio
          </a>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;