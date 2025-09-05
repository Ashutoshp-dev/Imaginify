"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
    if (isMenuOpen && !e.target.closest('.menu-container') && !e.target.closest('.menu-toggle')) {
      setIsMenuOpen(false);
    }
  }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <nav className='fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-full flex px-6 py-3 justify-between items-center border border-white/20 backdrop-blur-2xl bg-white/30 shadow-lg'>
      <div className='font-bold text-xl'>
        <Link href="/">
          <Image src="/logo.png" className='absolute w-40 -bottom-16 md:-bottom-18 left-5 ' alt="Imaginify Logo" width={160} height={64} style={{ width: 'auto', height: 'auto' }} />
        </Link>
      </div>
      
      <div className='hidden md:block'>
        <ul className='flex space-x-4'>
          <li className='hover:text-pink-800'>
            <Link href="/">Home</Link>
          </li>
          <li className='hover:text-pink-800'>
            <Link href="/#features">Features</Link>
          </li>
          <li className='hover:text-pink-800'>
            <Link href="/#pricing">Pricing</Link>
          </li>
          <li className='hover:text-pink-800'>
            <Link href="/CreatePost">Create</Link>
          </li>
          <li className='hover:text-pink-800'>
            <Link href="/Community">Community</Link>
          </li>
          <li className='hover:text-pink-800'>
            <Link href="/#footer">Contact</Link>
          </li>
        </ul>
      </div>
      
             <div className='block md:hidden cursor-pointer menu-toggle'>
         <svg 
           viewBox="0 0 512 512" 
           xmlns="http://www.w3.org/2000/svg" 
           className="w-10 h-10" 
           onClick={() => {handleMenuToggle()}}
         >
          <rect x="207.48" y="175.98" width="180.83" height="49.25" rx="24.62" ry="24.62" fill="none" stroke="#083b43" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="148.57" cy="203.45" r="24.88" fill="none" stroke="#083b43" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="207.48" y="283.66" width="180.83" height="49.25" rx="24.62" ry="24.62" fill="none" stroke="#083b43" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="148.57" cy="311.14" r="24.88" fill="none" stroke="#083b43" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
             {isMenuOpen && (
         <div className='absolute top-16 right-0 w-56 border border-white/20 rounded-2xl z-50 backdrop-blur-2xl bg-white/70 shadow-2xl overflow-hidden menu-container'>
           <ul className='py-3'>
             <li>
               <Link href="/" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>🏠</span>
                 <span className='text-lg'>Home</span>
               </Link>
             </li>
             <li>
               <Link href="/#features" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>✨</span>
                 <span className='text-lg'>Features</span>
               </Link>
             </li>
             <li>
               <Link href="/#pricing" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>💰</span>
                 <span className='text-lg'>Pricing</span>
               </Link>
             </li>
             <li>
               <Link href="/CreatePost" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>✨</span>
                 <span className='text-lg'>Create</span>
               </Link>
             </li>
             <li>
               <Link href="/Community" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>👥</span>
                 <span className='text-lg'>Community</span>
               </Link>
             </li>
             <li>
               <Link href="/#footer" className='flex items-center px-6 py-3 text-black font-bold hover:text-white transition-all duration-300 hover:bg-purple-500/80 group-hover:translate-x-2'>
                 <span className='mr-3 text-2xl'>📞</span>
                 <span className='text-lg'>Contact</span>
               </Link>
             </li>
           </ul>
          
        </div>
      )}
    </nav>
  )
}

export default Navbar
