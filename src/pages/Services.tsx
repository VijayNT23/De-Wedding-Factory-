import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Sparkles,
  MapPin,
  Users,
  Scale,
  Palette,
  Shirt,
  UtensilsCrossed,
  Camera,
  Music,
  Heart,
  Plane,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import servicesHeroImage from "../assets/images/services-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: "Pre-Wedding Planning & Conceptualization",
    description:
      "Transform your vision into reality with comprehensive planning sessions, mood boards, and detailed timelines tailored to your unique love story.",
    features: [
      "Personalized consultation",
      "Theme development",
      "Budget planning",
      "Timeline creation",
    ],
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg",
  },
  {
    icon: MapPin,
    title: "Venue Selection & Destination Management",
    description:
      "Access India's most exclusive venues from royal palaces to beachfront resorts. We handle every logistics detail for your dream destination.",
    features: [
      "Curated venue options",
      "Site visits",
      "Contract negotiation",
      "On-site coordination",
    ],
    image:
      "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg",
  },
  {
    icon: Users,
    title: "Guest Hospitality & Travel Assistance",
    description:
      "Ensure your international guests experience seamless travel and exceptional hospitality from arrival to departure.",
    features: [
      "Airport transfers",
      "Accommodation booking",
      "Welcome packages",
      "Concierge services",
    ],
    image:
      "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
  },
  {
    icon: Scale,
    title: "Legal Assistance",
    description:
      "Navigate Indian wedding legalities with ease. We provide expert guidance on documentation, permits, and requirements for foreign couples.",
    features: [
      "Documentation support",
      "Legal consultation",
      "Marriage registration",
      "Visa assistance",
    ],
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
  },
  {
    icon: Palette,
    title: "Décor & Design",
    description:
      "Award-winning designers create breathtaking environments that blend traditional Indian aesthetics with contemporary luxury.",
    features: [
      "Custom design concepts",
      "Floral arrangements",
      "Lighting design",
      "Stage & mandap creation",
    ],
    image:
      "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg",
  },
  {
    icon: Shirt,
    title: "Attire & Styling",
    description:
      "Connect with India's finest designers for bespoke wedding attire, from traditional lehengas to contemporary fusion ensembles.",
    features: [
      "Designer consultations",
      "Personal shopping",
      "Fittings & alterations",
      "Complete styling",
    ],
    image:
      "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering",
    description:
      "Curated culinary experiences featuring authentic Indian cuisine, international favorites, and innovative fusion menus.",
    features: [
      "Multicuisine options",
      "Menu tasting",
      "Dietary accommodations",
      "Fine dining experiences",
    ],
    image:
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
  },
  {
    icon: Camera,
    title: "Photography & Cinematography",
    description:
      "Award-winning photographers and cinematographers capture every emotion and detail in stunning 4K quality.",
    features: [
      "Pre-wedding shoots",
      "4K video production",
      "Drone coverage",
      "Same-day edits",
    ],
    image:
      "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg",
  },
  {
    icon: Music,
    title: "Entertainment & Performances",
    description:
      "Curated entertainment from classical Indian performances to international DJs, creating unforgettable celebration moments.",
    features: [
      "Live bands",
      "Traditional dancers",
      "Celebrity performances",
      "DJ services",
    ],
    image:
      "https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg",
  },
  {
    icon: Heart,
    title: "Ritual & Cultural Guidance",
    description:
      "Expert guidance on traditional Hindu, Sikh, Muslim, and regional ceremonies, explained beautifully for international guests.",
    features: [
      "Ceremony planning",
      "Priest coordination",
      "Cultural education",
      "Ritual arrangement",
    ],
    image:
      "https://images.pexels.com/photos/3391373/pexels-photo-3391373.jpeg",
  },
  {
    icon: Plane,
    title: "Honeymoon Planning",
    description:
      "Extend your celebration with curated honeymoon experiences across India's most romantic destinations.",
    features: [
      "Destination selection",
      "Luxury accommodations",
      "Experience planning",
      "Complete coordination",
    ],
    image:
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
  },
];

