'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './contact.css';

const CHIPS = ['Achat cash','Visite du stock','Vendre ma voiture','Recherche personnalisée','Demande de financement'];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const sujetParam = searchParams.get('sujet') || '';
  const [form, setForm] = useState({ nom:'', telephone:'', email:'', objet: sujetParam || 'Achat d\'un véhicule', message: '' });
  const [sent, setSent] = useState(false);

  function fillMsg(chip: string) {
    const msgs: Record<string,string> = {
      'Achat cash': 'Bonjour, je souhaite acheter un véhicule cash.',
      'Visite du stock': 'Bonjour, je souhaite visiter votre stock de véhicules.',
      'Vendre ma voiture': 'Bonjour, je souhaite vendre mon véhicule.',
      'Recherche personnalisée': 'Bonjour, je recherche un véhicule précis.',
      'Demande de financement': 'Bonjour, je souhaite connaître vos solutions de financement.',
    };
    setForm({ ...form, message: msgs[chip] || chip });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSent(true);
  }

  return (
    <>
      <Header />
      <div className="page-hero"><div className="container"><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Parlons-en</span><h1 className="section-title white">Contactez-nous</h1><div className="title-line" /></div></div>
      <section className="section-pad" style={{background:'var(--black2)'}}>
        <div className="container">
          <div className="contact-grid">
            {sent ? (
              <div className="form-success">✅ Votre message a bien été envoyé ! Nous vous répondons sous 24h.</div>
            ) : (
              <div className="form-card">
                <div className="form-chips">
                  {CHIPS.map(c => <span key={c} className="chip" onClick={() => fillMsg(c)}>{c}</span>)}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>Nom complet</label><input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} placeholder="Jean Dupont" /></div>
                    <div className="form-group"><label>Téléphone</label><input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} placeholder="06 00 00 00 00" /></div>
                  </div>
                  <div className="form-group"><label>Adresse email</label><input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jean@email.fr" /></div>
                  <div className="form-group"><label>Objet</label>
                    <select value={form.objet} onChange={e => setForm({...form, objet: e.target.value})}>
                      <option>Achat d&apos;un véhicule</option><option>Vente de mon véhicule</option><option>Visite du stock</option><option>Demande de financement</option><option>Recherche personnalisée</option><option>Autre</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message</label><textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Décrivez votre demande..." /></div>
                  <button type="submit" className="btn btn-red" style={{width:'100%',justifyContent:'center'}}>Envoyer mon message →</button>
                </form>
              </div>
            )}
            <div className="contact-info">
              <div className="info-item"><div className="info-icon">📍</div><div><div className="info-label">Adresse</div><div className="info-value">Votre adresse, Ville (00000)</div></div></div>
              <div className="info-item"><div className="info-icon">📞</div><div><div className="info-label">Téléphone</div><div className="info-value"><a href="tel:+33600000000">06 00 00 00 00</a></div></div></div>
              <div className="info-item"><div className="info-icon">✉️</div><div><div className="info-label">Email</div><div className="info-value"><a href="mailto:contact@capauto.fr">contact@capauto.fr</a></div></div></div>
              <div className="info-item"><div className="info-icon">🕐</div><div><div className="info-label">Horaires</div><div className="hours-table"><span className="hours-day">Lun – Ven</span><span className="hours-time">09h – 18h</span><span className="hours-day">Samedi</span><span className="hours-time">09h – 12h</span><span className="hours-day">Dimanche</span><span className="hours-time closed">Fermé</span></div></div></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
