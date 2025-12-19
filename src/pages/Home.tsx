import React from "react";
import Hero from "../components/Hero";
import counterAni from "../hooks/counterAni";
import FAQ from "../components/FAQ";
import EventsScroll from "../components/EventsScroll";
import BlogSection from "../components/BlogSection";
import SEO from "../components/SEO";

const Home: React.FC = () => {
  // Animated counters
  const refCelebrations = counterAni(500);
  const refCountries = counterAni(50);
  const refVenues = counterAni(25);
  const refExperience = counterAni(10);

  return (
    <div>
      <SEO
        title="De Wedding Factory | Luxury Wedding Planners India | International Couples"
        description="Premier wedding planners in India. Specializing in luxury Indian weddings for international couples. Destination weddings, traditional ceremonies, and bespoke celebrations across India."
        keywords="wedding planners india, event planners india, luxury weddings india, destination weddings india, international couples india, indian wedding planners, traditional wedding ceremonies, royal weddings india, bespoke wedding planning"
        canonical="https://deweddingfactory.com/"
      />
      <Hero />

      {/* Quick Overview Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-[40px] text-black mb-6">
            Luxury Indian Weddings for Global{" "}
            <span className="italic">Couples</span>
          </h2>

          <p className="text-md text-black max-w-4xl font-normal mx-auto mb-12 leading-relaxed">
            With us, your dream Indian wedding becomes reality. Whether a royal
            palace celebration in Rajasthan, vows by Kerala’s backwaters, or a
            vibrant beachfront ceremony in Goa, we craft every moment to capture
            India’s magic. Our team guides couples from around the world,
            managing travel, rituals, décor, and entertainment so you can simply
            enjoy the day. Every celebration is designed with{" "}
            <span className="font-medium">elegance</span> and precision,
            blending India’s rich heritage with modern touches. We create
            memories filled with <span className="font-medium">luxury</span> and
            timeless <span className="font-medium">beauty</span>.
          </p>

          {/* Stats Section with Animated Counters */}
          {/* <div className="grid py-5 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                ref={refCelebrations}
                className="text-4xl font-bold text-yellow-600 mb-2"
              >
                0
              </div>
              <div className="text-gray-600">Celebrations Planned</div>
            </div>

            <div className="text-center">
              <div
                ref={refCountries}
                className="text-4xl font-bold text-yellow-600 mb-2"
              >
                0
              </div>
              <div className="text-gray-600">Countries Served</div>
            </div>

            <div className="text-center">
              <div
                ref={refVenues}
                className="text-4xl font-bold text-yellow-600 mb-2"
              >
                0
              </div>
              <div className="text-gray-600">Luxury Venues</div>
            </div>

            <div className="text-center">
              <div
                ref={refExperience}
                className="text-4xl font-bold text-yellow-600 mb-2"
              >
                0
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div> */}
        </div>
      </section>

       <EventsScroll/>

      {/* Blog Section */}
      <BlogSection />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
