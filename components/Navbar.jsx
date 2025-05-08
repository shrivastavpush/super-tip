'use client'

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import LoginButton from '@/components/LoginButton';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import useActiveSection from '@/hooks/useActiveSection';
import NavList from '@/components/Navbar/NavList';
import MobileMenu from '@/components/Navbar/MobileMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 100);
    });
  }, []);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  // Memoized handlers for menu
  const handleMenuToggle = useCallback(() => {
    setMenuOpen(prevOpen => !prevOpen);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

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

  const navList = useMemo(() => [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ], []);

  // Handle smooth scrolling
  const scrollToSection = useCallback((e, id) => {
    e?.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
      setMenuOpen(false);
    }
  }, []);

  // Use custom hook for Intersection Observer logic
  useActiveSection(setActiveSection, activeSection);

  const headerClasses = useMemo(() =>
    `flex justify-between items-center py-2 px-6 rounded-full h-16 mx-auto fixed top-10 z-50 left-0 right-0 transition-all duration-800 backdrop-blur-sm border ${scrolled
      ? 'bg-green-200/50 border-green-200/50 shadow-sm w-[75%]'
      : 'bg-white border-gray-200/50 shadow-none w-[90%]'
    }`,
    [scrolled]
  );

  return (
    <header className={headerClasses}>
      {/* Logo */}
      <Image src={logo} alt="Logo" width={100} height={20} onClick={() => router.push("/")} className='cursor-pointer' />

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <NavList navList={navList} activeSection={activeSection} scrollToSection={scrollToSection} />
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
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
        <MobileMenu
          navList={navList}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          handleMenuClose={handleMenuClose}
          menuRef={menuRef}
        />
      )}
    </header>
  )
}

export default Navbar