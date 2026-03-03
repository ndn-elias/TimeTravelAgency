import React from 'react';
import { motion } from 'framer-motion';

const EVENTS = [
  {
    year: '44 av. J.-C.',
    era: 'Antiquité',
    title: 'Les Ides de Mars',
    desc: "Témoignez de l'une des nuits les plus décisives de l'histoire romaine. Marchez sur le Forum Romain avant que tout ne bascule.",
    color: '#e07a30',
    icon: '🏛️',
    side: 'left',
  },
  {
    year: '1431',
    era: 'Moyen Âge',
    title: 'Jeanne d\'Arc à Rouen',
    desc: "Assistez au procès de la Pucelle d'Orléans. Une plongée dans la foi, la politique et le courage qui a forgé la France.",
    color: '#e4c053',
    icon: '⚔️',
    side: 'right',
  },
  {
    year: '1789',
    era: 'Révolution',
    title: 'La Prise de la Bastille',
    desc: "Vivez le 14 juillet depuis les rues de Paris. L'écho du peuple français résonne encore à travers le temps.",
    color: '#60a5fa',
    icon: '🗽',
    side: 'left',
  },
  {
    year: '1889',
    era: 'Belle Époque',
    title: 'Tour Eiffel — Inauguration',
    desc: "Regardez Gustave Eiffel planter le drapeau tricolore au sommet de sa tour, sous les vivats de l'Exposition Universelle.",
    color: '#a78bfa',
    icon: '🗼',
    side: 'right',
  },
  {
    year: '1969',
    era: 'Ère Spatiale',
    title: 'Apollo 11 — La Lune',
    desc: "Regardez depuis Cap Canaveral le Saturn V s'élancer vers la Lune. \"Un petit pas pour l'homme...\" en direct.",
    color: '#34d399',
    icon: '🌕',
    side: 'left',
  },
  {
    year: '2157',
    era: 'Futur',
    title: 'Tokyo Quantique',
    desc: "Explorez la métropole la plus avancée de l'Histoire humaine : jardins zen flottants, IA conscientes et gastronomie holographique.",
    color: '#f472b6',
    icon: '🌸',
    side: 'right',
  },
];

function TimelineEvent({ event, index }) {
  const isLeft = event.side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 16, delay: index * 0.1 }}
      className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row mb-12`}
    >
      {/* Contenu (desktop: gauche ou droite | mobile: toujours à droite du fil) */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left pl-8 md:pl-0`}>
        <div
          className="inline-block px-3 py-1 rounded-full font-sans text-[10px] tracking-widest uppercase mb-3 border"
          style={{ color: event.color, borderColor: `${event.color}50`, background: `${event.color}10` }}
        >
          {event.era}
        </div>
        <div className="font-display text-sm text-cream/40 mb-1 tracking-wider">{event.year}</div>
        <h3 className="font-display text-xl md:text-2xl text-cream font-semibold mb-2">{event.title}</h3>
        <p className="font-sans text-sm text-cream/50 leading-relaxed max-w-xs md:max-w-sm">{event.desc}</p>
        <button
          className="mt-4 font-sans text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
          style={{ color: event.color }}
        >
          Explorer →
        </button>
      </div>

      {/* Nœud central */}
      <div className="absolute left-0 md:relative md:left-auto flex-shrink-0 flex flex-col items-center">
        {/* Cercle icône */}
        <motion.div
          whileInView={{ scale: [0.5, 1.1, 1] }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 + 0.2 }}
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl z-10 relative"
          style={{
            borderColor: event.color,
            background: `${event.color}15`,
            boxShadow: `0 0 20px ${event.color}40`,
          }}
        >
          {event.icon}
        </motion.div>
      </div>

      {/* Spacer droite (desktop) */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 px-6 bg-cosmos-900 relative overflow-hidden">
      {/* Déco de fond */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">
            ✦ Épopées Temporelles ✦
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-cream mb-6">
            La <span className="text-gold-gradient">Chronologie</span>
          </h2>
          <p className="font-serif text-lg italic text-cream/50 max-w-xl mx-auto">
            De l'Antiquité au futur — chaque moment de l'Histoire vous attend.
          </p>
        </motion.div>

        {/* Fil du temps */}
        <div className="relative">
          {/* Ligne verticale centrale — cachée sur mobile, visible desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          {/* Ligne verticale gauche — mobile uniquement */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <div className="space-y-0">
            {EVENTS.map((event, i) => (
              <TimelineEvent key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>

        {/* CTA bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="font-serif italic text-cream/40 mb-6">
            Et des dizaines d'autres époques accessibles sur demande...
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 border border-gold/50 text-gold font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-gold hover:text-cosmos-900 transition-all duration-300"
          >
            Voir toutes les destinations
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
