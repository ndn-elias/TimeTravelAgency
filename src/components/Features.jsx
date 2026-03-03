import React, { useState } from 'react';
import '../styles/Features.css';

const featuresList = [
  {
    id: 1,
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized performance for seamless user experiences with sub-second load times.',
  },
  {
    id: 2,
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with international security standards.',
  },
  {
    id: 3,
    icon: '🌍',
    title: 'Global Scale',
    description: 'Deploy anywhere with our distributed infrastructure across continents.',
  },
  {
    id: 4,
    icon: '🎨',
    title: 'Design System',
    description: 'Comprehensive component library for rapid development and consistency.',
  },
  {
    id: 5,
    icon: '📊',
    title: 'Analytics',
    description: 'Real-time insights and metrics to drive data-informed decisions.',
  },
  {
    id: 6,
    icon: '🔌',
    title: 'API First',
    description: 'Flexible RESTful APIs for seamless integration with any platform.',
  },
];

export default function Features() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to build amazing products</p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card ${hoveredId === feature.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
