import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import weddingHeroImage from "../assets/images/wedding-hero.jpg";
import SEO from "../components/SEO";
import aboutTeam3Image from "../assets/images/about-team3.jpg";
import aboutTeam1Image from "../assets/images/about-team1.jpg";
import aboutTeam2Image from "../assets/images/about-team2.jpg";
import {
  Award,
  Globe,
  Heart,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "Every event we create is infused with genuine passion and dedication to excellence",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in every detail, from planning to execution",
  },
  {
    icon: Globe,
    title: "Cultural Sensitivity",
    description:
      "We honor traditions while creating modern experiences that resonate globally",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description:
      "Your story is unique, and we ensure every celebration reflects your individuality",
  },
];

const team = [
  {
    name: "Priya Sharma",
    role: "Founder & Chief Visionary",
    image: aboutTeam1Image,
    bio: "With over 15 years in luxury event planning, Priya has orchestrated weddings across 30+ countries.",
  },
  {
    name: "Arjun Mehta",
    role: "Creative Director",
    image: aboutTeam2Image,
    bio: "Award-winning designer bringing artistic vision and innovative concepts to every celebration.",
  },
  {
    name: "Sophie Anderson",
    role: "International Relations",
    image: aboutTeam1Image,
    bio: "Bridging cultures with grace, Sophie ensures seamless experiences for our global clientele.",
  },
  {
    name: "Rajesh Kumar",
    role: "Operations Director",
    image: aboutTeam2Image,
    bio: "Master of logistics, ensuring flawless execution of even the most complex celebrations.",
  },
];

const milestones = [
  { year: "2010", title: "Founded", description: "Journey begins in Mumbai" },
  {
    year: "2013",
    title: "International Expansion",
    description: "First overseas clients",
  },
  {
    year: "2016",
    title: "Industry Recognition",
    description: "Best Wedding Planner Award",
  },
  {
    year: "2019",
    title: "500th Celebration",
    description: "Major milestone achieved",
  },
  {
    year: "2022",
    title: "Global Presence",
    description: "50+ countries served",
  },
  {
    year: "2024",
    title: "Innovation Leader",
    description: "Pioneering sustainable luxury",
  },
];

const achievements = [
  "Featured in Vogue Weddings India",
  "Conde Nast Top 50 Wedding Planners",
  "WeddingSutra Favorite 2020-2024",
  "Harper's Bazaar Best Luxury Events",
  "International Wedding Planner of the Year",
  "Sustainable Events Award Winner",
];

