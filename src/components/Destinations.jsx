import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';

/* ── Données destinations ─────────────────────────────────── */
const DESTINATIONS = [
  {
    id: 'rome',
    era: '44 av. J.-C.',
    title: 'Rome Impériale',
    subtitle: 'Au cœur de la République',
    description:
      'Marchez sur le Forum quelques jours avant les Ides de Mars. Assistez aux discours de César et goûtez au garum frais.',
    tags: ['Histoire', 'Politique', 'Architecture'],
    price: '12 900',
    duration: '7 jours',
    risk: 'Modéré',
    accentColor: '#e07a30',
    glowColor: 'rgba(224,122,48,0.5)',
    spots: 4,
    photo: '../public/images/rome.png',
  },
  {
    id: 'paris',
    era: '1889',
    title: 'Paris Belle Époque',
    subtitle: "L'Exposition Universelle",
    description:
      "Découvrez Paris lors de l'inauguration de la Tour Eiffel. Rencontrez Gustave Eiffel et vivez la naissance de l'Art Nouveau.",
    tags: ['Art', 'Gastronomie', 'Culture'],
    price: '9 700',
    duration: '5 jours',
    risk: 'Faible',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.5)',
    spots: 8,
    photo: '../public/images/paris.png',
  },
  {
    id: 'tokyo',
    era: '2157',
    title: 'Tokyo Néo-Future',
    subtitle: 'La Métropole Quantique',
    description:
      "Explorez une Tokyo où les IA coexistent avec les humains, les jardins zen flottent à 300 m d'altitude.",
    tags: ['Futurisme', 'Technologie', 'Zen'],
    price: '18 500',
    duration: '10 jours',
    risk: 'Élevé',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.5)',
    spots: 2,
    photo: '../public/images/tokyo.png',
  },
];

