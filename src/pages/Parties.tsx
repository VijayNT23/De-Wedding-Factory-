import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Music, Sparkles, Gift, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Engagement from "../assets/Engagement.jpg";
import Sagai from "../assets/sagai.png";
import Bachelor from "../assets/Bachelor.png";
import Aniversary from "../assets/Aniversary.jpg";
import partiesHeroImage from "../assets/images/parties-hero.jpg";
import engagementPartyImage from "../assets/images/engagement-party.jpg";
import sangeetNightImage from "../assets/images/sangeet-night.jpg";
import anniversaryCelebrationImage from "../assets/images/anniversary-celebration.jpg";

// Party types data
const partyTypes = [
  {
    icon: Sparkles,
    title: "Engagement Parties",
    description: "Intimate celebrations to mark the beginning of your journey together",
    features: ["Traditional ring ceremonies", "Cultural performances", "Luxury venues", "Custom décor"],
    number: "01",
    image: Engagement,
  },
  {
    icon: Music,
    title: "Sangeet & Mehndi",
    description: "Vibrant pre-wedding celebrations filled with music, dance, and joy",
    features: ["Professional choreography", "Live music bands", "Henna artists", "Themed decorations"],
    number: "02",
    image: Sagai,
  },
  {
    icon: Gift,
    title: "Bachelor/Bachelorette",
    description: "Unforgettable last celebrations before the big day",
    features: ["Destination parties", "Adventure activities", "Luxury accommodations", "Custom experiences"],
    number: "03",
    image: Bachelor,
  },
  {
    icon: Star,
    title: "Anniversary Celebrations",
    description: "Milestone celebrations that honor your love story",
    features: ["Romantic settings", "Personalized themes", "Intimate gatherings", "Memory displays"],
    number: "04",
    image: Aniversary,
  },
];

