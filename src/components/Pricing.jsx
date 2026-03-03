import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    id: 'explorer',
    name: 'Explorateur',
    subtitle: 'Votre premier saut dans le temps',
    price: { mensuel: '890', annuel: '790' },
    color: '#60a5fa',
    features: [
      '1 voyage temporel / an',
      'Destinations à risque faible uniquement',
      'Guide temporel virtuel (IA)',
      'Assurance paradoxe de base',
      'Briefing pré-voyage (2h)',
      'Support 48h',
    ],
    cta: 'Commencer',
    popular: false,
  },
  {
    id: 'chrononaute',
    name: 'Chrononaute',
    subtitle: 'L\'expérience complète',
    price: { mensuel: '1 990', annuel: '1 690' },
    color: '#c9a227',
    features: [
      '3 voyages temporels / an',
      'Toutes les époques (risque élevé inclus)',
      'Guide temporel humain dédié',
      'Assurance paradoxe Premium',
      'Briefing immersif (8h + simulation)',
      'Support prioritaire 24/7',
      'Accès archives temporelles',
      'Souvenir chronologique certifié',
    ],
    cta: 'Voyager maintenant',
    popular: true,
  },
  {
    id: 'ambassadeur',
    name: 'Ambassadeur',
    subtitle: 'Sur mesure et illimité',
    price: { mensuel: '4 900', annuel: '4 200' },
    color: '#a78bfa',
    features: [
      'Voyages illimités',
      'Destinations exclusives (sur demande)',
      'Équipe dédiée de 3 guides',
      'Assurance paradoxe Absolue',
      'Programme d\'immersion personnalisé',
      'Conciergerie temporelle permanente',
      'Accès laboratoire de recherche',
      'Rapport historique post-voyage',
    ],
    cta: 'Contacter l\'agence',
    popular: false,
  },
];

const CHECK = (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-32 px-6 bg-cosmos-800 relative overflow-hidden">
      {/* Déco */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">
            ✦ Offres & Abonnements ✦
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-cream mb-6">
            Choisissez votre <span className="text-gold-gradient">Passeport</span>
          </h2>
          <p className="font-serif text-lg italic text-cream/50 max-w-xl mx-auto mb-10">
            Chaque plan inclut la formation temporelle et l'assurance paradoxe réglementaire.
          </p>

          {/* Toggle mensuel / annuel */}
          <div className="inline-flex items-center gap-4 glass border border-gold/20 rounded-full px-6 py-3">
            <span className={`font-sans text-sm transition-colors ${!annual ? 'text-cream' : 'text-cream/40'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setAnnual((v) => !v)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: annual ? '#c9a227' : 'rgba(255,255,255,0.15)' }}
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300"
                style={{ left: annual ? '28px' : '4px' }}
              />
            </button>
            <span className={`font-sans text-sm transition-colors ${annual ? 'text-cream' : 'text-cream/40'}`}>
              Annuel
              <span className="ml-2 px-2 py-0.5 bg-gold/20 text-gold text-[10px] rounded-full font-semibold">
                −15%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.12 }}
              className="relative"
            >
              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="px-4 py-1 bg-gold text-cosmos-900 font-sans text-xs font-bold tracking-widest uppercase rounded-full">
                    ✦ Recommandé
                  </span>
                </div>
              )}

              <div
                className="h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: plan.popular ? plan.color : 'rgba(255,255,255,0.08)',
                  background: plan.popular
                    ? `linear-gradient(160deg, #0d1220 0%, ${plan.color}15 100%)`
                    : 'rgba(13,18,32,0.6)',
                  boxShadow: plan.popular ? `0 0 60px ${plan.color}20` : 'none',
                }}
              >
                {/* Header plan */}
                <div className="p-8 pb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 border"
                    style={{
                      borderColor: `${plan.color}50`,
                      background: `${plan.color}15`,
                      color: plan.color,
                    }}
                  >
                    {i === 0 ? '🌍' : i === 1 ? '⏳' : '👑'}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-cream mb-1">{plan.name}</h3>
                  <p className="font-sans text-sm text-cream/40 mb-6">{plan.subtitle}</p>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-4xl font-semibold" style={{ color: plan.color }}>
                      {annual ? plan.price.annuel : plan.price.mensuel} €
                    </span>
                    <span className="font-sans text-sm text-cream/40">/mois</span>
                  </div>
                  {annual && (
                    <p className="font-sans text-xs text-cream/30">
                      Facturé annuellement ·{' '}
                      <span style={{ color: plan.color }}>
                        Économisez {Math.round((1 - parseInt(plan.price.annuel.replace(' ', '')) / parseInt(plan.price.mensuel.replace(' ', ''))) * 100)}%
                      </span>
                    </p>
                  )}
                </div>

                {/* Séparateur */}
                <div className="h-px mx-8" style={{ background: `linear-gradient(90deg, transparent, ${plan.color}40, transparent)` }} />

                {/* Features */}
                <div className="flex-1 p-8 pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span style={{ color: plan.color }} className="mt-0.5">{CHECK}</span>
                        <span className="font-sans text-sm text-cream/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-8 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-full py-3.5 rounded-sm font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                    style={
                      plan.popular
                        ? { background: plan.color, color: '#07090f', boxShadow: `0 0 30px ${plan.color}40` }
                        : { border: `1px solid ${plan.color}60`, color: plan.color }
                    }
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note légale */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-sans text-xs text-cream/20 tracking-wider mt-12"
        >
          * Tous les prix sont exprimés en euros de 2037. TVT (Taxe sur le Voyage Temporel) incluse.
          Conformité Bureau Temporel International garantie. Sans engagement de durée — annulation par fission quantique possible.
        </motion.p>
      </div>
    </section>
  );
}
