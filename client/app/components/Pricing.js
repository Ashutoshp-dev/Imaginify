"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const pricingRef = useRef(null);

  const [qrImage, setQrImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    const ctx = gsap.context(() => {
      gsap.from(".pricing .heading", {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray(".pricing .card").forEach((card, i) => {
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
    }, pricingRef);

    return () => ctx.revert();
  }, []);

  const paytmUpi = {
    basic: { link: "upi://pay?pa=7024786596@ptaxis&pn=Ashutosh_Pandey&am=399&cu=INR", qr: "/qr-codeBasic.png" },
    pro: { link: "upi://pay?pa=7024786596@ptaxis&pn=Ashutosh_Pandey&am=899&cu=INR", qr: "/qr-codePro.png" },
    enterprise: { link: "upi://pay?pa=7024786596@ptaxis&pn=Ashutosh_Pandey&am=1999&cu=INR", qr: "/qr-codeEnt.png" },
  };

  const handlePayment = (plan) => {
    if (isMobile) {
      window.open(paytmUpi[plan].link, "_blank");
    } else {
      setQrImage(paytmUpi[plan].qr);
    }
  };

  return (
    <section
      ref={pricingRef}
      id="pricing"
      className="pricing pt-25 bg-gradient-to-bl from-indigo-900 via-blue-900 to-purple-900"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="heading text-5xl font-[HighCrush] font-bold mb-6 text-white">
          Our Plans
        </h1>
        <p className="text-white mb-12">
          Choose a plan that fits your needs. All plans include access to our API.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="card rounded-2xl border border-gray-200 shadow-md p-8 bg-white hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Basic</h2>
            <p className="text-3xl font-bold mb-2">₹399</p>
            <p className="text-gray-500 mb-6">per month</p>
            <ul className="text-gray-600 text-sm space-y-3 mb-6">
              <li>✔ 100 API requests / day</li>
              <li>✔ Access to community</li>
              <li>✔ Basic support</li>
            </ul>
            <button
              onClick={() => handlePayment("basic")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="card rounded-2xl border border-gray-200 shadow-lg p-8 bg-gradient-to-b from-blue-50 to-white hover:shadow-xl transition relative">
            <span className="absolute top-4 right-4 text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
              Popular
            </span>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Pro</h2>
            <p className="text-3xl font-bold mb-2">₹899</p>
            <p className="text-gray-500 mb-6">per month</p>
            <ul className="text-gray-600 text-sm space-y-3 mb-6">
              <li>✔ 500 API requests / day</li>
              <li>✔ Priority support</li>
              <li>✔ Access to beta features</li>
            </ul>
            <button
              onClick={() => handlePayment("pro")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Upgrade
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="card rounded-2xl border border-gray-200 shadow-md p-8 bg-white hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
            <p className="text-3xl font-bold mb-2">₹1999</p>
            <p className="text-gray-500 mb-6">per month</p>
            <ul className="text-gray-600 text-sm space-y-3 mb-6">
              <li>✔ Unlimited API requests</li>
              <li>✔ Dedicated account manager</li>
              <li>✔ 24/7 premium support</li>
            </ul>
            <button
              onClick={() => handlePayment("enterprise")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>


      {qrImage && (
        <div
          onClick={() => setQrImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
        >
          <Image src={qrImage} alt="Scan QR" width={256} height={256} className="w-64 h-64" />
        </div>
      )}
    </section>
  );
};

export default Pricing;
