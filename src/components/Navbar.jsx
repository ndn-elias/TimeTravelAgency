import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Chronologie',  href: '#timeline' },
  { label: 'Tarifs',       href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-gold/20 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full border border-gold/60 animate-rotate-slow" />
              <div className="absolute inset-1 rounded-full border border-gold/30" />
              <div className="absolute inset-[10px] rounded-full bg-gold" />
            </div>
            <span className="font-display text-lg font-semibold text-gold-gradient tracking-widest uppercase">
              TimeTravel
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="ml-2 px-5 py-2.5 border border-gold/60 text-gold font-sans text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-gold hover:text-cosmos-900 transition-all duration-300"
            >
              Réserver
            </motion.a>
          </nav>

          {/* Burger mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : i === 0
                      ? { rotate: 45, y: 8 }
                      : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25 }}
                className="block w-6 h-px bg-cream"
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-gold/20 py-6 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream/70 hover:text-gold font-sans text-sm tracking-wider transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-block px-5 py-2.5 border border-gold/60 text-gold text-sm text-center rounded-sm"
              >
                Réserver un voyage
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
