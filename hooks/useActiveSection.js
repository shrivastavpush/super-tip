'use client'

import { useEffect } from 'react';

export default function useActiveSection(setActiveSection, activeSection) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const banner = document.querySelector('main');
    if (!sections.length && !banner) return;
    if (banner) banner.setAttribute('data-section', 'banner');

    const handleIntersection = (entries) => {
      let bannerVisible = false;
      let newActiveSection = '';
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute('data-section') === 'banner') {
            bannerVisible = true;
          } else if (entry.target.id && !bannerVisible) {
            newActiveSection = `#${entry.target.id}`;
          }
        }
      });
      if (bannerVisible) {
        if (activeSection !== '') setActiveSection('');
      } else if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    });
    sections.forEach(section => observer.observe(section));
    if (banner) observer.observe(banner);
    return () => {
      observer.disconnect();
    };
  }, [setActiveSection, activeSection]);
}
