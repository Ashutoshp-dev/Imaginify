"use client";
import { Sparkles, Download, Users, Scissors, Heart, Star } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const features = [
    {
      title: "AI Image Generation",
      description: "Turn your ideas into stunning visuals instantly using cutting-edge AI.",
      icon: <Sparkles className="w-10 h-10 text-purple-400" />,
    },
    {
      title: "Download in 1 Click",
      description: "Save your generated images directly to your device in high quality.",
      icon: <Download className="w-10 h-10 text-pink-400" />,
    },
    {
      title: "Community Sharing",
      description: "Share your creations with the world and explore art made by others.",
      icon: <Users className="w-10 h-10 text-cyan-400" />,
    },
    {
      title: "Remove Backgrounds",
      description: "Instantly remove backgrounds from your generated images using remove.bg.",
      icon: <Scissors className="w-10 h-10 text-indigo-400" />,
    },
    {
      title: "Like & Save",
      description: "Heart your favorite artworks and build your personal gallery.",
      icon: <Heart className="w-10 h-10 text-red-400" />,
    },
    {
      title: "Trending Creations",
      description: "Discover what’s trending in the community and get inspired.",
      icon: <Star className="w-10 h-10 text-yellow-400" />,
    },
  ];

  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.from(".features .heading", {
        opacity: 0,
        y: 80,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray(".features .feature-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert()
  }, []);

  return (
    <section
      id="features"
      className="features relative pt-25 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="heading text-4xl md:text-6xl font-bold text-white mb-6">
          Powerful Features for{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Creators
          </span>
        </h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-16">
          Everything you need to imagine, create, and share AI-powered art — all in one place.
        </p>


        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/10 hover:bg-white/20 transition-all shadow-lg group"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
