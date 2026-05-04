'use client';
import { useEffect, useRef, useState } from 'react';
import './HeroSlider.css';

interface SlideData {
  tag: string;
  title: string;
  sub: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
  bgClass: string;
}

const slides: SlideData[] = [
  { tag: 'Sélection Premium', title: 'Trouvez le véhicule de vos rêves', sub: "Des véhicules d'occasion soigneusement sélectionnés, inspectés et garantis pour votre tranquillité d'esprit.", cta1: { label: 'Voir le stock', href: '/stock' }, cta2: { label: 'En savoir plus', href: '/services' }, bgClass: 'slide-bg-1' },
  { tag: 'Qualité Certifiée', title: 'Qualité certifiée, prix maîtrisé', sub: "Chaque véhicule est rigoureusement inspecté avant mise en vente. Garantie incluse sur toutes nos annonces.", cta1: { label: 'Nos garanties', href: '/services' }, cta2: { label: 'Découvrir', href: '/stock' }, bgClass: 'slide-bg-2' },
  { tag: 'Livraison Domicile', title: 'Livraison à domicile partout en France', sub: "Votre prochain véhicule livré directement chez vous. Service disponible sur tout le territoire français.", cta1: { label: 'Nous contacter', href: '/contact' }, cta2: { label: 'Recherche personnalisée', href: '/recherche' }, bgClass: 'slide-bg-3' },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const go = (n: number) => setCurrent((n + slides.length) % slides.length);

  useEffect(() => {
    timer.current = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(timer.current);
  }, [current]);

  return (
    <section id="hero">
      {slides.map((s, i) => (
        <div key={i} className={`slide ${s.bgClass} ${i === current ? 'active' : ''}`}>
          <div className="slide-bg-layer" />
          <div className="slide-overlay" />
          <div className="slide-diagonal" />
          <div className="slide-content">
            <span className="slide-tag">{s.tag}</span>
            <h1 className="slide-title">{s.title}</h1>
            <p className="slide-sub">{s.sub}</p>
            <div className="slide-btns">
              <a href={s.cta1.href} className="btn btn-red">{s.cta1.label}</a>
              <a href={s.cta2.href} className="btn btn-outline">{s.cta2.label}</a>
            </div>
          </div>
        </div>
      ))}
      <button className="slider-arrow prev" onClick={() => { go(current - 1); clearInterval(timer.current); }}>‹</button>
      <button className="slider-arrow next" onClick={() => { go(current + 1); clearInterval(timer.current); }}>›</button>
      <div className="slider-controls">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => { go(i); clearInterval(timer.current); }} />
        ))}
      </div>
    </section>
  );
}
