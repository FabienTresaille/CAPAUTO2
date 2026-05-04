import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './confiance.css';

const temoignages = [
  { init: 'JD', name: 'Jean-David F.', loc: 'Lyon', text: "Cap'Auto a trouvé exactement le SUV que je cherchais depuis des mois. Service ultra-réactif, livraison parfaite." },
  { init: 'AC', name: 'Amélie C.', loc: 'Clermont-Ferrand', text: "J'avais une vieille Clio que je ne savais pas comment vendre. Cap'Auto l'a rachetée cash en 2 jours, au bon prix." },
  { init: 'NB', name: 'Nicolas B.', loc: 'Saint-Étienne', text: "La voiture a été livrée à domicile, propre et avec le plein. Tout était parfait, du premier contact jusqu'à la remise des clés." },
  { init: 'LP', name: 'Lucie P.', loc: 'Grenoble', text: "Financement rapide et sans surprises. L'équipe m'a accompagnée de A à Z. Je recommande à 100% !" },
  { init: 'MH', name: 'Mehdi H.', loc: 'Marseille', text: "Très sérieux. Le véhicule correspondait parfaitement à la description. Aucune mauvaise surprise à la livraison." },
  { init: 'CD', name: 'Claire D.', loc: 'Toulouse', text: "J'ai fait appel à la recherche personnalisée. En 3 jours ils m'avaient trouvé ma voiture idéale dans mon budget." },
];

const marques = ['Renault','Peugeot','Citroën','Volkswagen','BMW','Audi','Mercedes','Toyota','Ford','Opel','Dacia','Seat'];

export default function ConfiancePage() {
  return (
    <>
      <Header />
      <div className="page-hero"><div className="container"><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Références</span><h1 className="section-title white">Ils nous ont fait confiance</h1><div className="title-line" /></div></div>

      <section style={{background:'var(--black)',padding:'60px 0',overflow:'hidden'}}>
        <div className="brands-track-wrap">
          <div className="brands-track">
            {[...marques, ...marques].map((m, i) => <div key={i} className="brand-item">{m}</div>)}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{background:'var(--gray-light)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'56px'}}><span className="section-label">Témoignages</span><h2 className="section-title">Ce que disent nos clients</h2><div className="title-line" style={{margin:'14px auto 0'}} /></div>
          <div className="temoignages-grid">
            {temoignages.map((t, i) => (
              <div key={i} className="temoignage-card">
                <div className="temoignage-stars">★★★★★</div>
                <div className="temoignage-text">&quot;{t.text}&quot;</div>
                <div className="temoignage-author"><div className="temoignage-avatar">{t.init}</div><div><div className="temoignage-name">{t.name}</div><div className="temoignage-location">{t.loc}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats-conf" style={{background:'var(--red)',padding:'60px 0'}}>
        <div className="container"><div className="stats-grid">
          <div className="stat-item"><span className="stat-num">500+</span><div className="stat-label">Véhicules vendus</div></div>
          <div className="stat-item"><span className="stat-num">4.9★</span><div className="stat-label">Note Google</div></div>
          <div className="stat-item"><span className="stat-num">100%</span><div className="stat-label">Clients satisfaits</div></div>
          <div className="stat-item"><span className="stat-num">24h</span><div className="stat-label">Délai de réponse</div></div>
        </div></div>
      </section>

      <Footer />
    </>
  );
}