/* ── Génération des images SVG thématiques ─────────────────── */
function makeSvg(id, gradColors, shapes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560">
  <defs>
    <linearGradient id="bg_${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${gradColors[0]}"/>
      <stop offset="55%"  stop-color="${gradColors[1]}"/>
      <stop offset="100%" stop-color="${gradColors[2]}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="560" fill="url(#bg_${id})"/>
  ${shapes}
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const DEST_IMAGES = {
  rome: makeSvg(
    'rome',
    ['#0e0500', '#3d1000', '#8c3408'],
    `<rect x="68"  y="210" width="14" height="240" rx="4" fill="rgba(255,175,80,0.13)"/>
     <rect x="100" y="190" width="14" height="260" rx="4" fill="rgba(255,175,80,0.17)"/>
     <rect x="134" y="190" width="14" height="260" rx="4" fill="rgba(255,175,80,0.17)"/>
     <rect x="252" y="190" width="14" height="260" rx="4" fill="rgba(255,175,80,0.17)"/>
     <rect x="286" y="190" width="14" height="260" rx="4" fill="rgba(255,175,80,0.17)"/>
     <rect x="318" y="210" width="14" height="240" rx="4" fill="rgba(255,175,80,0.13)"/>
     <rect x="62"  y="200" width="276" height="10" rx="3" fill="rgba(255,175,80,0.22)"/>
     <polygon points="62,200 200,110 338,200" fill="none" stroke="rgba(255,175,80,0.18)" stroke-width="2.5"/>
     <rect x="0" y="450" width="400" height="110" fill="rgba(0,0,0,0.25)"/>
     <rect x="0" y="448" width="400" height="4"   fill="rgba(255,175,80,0.15)"/>
     <circle cx="200" cy="155" r="60" fill="rgba(224,122,48,0.07)"/>
     <circle cx="200" cy="155" r="90" fill="rgba(224,122,48,0.04)"/>`
  ),

  paris: makeSvg(
    'paris',
    ['#050512', '#10103a', '#271b5a'],
    `<path d="M183 480 L168 365 L148 245 L158 148 L200 75 L242 148 L252 245 L232 365 L217 480 Z"
           fill="none" stroke="rgba(167,139,250,0.28)" stroke-width="1.5" stroke-linejoin="round"/>
     <line x1="168" y1="365" x2="232" y2="365" stroke="rgba(167,139,250,0.22)" stroke-width="1"/>
     <line x1="148" y1="245" x2="252" y2="245" stroke="rgba(167,139,250,0.18)" stroke-width="1"/>
     <line x1="158" y1="148" x2="242" y2="148" stroke="rgba(167,139,250,0.14)" stroke-width="1"/>
     <circle cx="200" cy="75" r="4" fill="rgba(167,139,250,0.9)"/>
     <circle cx="200" cy="75" r="12" stroke="rgba(167,139,250,0.3)" fill="none" stroke-width="1"/>
     <circle cx="80"  cy="90"  r="1.2" fill="rgba(255,255,255,0.55)"/>
     <circle cx="320" cy="65"  r="0.9" fill="rgba(255,255,255,0.45)"/>
     <circle cx="50"  cy="160" r="1"   fill="rgba(255,255,255,0.4)"/>
     <circle cx="355" cy="200" r="1.2" fill="rgba(255,255,255,0.5)"/>
     <circle cx="110" cy="310" r="0.8" fill="rgba(255,255,255,0.35)"/>
     <circle cx="340" cy="140" r="1"   fill="rgba(255,255,255,0.4)"/>
     <circle cx="60"  cy="400" r="0.8" fill="rgba(255,255,255,0.3)"/>
     <circle cx="370" cy="380" r="1"   fill="rgba(255,255,255,0.4)"/>
     <circle cx="200" cy="280" r="100" fill="rgba(167,139,250,0.05)"/>`
  ),

  tokyo: makeSvg(
    'tokyo',
    ['#000d06', '#002418', '#004d36'],
    `<circle cx="200" cy="260" r="160" stroke="rgba(52,211,153,0.10)" fill="none" stroke-width="1"/>
     <circle cx="200" cy="260" r="120" stroke="rgba(52,211,153,0.14)" fill="none" stroke-width="1"/>
     <circle cx="200" cy="260" r="80"  stroke="rgba(52,211,153,0.20)" fill="none" stroke-width="1.5"/>
     <circle cx="200" cy="260" r="40"  stroke="rgba(52,211,153,0.32)" fill="none" stroke-width="2"/>
     <circle cx="200" cy="260" r="8"   fill="rgba(52,211,153,0.85)"/>
     <circle cx="200" cy="260" r="16"  stroke="rgba(52,211,153,0.5)" fill="none" stroke-width="1.5"/>
     <line x1="0"   y1="260" x2="400" y2="260" stroke="rgba(52,211,153,0.07)" stroke-width="1"/>
     <line x1="200" y1="0"   x2="200" y2="560" stroke="rgba(52,211,153,0.07)" stroke-width="1"/>
     <line x1="0"   y1="0"   x2="400" y2="560" stroke="rgba(52,211,153,0.04)" stroke-width="0.8"/>
     <line x1="400" y1="0"   x2="0"   y2="560" stroke="rgba(52,211,153,0.04)" stroke-width="0.8"/>
     <rect x="170" y="370" width="60" height="140" rx="4" fill="rgba(52,211,153,0.07)"/>
     <rect x="130" y="410" width="40" height="100" rx="3" fill="rgba(52,211,153,0.05)"/>
     <rect x="230" y="420" width="40" height="90"  rx="3" fill="rgba(52,211,153,0.05)"/>
     <circle cx="200" cy="260" r="180" fill="rgba(52,211,153,0.03)"/>`
  ),
};

/* ── Overlay contenu de la card ───────────────────────────── */
function CardOverlay({ dest }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '28px',
        background:
          'linear-gradient(to top, rgba(7,9,15,0.97) 0%, rgba(7,9,15,0.6) 50%, transparent 100%)',
      }}
    >
      {/* Era + Spots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: dest.accentColor,
            textTransform: 'uppercase',
          }}
        >
          {dest.era}
        </span>
        {dest.spots <= 4 && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'rgba(239,68,68,0.18)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#f87171',
              letterSpacing: '0.08em',
            }}
          >
            {dest.spots} places
          </span>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {dest.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.1em',
              padding: '3px 10px',
              borderRadius: '20px',
              border: `1px solid ${dest.accentColor}45`,
              color: `${dest.accentColor}cc`,
              background: `${dest.accentColor}10`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Titre */}
      <h3
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
          fontWeight: 600,
          color: '#f0e6d0',
          marginBottom: '4px',
          lineHeight: 1.15,
        }}
      >
        {dest.title}
      </h3>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '13px',
          color: 'rgba(240,230,208,0.45)',
          marginBottom: '10px',
        }}
      >
        {dest.subtitle}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '12px',
          color: 'rgba(240,230,208,0.55)',
          lineHeight: 1.6,
          marginBottom: '20px',
        }}
      >
        {dest.description}
      </p>

      {/* Prix + CTA */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              color: dest.accentColor,
              lineHeight: 1,
            }}
          >
            {dest.price} €
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              color: 'rgba(240,230,208,0.35)',
              letterSpacing: '0.1em',
              marginTop: '4px',
            }}
          >
            {dest.duration} · Risque {dest.risk}
          </div>
        </div>

        <button
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            background: dest.accentColor,
            color: '#07090f',
            boxShadow: `0 0 24px ${dest.glowColor}`,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Réserver →
        </button>
      </div>
    </div>
  );
}

/* ── Section principale ───────────────────────────────────── */
export default function Destinations() {
  return (
    <section id="destinations" className="py-32 px-6 bg-cosmos-800 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">
            ✦ Destinations Sélectionnées ✦
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-cream mb-6">
            Choisissez votre <span className="text-gold-gradient">Époque</span>
          </h2>
          <p className="font-serif text-lg italic text-cream/50 max-w-xl mx-auto">
            Chaque destination calibrée pour une immersion totale, sans paradoxe temporel garanti.
          </p>
        </motion.div>

        {/* Grille TiltedCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.14 }}
              className="flex justify-center"
            >
              <TiltedCard
                imageSrc={dest.photo ?? DEST_IMAGES[dest.id]}
                altText={dest.title}
                captionText={`${dest.era} — ${dest.title}`}
                containerHeight="560px"
                containerWidth="100%"
                imageHeight="560px"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<CardOverlay dest={dest} />}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-sans text-xs text-cream/25 tracking-wider mt-14"
        >
          * Prix en euros 2037. Assurance temporelle incluse. Permis de voyage historique requis.
        </motion.p>
      </div>
    </section>
  );
}
