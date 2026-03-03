import React from 'react';
import { motion } from 'framer-motion';

const LINKS = {
  'Explorer': ['Destinations', 'Chronologie', 'Époque sur mesure', 'Voyages de groupe'],
  'Agence':   ['Notre Histoire', 'Équipe Temporelle', 'Accréditations', 'Presse'],
  'Légal':    ['CGV Temporelles', 'Paradoxes & Responsabilité', 'RGPD 2037', 'Confidentialité'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-cosmos-900 border-t border-gold/10 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Fond déco */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="md:col-span-5"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border border-gold/50 animate-rotate-slow" />
                <div className="absolute inset-[6px] rounded-full bg-gold" />
              </div>
              <span className="font-display text-xl font-semibold text-gold-gradient tracking-widest uppercase">
                TimeTravel Agency
              </span>
            </div>

            <p className="font-serif italic text-cream/50 text-base leading-relaxed mb-6 max-w-sm">
              "Le passé est une destination, le futur est une promesse.
              Nous vous offrons les deux."
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email..."
                className="flex-1 bg-cosmos-800/60 border border-gold/20 text-cream/70 placeholder-cream/25 font-sans text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-gold text-cosmos-900 font-sans text-xs font-semibold tracking-wider uppercase rounded-sm"
              >
                S'abonner
              </motion.button>
            </div>
            <p className="font-sans text-[10px] text-cream/25 mt-2 tracking-wide">
              Bulletins temporels mensuels. Pas de spam, pas de paradoxes.
            </p>
          </motion.div>

          {/* Liens */}
          {Object.entries(LINKS).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: (i + 1) * 0.12 }}
              className="md:col-span-2"
            >
              <h4 className="font-display text-xs tracking-[0.2em] uppercase text-gold/60 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-cream/40 hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact / Réseaux */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.48 }}
            className="md:col-span-3"
          >
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-gold/60 mb-5">
              Contact
            </h4>
            <div className="space-y-3 mb-6">
              {[
                { icon: '📍', text: '15 Rue du Continuum, Paris 2037' },
                { icon: '📞', text: '+33 (0) 1 TEMPS-00' },
                { icon: '✉️', text: 'contact@timetravel.agency' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{icon}</span>
                  <span className="font-sans text-sm text-cream/40">{text}</span>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {['𝕏', 'in', '▶', '◈'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-9 h-9 border border-gold/20 rounded-sm flex items-center justify-center text-cream/40 hover:border-gold/60 hover:text-gold transition-colors text-sm font-bold"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream/25 tracking-wider">
            © {year} TimeTravel Agency. Tous droits réservés à travers le temps.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-sans text-[10px] text-cream/20 tracking-wider">
              Accrédité Bureau Temporel · Licence n°TT-2037-0042
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-[10px] text-cream/30">Continuum stable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
