'use client'

import React, { useState, useEffect } from 'react'
import LoginButton from './LoginButton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import logo from '../public/logo.svg'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navList = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`flex justify-between items-center py-2 px-6 rounded-full h-16 mx-auto fixed top-10 z-50 left-0 right-0 transition-all duration-800 backdrop-blur-sm border ${scrolled
        ? 'bg-green-200/50 border-green-200/50 shadow-sm w-[75%]'
        : 'bg-white border-gray-200/50 shadow-none w-[90%]'
        }`}
    >

      <Image src={logo} alt="Logo" width={100} height={20} onClick={() => router.push("/")} className='cursor-pointer' />

      <nav>
        <ul className='flex gap-4 text-sm'>
          {navList.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className='text-md font-medium tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-300'>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <LoginButton
        variant="outline"
        name="Sign In"
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
    </header>
  )
}

export default Navbar