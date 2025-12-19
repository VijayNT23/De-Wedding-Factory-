import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import weddingHeroImage from "../assets/images/wedding-hero.jpg";
import {
  Compass,
  MapPin,
  Users,
  Scale,
  Palette,
  Shirt,
  UtensilsCrossed,
  Camera,
  Music,
  BookOpen,
  Plane,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Compass,
    title: "Pre-Wedding Planning & Conceptualization",
    description:
      "Transform your vision into reality with comprehensive planning and creative conceptualization tailored to your unique story",
    highlights: [
      "Personalized consultation",
      "Timeline creation",
      "Budget management",
      "Vision board development",
    ],
  },
  {
    icon: MapPin,
    title: "Venue Selection & Destination Management",
    description:
      "Discover and secure the perfect venue for your celebration, from royal palaces to pristine beaches across India",
    highlights: [
      "Site visits & evaluations",
      "Contract negotiations",
      "Destination coordination",
      "Venue styling consultation",
    ],
  },
  {
    icon: Users,
    title: "Guest Hospitality & Travel Assistance",
    description:
      "Ensure seamless experiences for your guests from arrival to departure with comprehensive hospitality services",
    highlights: [
      "Travel coordination",
      "Accommodation booking",
      "Welcome packages",
      "Local experience curation",
    ],
  },
  {
    icon: Scale,
    title: "Legal Assistance",
    description:
      "Navigate legal requirements effortlessly for destination weddings in India with expert guidance and support",
    highlights: [
      "Documentation guidance",
      "Visa assistance",
      "Legal compliance",
      "Registration support",
    ],
  },
  {
    icon: Palette,
    title: "Décor & Design",
    description:
      "Breathtaking aesthetics that blend cultural traditions with contemporary elegance, from traditional to modern themes",
    highlights: [
      "Custom design concepts",
      "Floral arrangements",
      "Lighting design",
      "Installation management",
    ],
  },
  {
    icon: Shirt,
    title: "Attire & Styling",
    description:
      "Curated fashion experiences featuring Indian and international couture with personalized styling services",
    highlights: [
      "Designer connections",
      "Personal styling",
      "Outfit coordination",
      "Fittings & alterations",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Catering",
    description:
      "Exquisite culinary experiences with multicuisine options and curated fine dining menus that delight every palate",
    highlights: [
      "Menu customization",
      "Tasting sessions",
      "Dietary accommodations",
      "Live cooking stations",
    ],
  },
  {
    icon: Camera,
    title: "Photography & Cinematography",
    description:
      "Capture every precious moment with world-class photography and cinematic videography that tells your story",
    highlights: [
      "Pre-wedding shoots",
      "Candid photography",
      "Cinematic films",
      "Drone coverage",
    ],
  },
  {
    icon: Music,
    title: "Entertainment & Performances",
    description:
      "Unforgettable entertainment from traditional cultural performers to international artists and celebrity acts",
    highlights: [
      "Live bands & DJs",
      "Cultural performances",
      "Celebrity artists",
      "Choreography services",
    ],
  },
  {
    icon: BookOpen,
    title: "Ritual & Cultural Guidance",
    description:
      "Honor traditions with expert guidance on ceremonies, rituals, and cultural practices from experienced consultants",
    highlights: [
      "Ceremony coordination",
      "Priest arrangements",
      "Cultural consultants",
      "Ritual planning",
    ],
  },
  {
    icon: Plane,
    title: "Honeymoon Planning",
    description:
      "Begin your journey together with perfectly curated romantic getaways to dream destinations around the world",
    highlights: [
      "Destination selection",
      "Luxury accommodations",
      "Experience curation",
      "Travel arrangements",
    ],
  },
];

const Services: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

      const serviceCards = gsap.utils.toArray(".service-card");
      serviceCards.forEach((card: any) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        ".section-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
          },
          stagger: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="Luxury Wedding Planning Services Vizag | Traditional Indian Weddings"
        description="Expert wedding planning services in Vizag for international couples. Traditional Indian weddings, destination ceremonies, and luxury celebrations across India. Complete wedding coordination and management."
        keywords="wedding planning vizag, indian wedding planners, traditional wedding ceremonies, destination weddings india, luxury wedding services, wedding coordination vizag, international couples wedding, royal wedding planners"
        canonical="https://deweddingfactory.com/wedding"
      />
      <section className="relative h-screen overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img
            src={weddingHeroImage}
            alt="Luxury Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6"
        >
          <div className="text-center max-w-5xl">
            <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">
              Comprehensive
              <br />
              <span className="italic text-gray-200">Services</span>
            </h1>

            <motion.div
              className="w-24 h-px bg-white mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <p className="text-xl md:text-2xl font-light text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              From conceptualization to execution, every detail meticulously
              crafted for your perfect celebration
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-title text-5xl md:text-7xl font-serif mb-6">
              Complete Wedding Solutions
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Our comprehensive suite of services ensures every aspect of your
              celebration exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12" ref={servicesRef}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="service-card group relative bg-white p-6 md:p-10 border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="flex items-start gap-6 mb-6">
                    <div className="hidden md:block p-4 bg-black text-white group-hover:bg-gray-900 transition-colors duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-serif mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 ml-0 md:ml-24">
                    {service.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-700 font-light text-sm md:text-base"
                      >
                        <CheckCircle2 className="w-5 h-5 text-black" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 ml-0 md:ml-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-black font-light tracking-wide hover:gap-3 transition-all duration-300 text-sm md:text-base"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Our Process
              <br />
              <span className="italic text-gray-600">Simple & Seamless</span>
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Share your vision and let us understand your unique story",
              },
              {
                step: "02",
                title: "Design",
                desc: "We craft a comprehensive plan tailored to your dreams",
              },
              {
                step: "03",
                title: "Delivery",
                desc: "Experience flawless execution on your special day",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 border border-gray-200 hover:border-black transition-colors duration-500"
              >
                <div className="text-6xl font-light text-gray-300 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-6xl md:text-8xl font-serif mb-12">
              Let's Create
              <br />
              <span className="italic text-gray-600">Something Extraordinary</span>
            </h3>

            <motion.div
              className="w-24 h-px bg-black mx-auto mb-12"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="text-xl text-gray-600 font-light mb-16 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Our team of experts is ready to bring your vision to life with
              unparalleled attention to detail and creativity
            </motion.p>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500"
            >
              <span className="relative z-10 uppercase">Start Planning</span>
              <div className="relative z-10 w-12 h-px bg-white group-hover:w-16 transition-all duration-300" />
              <ArrowRight className="relative z-10 w-5 h-5" />
              <div className="absolute inset-0 bg-gray-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-32 border-t border-gray-200" />
    </div>
  );
};

export default Services;
