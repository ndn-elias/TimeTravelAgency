import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Questions & scoring ──────────────────────────────────── */
const QUESTIONS = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous ?',
    icon: '🧭',
    options: [
      { label: 'Culturelle et artistique', scores: { paris: 2, tokyo: 1, rome: 0 } },
      { label: 'Aventure et nature',        scores: { rome: 2, paris: 0, tokyo: 1 } },
      { label: 'Élégance et raffinement',   scores: { paris: 3, rome: 1, tokyo: 0 } },
    ],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    icon: '📅',
    options: [
      { label: 'Histoire moderne (XIXe–XXe siècle)', scores: { paris: 3, rome: 0, tokyo: 0 } },
      { label: 'Temps anciens et origines',          scores: { rome: 3, paris: 0, tokyo: 0 } },
      { label: 'Renaissance et classicisme',          scores: { rome: 1, paris: 1, tokyo: 0 } },
    ],
  },
  {
    id: 3,
    question: 'Vous préférez :',
    icon: '🌍',
    options: [
      { label: 'L\'effervescence urbaine',  scores: { tokyo: 3, paris: 1, rome: 0 } },
      { label: 'La nature sauvage',         scores: { rome: 2, tokyo: 0, paris: 0 } },
      { label: 'L\'art et l\'architecture', scores: { paris: 2, rome: 1, tokyo: 0 } },
    ],
  },
  {
    id: 4,
    question: 'Votre activité idéale :',
    icon: '✨',
    options: [
      { label: 'Visiter des monuments', scores: { rome: 3, paris: 1, tokyo: 0 } },
      { label: 'Observer la faune',     scores: { rome: 1, tokyo: 1, paris: 0 } },
      { label: 'Explorer des musées',   scores: { paris: 2, tokyo: 1, rome: 0 } },
    ],
  },
];

/* ── Résultats par destination ────────────────────────────── */
const RESULTS = {
  rome: {
    title: 'Rome Impériale',
    era: '44 av. J.-C.',
    icon: '🏛️',
    accentColor: '#e07a30',
    glowColor: 'rgba(224,122,48,0.3)',
    tagline: 'L\'aventurier de l\'Histoire',
    description:
      'Vous êtes animé par la grandeur des civilisations et le souffle de l\'Histoire. Rome Impériale (44 av. J.-C.) vous tend les bras : marchez sur le Forum Romain avant les Ides de Mars, assistez aux discours de César et vivez l\'apogée de la République romaine.',
    traits: ['Curieux', 'Aventurier', 'Passionné d\'Histoire'],
    price: '12 900 €',
    risk: 'Modéré',
  },
  paris: {
    title: 'Paris Belle Époque',
    era: '1889',
    icon: '🗼',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.3)',
    tagline: 'L\'esthète raffiné',
    description:
      'Votre âme vibre pour la beauté, l\'art et l\'élégance. Paris Belle Époque (1889) est votre destination : assistez à l\'inauguration de la Tour Eiffel aux côtés de Gustave Eiffel, savourez les cafés montmartrois et vivez la naissance de l\'Art Nouveau dans toute sa splendeur.',
    traits: ['Élégant', 'Artistique', 'Épicurien'],
    price: '9 700 €',
    risk: 'Faible',
  },
  tokyo: {
    title: 'Tokyo Néo-Future',
    era: '2157',
    icon: '🌸',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.3)',
    tagline: 'L\'explorateur du futur',
    description:
      'Vous êtes attiré par l\'innovation, la technologie et les horizons inconnus. Tokyo Néo-Future (2157) vous attend : explorez une métropole où l\'IA et l\'humanité coexistent en harmonie, avec des jardins zen flottant à 300 m d\'altitude et une gastronomie holographique inégalée.',
    traits: ['Visionnaire', 'Technophile', 'Avant-gardiste'],
    price: '18 500 €',
    risk: 'Élevé',
  },
};

