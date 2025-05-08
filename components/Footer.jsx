'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/Modal';

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="w-full py-5 bg-background text-foreground text-center z-10 font-sans border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around gap-2 px-4">
        <span className="text-sm">© {new Date().getFullYear()} SuperTip</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="font-semibold cursor-pointer"
        >
          Say hi to developer
        </Button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </footer>
  );
};

export default Footer;