const Services: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 150, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      gsap.to(".hero-bg", {
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
      serviceCards.forEach((card: any, index) => {
        const isEven = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isEven ? -150 : 150,
            y: 100,
            opacity: 0,
            rotateY: isEven ? -25 : 25,
            scale: 0.8,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1.5,
            },
          }
        );

        const cardImage = card.querySelector(".service-image");
        if (cardImage) {
          gsap.fromTo(
            cardImage,
            { scale: 1.3, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              },
            }
          );
        }
      });

      const processSteps = gsap.utils.toArray(".process-step");
      processSteps.forEach((step: any, index) => {
        gsap.fromTo(
          step,
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".section-header",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".cta-section",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="Wedding Services | Complete Wedding Planning | De Wedding Factory"
        description="Comprehensive wedding planning services in India. From venue selection to catering, photography, and coordination - we handle every detail of your perfect wedding day."
        keywords="wedding planning services, wedding coordination, venue selection, wedding catering, wedding photography, wedding planning packages"
        canonical="https://deweddingfactory.com/services"
      />
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <div className="hero-bg absolute inset-0 w-full h-full">
          <img
            src={servicesHeroImage}
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="hero-title relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
           
            
            
          </div>

          <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">
            Everything You Need
            <br />
            <span className="italic text-gray-300">In One Place</span>
            
          </h1>
          

         
        </div>

        
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="section-header text-center">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">
              Our Services
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              A complete suite of luxury wedding services designed to create
              seamless, unforgettable celebrations
            </p>
          </div>
        </div>

        <div ref={servicesGridRef} className="max-w-7xl mx-auto space-y-16 md:space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="service-card"
                style={{ perspective: "2000px" }}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={!isEven ? "lg:col-start-2" : ""}>
                    <div className="flex items-start gap-6 mb-6">
                      <div className="hidden md:block p-5 bg-black text-white flex-shrink-0">
                        <Icon className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-4xl font-serif mb-4 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="ml-0 md:ml-24 space-y-4">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 text-gray-700 font-light"
                        >
                          <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
                          <span className="text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="relative h-[300px] md:h-[500px] overflow-hidden border border-black/10">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-image w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-white/40" />
                      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        ref={processRef}
        className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-header text-5xl md:text-7xl font-serif mb-6">
              Our Process
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              A proven methodology that ensures flawless execution
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Discovery",
                desc: "Understanding your vision, preferences, and requirements through detailed consultations",
              },
              {
                num: "02",
                title: "Planning",
                desc: "Creating comprehensive plans, timelines, and selecting perfect vendors",
              },
              {
                num: "03",
                title: "Execution",
                desc: "Managing every detail with precision, ensuring seamless coordination",
              },
              {
                num: "04",
                title: "Celebration",
                desc: "You relax and enjoy while we orchestrate your perfect day",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="process-step relative bg-white p-8 border border-black/10 hover:border-black hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute -top-6 -left-6 text-8xl font-light text-gray-200">
                  {step.num}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-3xl font-serif mb-4">{step.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="cta-section text-center">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              Ready to Begin
              <br />
              <span className="italic text-gray-400">Your Journey?</span>
            </h2>

            <div className="w-24 h-px bg-white mx-auto mb-8" />

            <p className="text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
              Let's discuss how we can bring your dream Indian wedding to life
              with our comprehensive services and expertise
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-black font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500"
              >
                <span className="relative z-10">SCHEDULE CONSULTATION</span>
                <ArrowRight className="relative z-10 w-5 h-5" />
                <div className="absolute inset-0 bg-gray-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>

             
            </div>

           
          </div>
        </div>
      </section>

      <div className="h-32 border-t border-gray-200 bg-white" />
    </div>
  );
};

export default Services;
