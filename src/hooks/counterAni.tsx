import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const counterAni = (endValue: number, duration = 2) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      { innerText: 0 },
      {
        innerText: endValue,
        duration,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          element.innerText =
            Math.floor(Number(element.innerText)).toString() + "+";
        },
      }
    );
  }, [endValue, duration]);

  return ref;
};

export default counterAni;
