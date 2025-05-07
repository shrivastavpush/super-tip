'use client'

import React, { useState, useEffect } from 'react'
import LoginButton from './LoginButton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import logo from '../public/logo.svg'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  // Memoized handlers for menu
  const handleMenuToggle = React.useCallback(() => setMenuOpen((open) => !open), []);
  const handleMenuClose = React.useCallback(() => setMenuOpen(false), []);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  const navList = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`flex justify-between items-center py-2 px-6 rounded-full h-16 mx-auto fixed top-10 z-50 left-0 right-0 transition-all duration-800 backdrop-blur-sm border ${scrolled
        ? 'bg-green-200/50 border-green-200/50 shadow-sm w-[75%]'
        : 'bg-white border-gray-200/50 shadow-none w-[90%]'
        }`}
    >
      {/* Logo */}
      <Image src={logo} alt="Logo" width={100} height={20} onClick={() => router.push("/")} className='cursor-pointer' />

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className='flex gap-4 text-sm'>
          {navList.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className='text-md font-medium tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-300'>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Login Button */}
      <div className="hidden md:block">
        <LoginButton
          variant="outline"
          name="Sign In"
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
      </div>

      {/* Hamburger Icon (Mobile Only) */}
      <button
        ref={buttonRef}
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={handleMenuToggle}
      >
        <svg
          className="w-7 h-7 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="menu"
          aria-label="Mobile Navigation"
          className="md:hidden absolute top-16 right-4 left-4 bg-white/90 backdrop-blur-sm border border-green-100 rounded-lg shadow-lg py-4 px-6 flex flex-col items-center animate-fade-in z-20"
        >
          <ul className='flex flex-col gap-4 w-full'>
            {navList.map((item) => (
              <li key={item.name} className="w-full">
                <Link
                  href={item.href}
                  className='block w-full text-md font-medium tracking-wide text-gray-700 hover:text-green-600 py-2 px-2 rounded transition-all duration-200 text-center'
                  onClick={handleMenuClose}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar