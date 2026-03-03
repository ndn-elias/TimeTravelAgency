import React from 'react';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Destinations from './components/Destinations';
import Quiz         from './components/Quiz';
import Timeline     from './components/Timeline';
import Pricing      from './components/Pricing';
import Chatbot      from './components/Chatbot';
import Footer       from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-cosmos-900 grain">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Quiz />
        <Timeline />
        <Pricing />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