const About: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.3,
        y: 150,
      });

      gsap.fromTo(
        ".split-text-left",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".split-text-right",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%",
          },
        }
      );

      const valueCards = gsap.utils.toArray(".value-card");
      valueCards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
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
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });

      const milestoneItems = gsap.utils.toArray(".milestone-item");
      milestoneItems.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      const teamCards = gsap.utils.toArray(".team-card");
      teamCards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateX: 45,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });

      gsap.fromTo(
        ".achievement-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".achievements-grid",
            start: "top 80%",
          },
        }
      );

      gsap.utils.toArray(".section-title").forEach((title: any) => {
        gsap.fromTo(
          title,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".stats-number",
        { innerText: 0 },
        {
          innerText: (i: number, target: any) => target.getAttribute("data-value"),
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
          },
          onUpdate: function () {
            const elements = document.querySelectorAll(".stats-number");
            elements.forEach((el) => {
              const target = el as HTMLElement;
              const suffix = target.getAttribute("data-suffix") || "";
              target.innerText =
                Math.ceil(parseFloat(target.innerText)).toString() + suffix;
            });
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="About Us | De Wedding Factory | Premier Wedding Planners India"
        description="Learn about De Wedding Factory's journey in creating extraordinary weddings. Meet our passionate team of wedding planners specializing in luxury Indian weddings for international couples."
        keywords="about wedding planners, wedding planning team, luxury wedding planners India, international wedding planners, wedding planning company"
        canonical="https://deweddingfactory.com/about"
      />
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <div className="hero-image absolute inset-0 w-full h-full">
          <img
            src={weddingHeroImage}
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="hero-content relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
          
          
          </div>

          <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">
            Crafting Dreams
            <br />
            <span className="italic text-gray-200">for 14+ Years</span>
          </h1>

      
        </div>

        
      </section>

      <section ref={storyRef} className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="split-text-left">
              <h2 className="section-title text-5xl md:text-7xl font-serif mb-8">
                Our
                <br />
                <span className="italic">Journey</span>
              </h2>
              <div className="w-24 h-px bg-black mb-8" />
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
              What began as a passion project has blossomed into a premier luxury event planning company, serving couples and families from across the globe.
              </p>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                We believe that every celebration tells a story, and we're
                honored to be the ones who bring those stories to life with
                creativity, precision, and heart.
              </p>
            </div>

            <div className="split-text-right relative h-[600px]">
              <div className="absolute inset-0 border border-black/10 overflow-hidden">
                <img
                  src={aboutTeam3Image}
                  alt="Our Journey"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border-b-2 border-r-2 border-black/20" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border-t-2 border-l-2 border-black/20" />
            </div>
          </div>

          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { value: "15", suffix: "+", label: "Years Experience" },
              { value: "500", suffix: "+", label: "Events Created" },
              { value: "50", suffix: "+", label: "Countries" },
              { value: "100", suffix: "%", label: "Dedication" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 border border-black/10 hover:border-black transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-serif mb-4">
                  <span
                    className="stats-number"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </span>
                </div>
                <div className="text-gray-600 font-light tracking-wide uppercase text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-title text-5xl md:text-7xl font-serif mb-6">
              Our Values
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card group bg-white p-8 border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-500"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{value.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={timelineRef} className="py-32 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-title text-5xl md:text-7xl font-serif mb-6">
              Our Timeline
            </h2>
            <div className="w-24 h-px bg-white mx-auto mb-8" />
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              A journey of growth, passion, and countless celebrations
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden md:block" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`milestone-item relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="text-6xl font-light text-gray-600 mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-3xl font-serif mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 font-light text-lg">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-black">
                    <div className="w-6 h-6 bg-black rounded-full" />
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* <div className="text-center mb-20">
            <h2 className="section-title text-5xl md:text-7xl font-serif mb-6">
              Meet Our Team
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Passionate professionals dedicated to making your dreams come true
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card group"
                style={{ perspective: "1000px" }}
              >
                <div className="relative overflow-hidden border border-gray-200 hover:border-black transition-colors duration-500">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-serif mb-2">{member.name}</h3>
                    <div className="text-sm text-gray-500 font-light tracking-wide uppercase mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="bg-gradient-to-br from-gray-50 to-white p-12 border border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-serif mb-6">
                Awards & Recognition
              </h3>
              <div className="w-24 h-px bg-black mx-auto" />
            </div>

            <div className="achievements-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="achievement-item flex items-start gap-3 p-4 bg-white border border-gray-200 hover:border-black transition-colors duration-300"
                >
                  <Star className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-light">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
        Ready to Create
        <br />
        <span className="italic text-gray-600">Magic Together?</span>
          </h2>

          <div className="w-24 h-px bg-black mx-auto mb-8" />

          <p className="text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-gray-600">
        Whether you're planning a grand destination wedding or an intimate
        celebration, our team is ready to bring your vision to life with
        creativity, expertise, and heart.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link
          to="/contact"
          className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-black text-white font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500"
        >
          <span className="relative z-10">GET IN TOUCH</span>
          <ArrowRight className="relative z-10 w-5 h-5" />
          <div className="absolute inset-0 bg-gray-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </Link>
          </div>
        </div>
      </section> */}
      

      <div className="h-32 border-t border-gray-200 bg-white" />
    </div>
  );
};

export default About;
