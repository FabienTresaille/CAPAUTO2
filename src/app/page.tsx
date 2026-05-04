import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import './home.css';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSlider />

      {/* ═══ 3 CTA CARDS ═══ */}
      <section id="cta-cards">
        <div className="container">
          <div className="cta-grid">
            <a href="/stock" className="cta-card"><span className="cta-num">01</span><h3>J&apos;achète</h3><p>Parcourez notre sélection de véhicules d&apos;occasion soigneusement choisis et garantis.</p><span className="cta-link-text">Voir le catalogue →</span></a>
            <a href="/services" className="cta-card"><span className="cta-num">02</span><h3>Je vends</h3><p>Obtenez une estimation gratuite et vendez votre véhicule rapidement. Paiement cash immédiat.</p><span className="cta-link-text">Estimer mon véhicule →</span></a>
            <a href="/recherche" className="cta-card"><span className="cta-num">03</span><h3>Je recherche</h3><p>Décrivez le véhicule idéal et nous le trouvons pour vous. Réponse sous 24h.</p><span className="cta-link-text">Recherche personnalisée →</span></a>
          </div>
        </div>
      </section>

      {/* ═══ AVIS GOOGLE ═══ */}
      <section id="reviews" className="section-pad">
        <div className="container">
          <div style={{marginBottom:'56px'}}><span className="section-label">Avis clients</span><h2 className="section-title">Ce que disent nos clients</h2><div className="title-line" /></div>
          <div className="reviews-inner">
            <div className="reviews-score"><span className="score-num">4.9</span><div className="score-stars">★★★★★</div><div className="score-label">Note moyenne</div><div className="score-count">Basé sur 87 avis</div><div className="google-badge"><div className="google-g">G</div>Google Reviews</div></div>
            <div className="reviews-list">
              {[
                { init: 'TM', name: 'Thomas M.', date: 'Il y a 2 semaines', text: "Excellente expérience chez Cap'Auto ! Voiture livrée en parfait état. L'équipe est sérieuse et professionnelle." },
                { init: 'SL', name: 'Sophie L.', date: 'Il y a 1 mois', text: "Service impeccable de A à Z. J'ai vendu ma voiture rapidement et au prix du marché. Paiement immédiat." },
                { init: 'KB', name: 'Kevin B.', date: 'Il y a 3 semaines', text: "Recherche personnalisée pour un SUV diesel auto. En moins de 48h, ils m'avaient trouvé exactement ce que je voulais." },
                { init: 'MR', name: 'Marie R.', date: 'Il y a 2 mois', text: "La livraison à domicile est un vrai plus ! Mon véhicule est arrivé propre, avec le plein et tous les documents." },
              ].map((r, i) => (
                <div key={i} className="review-card"><div className="review-header"><div className="review-avatar">{r.init}</div><div className="review-meta"><div className="review-name">{r.name}</div><div className="review-stars">★★★★★</div></div><div className="review-date">{r.date}</div></div><div className="review-text">&quot;{r.text}&quot;</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats"><div className="container"><div className="stats-grid">
        <div className="stat-item"><span className="stat-num">500+</span><div className="stat-label">Véhicules vendus</div></div>
        <div className="stat-item"><span className="stat-num">4.9★</span><div className="stat-label">Note Google</div></div>
        <div className="stat-item"><span className="stat-num">100%</span><div className="stat-label">Clients satisfaits</div></div>
        <div className="stat-item"><span className="stat-num">24h</span><div className="stat-label">Délai de réponse</div></div>
      </div></div></section>

      {/* ═══ ENGAGEMENTS ═══ */}
      <section id="engagements" className="section-pad">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'56px'}}><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Pourquoi nous choisir</span><h2 className="section-title white">Nos engagements</h2><div className="title-line" style={{margin:'14px auto 0'}} /></div>
          <div className="eng-grid">
            {[
              { icon: '🛡️', title: 'Garantie incluse', text: "Tous nos véhicules sont vendus avec garantie. Roulez l'esprit tranquille." },
              { icon: '💰', title: 'Financement', text: "Des solutions de financement adaptées à votre budget." },
              { icon: '✅', title: 'Contrôle qualité', text: "Chaque véhicule est rigoureusement inspecté : contrôle technique, historique." },
              { icon: '🚚', title: 'Livraison domicile', text: "Votre véhicule livré directement chez vous, partout en France." },
            ].map((e, i) => (
              <div key={i} className="eng-item"><div className="eng-icon">{e.icon}</div><div className="eng-title">{e.title}</div><div className="eng-text">{e.text}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services-home" className="section-pad">
        <div className="container">
          <div style={{marginBottom:'48px'}}><span className="section-label">Ce que nous proposons</span><h2 className="section-title">Nos services</h2><div className="title-line" /></div>
          <div className="services-grid">
            {[
              { num: '01', title: 'Achat cash', desc: "Rachat immédiat avec paiement cash garanti sous 48h.", feats: ['Estimation gratuite', 'Toutes marques acceptées', 'Paiement sécurisé'] },
              { num: '02', title: "Vente de véhicules d'occasion", desc: "Large sélection de véhicules inspectés et garantis.", feats: ['Véhicules garantis', 'Photos HD détaillées', 'Essai sur RDV'] },
              { num: '03', title: 'Sélection soignée', desc: "Historique, kilométrage, état mécanique vérifiés.", feats: ['Contrôle technique à jour', 'Historique complet', 'Inspection mécanique'] },
              { num: '04', title: 'Livraison à domicile', desc: "Livré directement à votre adresse, partout en France.", feats: ['Toute la France', 'Véhicule propre, plein fait', 'Documents et clés sur place'] },
            ].map((s, i) => (
              <div key={i} className="service-card"><div className="service-icon-num">Service {s.num}</div><h3>{s.title}</h3><p>{s.desc}</p><div className="service-features">{s.feats.map((f, j) => <div key={j} className="service-feature">{f}</div>)}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT RAPIDE ═══ */}
      <section id="contact-home" className="section-pad">
        <div className="container">
          <div style={{marginBottom:'52px',textAlign:'center'}}><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Parlons-en</span><h2 className="section-title white">Contactez-nous</h2><div className="title-line" style={{margin:'14px auto 0'}} /></div>
          <div className="contact-cta-wrap">
            <p className="contact-cta-text">Un projet d&apos;achat ou de vente ? Contactez-nous pour un accompagnement personnalisé.</p>
            <a href="/contact" className="btn btn-red">Accéder au formulaire →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