// ScrollCard component
const ScrollCard: React.FC<{ party: (typeof partyTypes)[0]; index: number }> = ({ party, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className="mb-16 md:mb-20 lg:mb-32 last:mb-0">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
          initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-block mb-4 lg:mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-6xl lg:text-8xl font-light text-gray-200">{party.number}</span>
          </motion.div>

          <motion.h3
            className="text-2xl md:text-3xl lg:text-5xl font-serif mb-4 lg:mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {party.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 text-sm md:text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed font-light"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {party.description}
          </motion.p>

          <motion.ul
            className="space-y-3 lg:space-y-4 mb-6 lg:mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {party.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center text-gray-700 font-light text-sm lg:text-base"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="w-8 lg:w-12 h-px bg-black mr-3 lg:mr-4" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="group flex items-center gap-3 text-black font-light tracking-wide text-sm lg:text-base"
            >
              <span>Learn More</span>
              <motion.div
                className="w-8 lg:w-12 h-px bg-black"
                whileHover={{ width: 32 }}
                transition={{ duration: 0.3 }}
              />
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
          initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative aspect-square">
            <motion.div
              className="absolute inset-0 overflow-hidden border border-black/10 group"
              whileHover={{ borderColor: "rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={party.image}
                alt={party.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 border-t border-l border-black" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 border-t border-r border-black" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 border-b border-l border-black" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 border-b border-r border-black" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Horizontal Scroll component
const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleries = [
    { img: engagementPartyImage, title: "Engagement Celebration", loc: "Udaipur Palace" },
    { img: sangeetNightImage, title: "Sangeet Night", loc: "Jaipur Resort" },
    { img: anniversaryCelebrationImage, title: "Anniversary Celebration", loc: "Goa Beach Resort" },
  ];

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });
  
  // Stops at the last panel (when "Yours will be next" is fully visible)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${galleries.length * 100}%`]);

  return (
    <div ref={containerRef} className="h-[150vh] lg:h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 lg:gap-8 pl-4 lg:pl-8">
          {galleries.map((gallery, i) => (
            <motion.div
              key={i}
              className="relative w-[85vw] md:w-[60vw] lg:w-[40vw] h-[60vh] lg:h-[70vh] flex-shrink-0 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  src={gallery.img}
                  alt={gallery.title}
                  className="w-full h-full object-cover grayscale"
                  whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              </div>

              <motion.div
                className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 text-white"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl lg:text-3xl font-light mb-2 tracking-tight">{gallery.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="w-8 lg:w-12 h-px bg-white" />
                  <p className="text-gray-200 font-light text-sm lg:text-base">{gallery.loc}</p>
                </div>
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute top-2 lg:top-4 left-2 lg:left-4 w-6 lg:w-12 h-6 lg:h-12 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 w-6 lg:w-12 h-6 lg:h-12 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}

          {/* Ending Slide - Clean version */}
          <motion.div
            className="w-[85vw] md:w-[60vw] lg:w-[40vw] h-[60vh] lg:h-[70vh] flex-shrink-0 flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white text-center px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Yours will be next.
            </motion.h2>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Parties component
const Parties: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="bg-white">
      <SEO
        title="Wedding Parties & Events | Engagement, Sangeet, Reception | De Wedding Factory"
        description="Plan unforgettable wedding parties and events in India. From engagement ceremonies to sangeet nights, bachelor parties, and anniversary celebrations."
        keywords="wedding parties, engagement parties, sangeet night, bachelor party, anniversary celebration, wedding events India"
        canonical="https://deweddingfactory.com/parties"
      />
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src={partiesHeroImage}
            alt="Luxury Parties"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-6">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl mb-6 lg:mb-8">
              Luxury <span className="text-white">Parties</span>
            </h1>
          </motion.div>

          <motion.div className="w-24 h-px bg-white mx-auto mb-6 lg:mb-8" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />

          <motion.p className="text-lg md:text-xl lg:text-2xl font-light text-gray-200 tracking-wide max-w-2xl mx-auto" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            Creating unforgettable celebrations
          </motion.p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid lg:grid-cols-2 gap-6 lg:gap-16 mb-16 md:mb-20 lg:mb-32" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true, margin: "-100px" }}>
            <div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-7xl font-serif mb-6 lg:mb-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                Celebrate Every <br />
                <span className="italic">Moment </span>
              </motion.h2>
            </div>

            <div className="flex flex-col justify-end">
              <motion.div className="w-24 h-px bg-black mb-6 lg:mb-8" initial={{ width: 0 }} whileInView={{ width: 96 }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} />
              <motion.p
                className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                From intimate engagement parties to grand anniversary celebrations, we craft bespoke experiences that reflect your unique style and cultural traditions.
              </motion.p>
            </div>
          </motion.div>

          {/* Party Cards */}
          <div className="space-y-0">
            {partyTypes.map((party, index) => (
              <ScrollCard key={index} party={party} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-black text-white py-20 lg:py-32">
        <div className="px-6 mb-12 lg:mb-16">
          <motion.div className="max-w-7xl mx-auto" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-4 lg:mb-6">Gallery</h2>
            <div className="w-24 h-px bg-white" />
          </motion.div>
        </div>
        <HorizontalScroll />
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-8 lg:mb-12">
              Ready to
              <br />
              <span className="italic text-gray-600">Celebrate?</span>
            </h3>

            <motion.div className="w-24 h-px bg-black mx-auto mb-8 lg:mb-12" initial={{ width: 0 }} whileInView={{ width: 96 }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} />

            <motion.p className="text-lg lg:text-xl text-gray-600 font-light mb-12 lg:mb-16 max-w-2xl mx-auto leading-relaxed" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}>
              Let us create an unforgettable party experience that reflects your style and celebrates your special moments.
            </motion.p>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-4 px-8 lg:px-12 py-4 lg:py-6 bg-black text-white font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500 text-sm lg:text-base"
            >
              <span className="relative z-10 uppercase">Plan your party</span>
              <div className="relative z-10 w-8 lg:w-12 h-px bg-white group-hover:w-12 lg:group-hover:w-16 transition-all duration-300" />
              <ArrowRight className="relative z-10 w-4 h-4 lg:w-5 lg:h-5" />
              <div className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20 lg:h-32 border-t border-black/10" />
    </div>
  );
};

export default Parties;