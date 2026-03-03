import React from 'react';
import '../styles/CTA.css';

export default function CTA() {
  return (
    <section id="pricing" className="cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Transform Your Vision?</h2>
          <p>Join thousands of teams building the future with our platform</p>

          <div className="cta-stats">
            <div className="stat-item">
              <span className="stat-value">10K+</span>
              <span className="stat-text">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">99.9%</span>
              <span className="stat-text">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-text">Support</span>
            </div>
          </div>

          <div className="cta-buttons">
            <button className="btn btn-large btn-primary">Start Free Trial</button>
            <button className="btn btn-large btn-secondary">Schedule Demo</button>
          </div>

          <p className="cta-subtext">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>

        <div className="cta-visual">
          <div className="gradient-box"></div>
          <div className="floating-elements">
            <div className="element element-1"></div>
            <div className="element element-2"></div>
            <div className="element element-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
