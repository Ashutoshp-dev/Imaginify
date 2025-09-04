"use client";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.from(".right-col", {
        opacity: 0,
        y: 200,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
      });
      gsap.from(".left-col", {
        opacity: 0,
        x: -200,
        duration: 2,
        ease: "power2.out",
      });
    });

    return () => ctx.revert()
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse z-10"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 blur-lg animate-bounce z-10"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-15 blur-2xl animate-pulse z-10"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-25 blur-xl animate-bounce z-10"></div>
      </div>

      <div className="min-h-[90vh] flex items-center justify-center px-20 pt-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="left-col flex flex-col text-center lg:text-left space-y-4 mt-20 z-20">
            <h1 className="text-5xl lg:text-7xl font-bold pointer-events-none">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Transform your imaginations
              </span>
              <br />
              <span className="text-white">Into Art With AI</span>
            </h1>

            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              Generate stunning images with the power of AI. Create, explore, and bring your ideas to life in seconds.
            </p>
            <Link href="/CreatePost">
              <button className="px-10 py-2 text-amber-300 z-20 text-lg bg-gradient-to-r from-purple-500 to-pink-500 transform hover:scale-105 transition-all duration-300 rounded shadow-2xl hover:shadow-purple-500/50 border border-purple-400/30 min-h-[3rem] min-w-[5rem] text-stroke cursor-pointer">
                ✨Generate
              </button>
            </Link>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="right-col relative">
            <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              {/* Top Row */}
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <img
                    src="https://readdy.ai/api/search-image?query=stunning%20digital%20art%20portrait%20of%20a%20mystical%20woman%20with%20flowing%20hair%20and%20ethereal%20lighting%20against%20a%20cosmic%20background%20with%20stars%20and%20nebula%20colors&width=300&height=400&seq=hero1&orientation=portrait"
                    alt="AI Generated Art"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300">
                  <img
                    src="https://readdy.ai/api/search-image?query=beautiful%20abstract%20landscape%20with%20mountains%20and%20aurora%20borealis%20in%20vibrant%20purple%20and%20cyan%20colors%20with%20dreamy%20atmosphere%20and%20soft%20lighting&width=300&height=300&seq=hero2&orientation=squarish"
                    alt="AI Generated Landscape"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="space-y-4 mt-8">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
                  <img
                    src="https://readdy.ai/api/search-image?query=futuristic%20cityscape%20at%20night%20with%20neon%20lights%20and%20flying%20vehicles%20in%20cyberpunk%20style%20with%20purple%20and%20blue%20color%20scheme%20and%20atmospheric%20perspective&width=300&height=300&seq=hero3&orientation=squarish"
                    alt="AI Generated Cityscape"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300">
                  <img
                    src="https://readdy.ai/api/search-image?query=magical%20fantasy%20creature%20dragon%20with%20iridescent%20scales%20flying%20through%20clouds%20with%20rainbow%20colors%20and%20ethereal%20lighting%20in%20a%20dreamlike%20atmosphere&width=300&height=400&seq=hero4&orientation=portrait"
                    alt="AI Generated Fantasy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-40 blur-lg animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
