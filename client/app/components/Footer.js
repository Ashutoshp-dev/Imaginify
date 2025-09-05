"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".footer .footer-card", {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "footerRef.current",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });


      gsap.from(".footer .footer-branding", {
        opacity: 0,
        y: 60,
        duration: 2,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: "footerRef.current",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });


      gsap.from(".footer .back-to-top", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: "footerRef.current",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert()
  }, []);

  return (
    <section
      ref={footerRef}
      id="footer"
      className="footer relative flex flex-col items-center justify-center py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
    >

      <div className="footer-card flex flex-col md:flex-row w-[90%] max-w-6xl items-center justify-between rounded-2xl border border-white/20 backdrop-blur-3xl bg-white/10 p-8 shadow-2xl gap-6 hover:scale-[1.02] transition-transform duration-300">
        <div className="flex flex-col sm:flex-row text-white text-2xl font-medium">
          Developer{": "}
          <span className="text-orange-400 font-bold">Ashutosh Pandey</span>
        </div>

        <div className="flex flex-col items-center md:items-end text-white gap-3">
          <h2 className="text-lg font-semibold">Connect with me:</h2>
          <div className="flex gap-6 mt-2">

            <Link
              href="https://www.instagram.com/ashux0001/"
              target="_blank"
              className="transform hover:scale-125 hover:text-orange-400 transition-all duration-300"
            >
              <lord-icon
                src="https://cdn.lordicon.com/wgtaryar.json"
                trigger="hover"
                style={{ width: "2.5rem", height: "2.5rem" }}
              ></lord-icon>
            </Link>


            <Link
              href="https://www.linkedin.com/in/ashutoshpandey0512/"
              target="_blank"
              className="transform hover:scale-125 hover:text-orange-400 transition-all duration-300"
            >
              <lord-icon
                src="https://cdn.lordicon.com/nwqudhei.json"
                trigger="hover"
                style={{ width: "2.5rem", height: "2.5rem" }}
              ></lord-icon>
            </Link>


            <Link
              href="https://github.com/Ashutoshp-dev"
              target="_blank"
              className="transform hover:scale-125 hover:text-orange-400 transition-all duration-300"
            >
              <lord-icon
                src="https://cdn.lordicon.com/ioihllwu.json"
                trigger="hover"
                style={{ width: "2.5rem", height: "2.5rem" }}
              ></lord-icon>
            </Link>
          </div>
        </div>
      </div>


      <h1 className="footer-branding mt-12 pb-5 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-5xl md:text-8xl font-extrabold animate-gradient-x drop-shadow-xl">
        Imaginify
      </h1>

      <p className="text-white/70 mt-4 text-sm">© {new Date().getFullYear()} Imaginify. All rights reserved.</p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top absolute right-8 bottom-8 bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/40 transition"
      >
        ↑ Top
      </button>
    </section>
  );
};

export default Footer;
