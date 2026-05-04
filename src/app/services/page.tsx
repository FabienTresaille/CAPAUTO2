'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './services.css';

export default function ServicesPage() {
  const [form, setForm] = useState({ nom:'', telephone:'', email:'', marque:'', modele:'', annee:'', kilometrage:'' });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: form.nom, telephone: form.telephone, email: form.email, objet: 'Achat Cash - Vente de véhicule', message: `Marque: ${form.marque}\nModèle: ${form.modele}\nAnnée: ${form.annee}\nKilométrage: ${form.kilometrage}` }),
    });
    setSent(true);
  }

  return (
    <>
      <Header />
      <div className="page-hero"><div className="container"><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Nos prestations</span><h1 className="section-title white">Nos services</h1><div className="title-line" /></div></div>

      <section className="section-pad" style={{background:'var(--gray-light)'}}>
        <div className="container">
          <div className="services-detail-grid">
            {[
              { icon: '💶', title: 'Achat Cash', desc: "Vous souhaitez vendre votre véhicule rapidement ? Cap'Auto vous propose un rachat immédiat avec paiement cash garanti sous 48h. Toutes marques, tous kilométrages." },
              { icon: '🚗', title: "Vente Véhicules d'Occasion", desc: "Une large sélection de véhicules soigneusement choisis, inspectés et garantis. Photos HD, fiches détaillées, essai possible sur rendez-vous." },
              { icon: '🔍', title: 'Sélection Soignée', desc: "Chaque annonce est vérifiée : historique, kilométrage, état mécanique et esthétique. Aucun véhicule ne rejoint notre stock sans validation complète." },
              { icon: '🚚', title: 'Livraison à Domicile', desc: "Votre futur véhicule livré directement à l'adresse de votre choix, partout en France. Véhicule propre, plein fait, documents remis." },
              { icon: '💰', title: 'Financement', desc: "Des solutions de financement adaptées à votre budget. Nous vous accompagnons dans vos démarches de crédit automobile." },
              { icon: '🛡️', title: 'Garantie', desc: "Tous nos véhicules sont vendus avec garantie mécanique. Extensions possibles jusqu'à 24 mois." },
            ].map((s, i) => (
              <div key={i} className="service-detail-card"><span className="service-detail-icon">{s.icon}</span><h3>{s.title}</h3><p>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{background:'var(--black)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'48px'}}><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Achat cash</span><h2 className="section-title white">Vendez votre véhicule</h2><div className="title-line" style={{margin:'14px auto 0'}} /></div>
          {sent ? (
            <div className="form-success">✅ Votre demande a bien été envoyée ! Nous vous recontactons sous 24h.</div>
          ) : (
            <form className="sell-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Nom complet</label><input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} placeholder="Jean Dupont" /></div>
                <div className="form-group"><label>Téléphone</label><input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} placeholder="06 00 00 00 00" /></div>
              </div>
              <div className="form-group"><label>Email</label><input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jean@email.fr" /></div>
              <div className="form-row">
                <div className="form-group"><label>Marque</label><input required value={form.marque} onChange={e => setForm({...form, marque: e.target.value})} placeholder="Peugeot" /></div>
                <div className="form-group"><label>Modèle</label><input required value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} placeholder="3008" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Année</label><input required type="number" value={form.annee} onChange={e => setForm({...form, annee: e.target.value})} placeholder="2021" /></div>
                <div className="form-group"><label>Kilométrage</label><input required type="number" value={form.kilometrage} onChange={e => setForm({...form, kilometrage: e.target.value})} placeholder="45000" /></div>
              </div>
              <button type="submit" className="btn btn-red" style={{width:'100%',justifyContent:'center'}}>Envoyer ma demande →</button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
