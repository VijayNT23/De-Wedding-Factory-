import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import WDN from "../assets/WDN.jpg";

gsap.registerPlugin(ScrollTrigger);

const EventsScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>(".section"));

    sections.forEach((section, index) => {
      const outer = section.querySelector<HTMLElement>(".outer")!;
      const inner = section.querySelector<HTMLElement>(".inner")!;
      const bg = section.querySelector<HTMLElement>(".bg")!;
      const heading = section.querySelector<HTMLElement>(".section-heading")!;

      // Split heading letters
      const text = (heading.textContent || "").trim();
      heading.innerHTML = text
        .split("")
        .map((ch) => `<span class="char inline-block">${ch === " " ? "&nbsp;" : ch}</span>`)
        .join("");
      const chars = Array.from(heading.querySelectorAll<HTMLElement>(".char"));

      // 🟢 Pin all except the last section
      if (index < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top", // unpin when next section reaches top
          pin: true,
          pinSpacing: false,
          scrub: true,
        });
      }

      // Outer/inner slide animation for sections after the first
      if (index > 0) {
        gsap.fromTo(
          [outer, inner],
          { yPercent: (i) => (i ? -100 : 100) },
          {
            yPercent: 0,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        // Background parallax
        gsap.fromTo(
          bg,
          { yPercent: 15 },
          {
            yPercent: 0,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        // Heading fade-in
        gsap.fromTo(
          chars,
          { autoAlpha: 0, yPercent: 150 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: { each: 0.02, from: "random" },
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "top center",
            },
          }
        );
      }

      // Click navigation
      section.addEventListener("click", () => {
        const route = section.dataset.route;
        if (route) navigate(route);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, [navigate]);

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Party Section */}
      <div
        data-route="/parties"
        className="section relative w-full h-screen flex items-center justify-center cursor-pointer"
      >
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full relative">
            <div
              className="bg absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%), url('https://images.pexels.com/photos/16120160/pexels-photo-16120160.jpeg')",
              }}
            >
              <h2 className="section-heading text-white text-6xl md:text-8xl italic font-serif tracking-tight flex items-center justify-center h-full">
                Party
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Section */}
      <div
        data-route="/wedding"
        className="section relative w-full h-screen flex items-center justify-center cursor-pointer"
      >
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full relative">
            <div
              className="bg absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%), url(${WDN})`,
              }}
            >
              <h2 className="section-heading text-white text-6xl md:text-8xl italic font-serif tracking-tight flex items-center justify-center h-full">
                Wedding
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsScroll;