/* ── Calcul du résultat ───────────────────────────────────── */
function computeResult(answers) {
  const scores = { rome: 0, paris: 0, tokyo: 0 };
  answers.forEach(({ optionIndex, questionIndex }) => {
    const opt = QUESTIONS[questionIndex].options[optionIndex];
    Object.entries(opt.scores).forEach(([dest, pts]) => {
      scores[dest] += pts;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ── Barre de progression circulaire ─────────────────────── */
function ProgressRing({ step, total }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const progress = (step / total) * circ;

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="rotate-[-90deg]">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
      <motion.circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke="#c9a227"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - progress }}
        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      />
    </svg>
  );
}

/* ── Écran résultat ───────────────────────────────────────── */
function ResultScreen({ destKey, onRetry }) {
  const dest = RESULTS[destKey];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="text-center"
    >
      {/* Halo glow derrière l'icône */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-32 h-32 rounded-full"
          style={{ background: `radial-gradient(circle, ${dest.glowColor} 0%, transparent 70%)` }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="relative text-7xl"
        >
          {dest.icon}
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-sans text-xs tracking-[0.25em] uppercase mb-3"
        style={{ color: dest.accentColor }}
      >
        Votre profil · {dest.tagline}
      </motion.p>

      {/* Titre destination */}
      <motion.h3
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-3xl md:text-4xl font-semibold text-cream mb-2"
      >
        {dest.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="font-serif italic text-cream/40 text-base mb-6"
      >
        {dest.era}
      </motion.p>

      {/* Séparateur doré */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-24 h-px mx-auto mb-6"
        style={{ background: `linear-gradient(90deg, transparent, ${dest.accentColor}, transparent)` }}
      />

      {/* Description personnalisée */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="font-sans text-sm text-cream/60 leading-relaxed max-w-lg mx-auto mb-8"
      >
        {dest.description}
      </motion.p>

      {/* Traits de personnalité */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-3 flex-wrap mb-8"
      >
        {dest.traits.map((trait) => (
          <span
            key={trait}
            className="font-sans text-xs tracking-wider px-3 py-1.5 rounded-full border"
            style={{
              color: dest.accentColor,
              borderColor: `${dest.accentColor}50`,
              background: `${dest.accentColor}12`,
            }}
          >
            {trait}
          </span>
        ))}
      </motion.div>

      {/* Infos rapides */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="inline-flex gap-8 px-8 py-4 rounded-xl mb-10 border"
        style={{ background: `${dest.accentColor}0a`, borderColor: `${dest.accentColor}25` }}
      >
        {[
          { label: 'À partir de', value: dest.price },
          { label: 'Risque', value: dest.risk },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="font-display text-lg font-semibold" style={{ color: dest.accentColor }}>
              {value}
            </div>
            <div className="font-sans text-[10px] text-cream/35 tracking-widest uppercase mt-0.5">
              {label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="px-8 py-3.5 font-sans text-sm font-semibold tracking-widest uppercase rounded-sm"
          style={{
            background: dest.accentColor,
            color: '#07090f',
            boxShadow: `0 0 30px ${dest.glowColor}`,
          }}
        >
          Réserver ce voyage →
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={onRetry}
          className="px-8 py-3.5 font-sans text-sm font-medium tracking-widest uppercase rounded-sm border border-cream/20 text-cream/50 hover:border-cream/40 hover:text-cream/80 transition-colors duration-300"
        >
          Refaire le quiz
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── Quiz principal ───────────────────────────────────────── */
export default function Quiz() {
  const [step, setStep]       = useState(0);          // 0 = intro, 1-4 = questions, 5 = résultat
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);     // option choisie pour la question courante
  const [direction, setDirection] = useState(1);      // 1 = forward, -1 = backward

  const questionIndex = step - 1;
  const currentQ      = QUESTIONS[questionIndex];
  const isIntro       = step === 0;
  const isResult      = step === QUESTIONS.length + 1;
  const resultKey     = isResult ? computeResult(answers) : null;

  const handleStart = () => {
    setDirection(1);
    setStep(1);
  };

  const handleSelect = (optIdx) => {
    setSelected(optIdx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, { questionIndex, optionIndex: selected }];
    setAnswers(newAnswers);
    setSelected(null);
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleRetry = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDirection(-1);
  };

  /* Variants de slide */
  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:  (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section id="quiz" className="py-32 px-6 bg-cosmos-900 relative overflow-hidden">
      {/* Déco de fond */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        {/* En-tête fixe section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">
            ✦ Quel Voyageur Êtes-Vous ? ✦
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-cream mb-4">
            Trouvez votre <span className="text-gold-gradient">Époque</span>
          </h2>
          <p className="font-serif italic text-cream/50 text-lg max-w-md mx-auto">
            4 questions pour révéler la destination qui vous est destinée à travers le temps.
          </p>
        </motion.div>

        {/* Carte principale du quiz */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.15 }}
          className="relative rounded-2xl border border-gold/15 overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(13,18,32,0.9) 0%, rgba(7,9,15,0.95) 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.08)',
          }}
        >
          {/* Barre de progression en haut */}
          {!isIntro && !isResult && (
            <div className="px-8 pt-8 flex items-center justify-between">
              {/* Steps visuels */}
              <div className="flex items-center gap-2">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="relative flex items-center">
                    <motion.div
                      animate={{
                        width: i < step ? '24px' : '8px',
                        background: i < step ? '#c9a227' : i === questionIndex ? '#c9a22780' : 'rgba(255,255,255,0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="h-2 rounded-full"
                    />
                  </div>
                ))}
              </div>

              {/* Compteur + anneau */}
              <div className="relative flex items-center justify-center">
                <ProgressRing step={step} total={QUESTIONS.length} />
                <span className="absolute font-display text-xs font-semibold text-cream">
                  {step}/{QUESTIONS.length}
                </span>
              </div>
            </div>
          )}

          {/* Contenu animé */}
          <div className="p-8 md:p-12 min-h-[420px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>

              {/* ── Intro ── */}
              {isIntro && (
                <motion.div
                  key="intro"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl mb-8 inline-block"
                  >
                    ⏳
                  </motion.div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream mb-4">
                    Votre Boussole Temporelle
                  </h3>
                  <p className="font-sans text-sm text-cream/50 leading-relaxed mb-10 max-w-md mx-auto">
                    En 4 questions, CHRONOS analyse votre profil de voyageur pour vous révéler l'époque à travers laquelle vous étiez destiné à voyager.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={handleStart}
                    className="px-10 py-4 bg-gold text-cosmos-900 font-sans font-semibold text-sm tracking-widest uppercase rounded-sm"
                    style={{ boxShadow: '0 0 30px rgba(201,162,39,0.35)' }}
                  >
                    Commencer le voyage →
                  </motion.button>
                </motion.div>
              )}

              {/* ── Questions ── */}
              {!isIntro && !isResult && currentQ && (
                <motion.div
                  key={`q-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                >
                  {/* Icône + Question */}
                  <div className="mb-8">
                    <span className="text-3xl mb-4 block">{currentQ.icon}</span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-cream leading-snug">
                      {currentQ.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-10">
                    {currentQ.options.map((opt, i) => {
                      const isActive = selected === i;
                      return (
                        <motion.button
                          key={i}
                          onClick={() => handleSelect(i)}
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group"
                          style={{
                            borderColor: isActive ? '#c9a227' : 'rgba(255,255,255,0.08)',
                            background: isActive
                              ? 'rgba(201,162,39,0.12)'
                              : 'rgba(255,255,255,0.02)',
                            boxShadow: isActive ? '0 0 20px rgba(201,162,39,0.15)' : 'none',
                          }}
                        >
                          {/* Indicateur */}
                          <div
                            className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
                            style={{
                              borderColor: isActive ? '#c9a227' : 'rgba(255,255,255,0.2)',
                              background: isActive ? '#c9a227' : 'transparent',
                            }}
                          >
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-cosmos-900"
                              />
                            )}
                          </div>

                          <span
                            className="font-sans text-sm transition-colors duration-200"
                            style={{ color: isActive ? '#f0e6d0' : 'rgba(240,230,208,0.55)' }}
                          >
                            {opt.label}
                          </span>

                          {/* Flèche au hover */}
                          <span
                            className="ml-auto font-sans text-xs transition-all duration-200 opacity-0 group-hover:opacity-100"
                            style={{ color: '#c9a227' }}
                          >
                            →
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Bouton Suivant */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={selected !== null ? { scale: 1.04 } : {}}
                      whileTap={selected !== null ? { scale: 0.97 } : {}}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      onClick={handleNext}
                      disabled={selected === null}
                      className="px-8 py-3 font-sans text-sm font-semibold tracking-widest uppercase rounded-sm transition-all duration-300"
                      style={{
                        background: selected !== null ? '#c9a227' : 'rgba(255,255,255,0.06)',
                        color: selected !== null ? '#07090f' : 'rgba(255,255,255,0.25)',
                        cursor: selected !== null ? 'pointer' : 'not-allowed',
                        boxShadow: selected !== null ? '0 0 20px rgba(201,162,39,0.3)' : 'none',
                      }}
                    >
                      {step < QUESTIONS.length ? 'Question suivante →' : 'Révéler ma destination →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── Résultat ── */}
              {isResult && (
                <motion.div
                  key="result"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                >
                  <ResultScreen destKey={resultKey} onRetry={handleRetry} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Ligne décorative en bas de la carte */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </motion.div>

        {/* Note sous la carte */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-sans text-xs text-cream/20 tracking-wider mt-8"
        >
          Résultats calculés par l'algorithme CHRONOS™ — précision temporelle garantie à 99,7%.
        </motion.p>
      </div>
    </section>
  );
}
