'use client'

import React, { useState, useEffect } from 'react'
import LoginButton from './LoginButton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
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
    <div className={`flex justify-between items-center py-2 px-6 bg-white rounded-full h-16 mx-auto fixed top-10 z-50 left-0 right-0 transition-all duration-500 ${scrolled ? 'border border-gray-200 shadow-sm w-[80%]' : 'border-0 shadow-none w-[90%]'}`}>
      <div>
        <Image src="/logo.png" alt="Logo" width={100} height={20} onClick={() => router.push("/")} className='cursor-pointer' />
      </div>
      <div>
        <ul className='flex gap-4 text-sm'>
          {navList.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className='text-gray-600 hover:text-gray-900 cursor-pointer'>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <LoginButton />
    </div>
  )
}

export default Navbar