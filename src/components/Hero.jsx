import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';

/* ── Particules d'étoiles ─────────────────────────────────── */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 3,
}));

/* ── Compteur animé ──────────────────────────────────────── */
function AnimatedCounter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return controls.stop;
  }, [to]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

/* ── CTA magnétique ──────────────────────────────────────── */
function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18 });
  const sy = useSpring(my, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    mx.set((e.clientX - cx) * 0.35);
    my.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ── Anneau orbital animé ────────────────────────────────── */
function OrbitalRing({ radius, duration, color, dotSize = 4, dash = '8 12' }) {
  const circumference = 2 * Math.PI * radius;
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 400"
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="200" cy="200" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeDasharray={dash}
        opacity="0.4"
      />
      <circle cx={200 + radius} cy="200" r={dotSize} fill={color} opacity="0.9" />
    </motion.svg>
  );
}

/* ── Composant principal ─────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef(null);

  /* Parallaxe sur mouvement souris */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 80, damping: 25 });
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 80, damping: 25 });

  const handleMouseMove = (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    mouseX.set((e.clientX / w) * 2 - 1);
    mouseY.set((e.clientY / h) * 2 - 1);
  };

  /* Variants stagger pour le texte */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 18 },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmos-900"
    >
      {/* ── Fond vortex avec parallaxe ── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Dégradé radial principal */}
        <div className="absolute inset-0 bg-vortex opacity-70" />

        {/* Halo supérieur */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 65%)' }}
        />

        {/* Halo quantique */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 65%)' }}
        />

        {/* Étoiles */}
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-cream"
            style={{
              left:   `${s.x}%`,
              top:    `${s.y}%`,
              width:  s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ── Portail temporel (anneaux orbitaux SVG) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[400px] h-[400px]">
          <OrbitalRing radius={185} duration={60} color="#c9a227" dotSize={3} dash="4 16" />
          <OrbitalRing radius={155} duration={45} color="#7c3aed" dotSize={4} dash="8 20" />
          <OrbitalRing radius={125} duration={30} color="#3b82f6" dotSize={2} dash="2 10" />

          {/* Orbe central */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,162,39,0.9) 0%, rgba(124,58,237,0.5) 60%, transparent 80%)',
              boxShadow: '0 0 60px rgba(201,162,39,0.4), 0 0 120px rgba(124,58,237,0.2)',
            }}
          />
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >

        {/* Titre principal */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-cream">Traversez</span>
          <br />
          <span className="text-gold-gradient">les Âges</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-xl md:text-2xl text-cream/60 italic max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          De l'Empire Romain aux villes futuristes — chaque voyage, une vie entière.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-sans text-sm text-cream/40 tracking-widest uppercase mb-12"
        >
          Voyages Temporels sur Mesure depuis 2037
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <MagneticButton className="group relative px-10 py-4 bg-gold text-cosmos-900 font-sans font-semibold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-all duration-300 shadow-gold hover:shadow-gold">
            <span className="relative z-10">Explorer les Destinations</span>
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </MagneticButton>

          <MagneticButton className="px-10 py-4 border border-cream/25 text-cream/70 font-sans text-sm tracking-widest uppercase rounded-sm hover:border-gold/60 hover:text-gold transition-all duration-300">
            Voir la Chronologie
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-cream/10 pt-10"
        >
          {[
            { to: 12450, suffix: '+', label: 'Voyageurs' },
            { to: 47,    suffix: '',  label: 'Époques' },
            { to: 99,    suffix: '%', label: 'Retours intacts' },
          ].map(({ to, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-gold font-semibold">
                <AnimatedCounter to={to} suffix={suffix} />
              </div>
              <div className="font-sans text-xs text-cream/40 uppercase tracking-widest mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
