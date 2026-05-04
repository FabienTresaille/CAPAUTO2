'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/VehicleCard';
import './recherche.css';

const MARQUES = ['Toutes','Audi','BMW','Citroën','Dacia','Ford','Mercedes','Opel','Peugeot','Porsche','Renault','Seat','Toyota','Volkswagen'];
const BOITES = ['Toutes','Manuelle','Automatique'];
const KM_OPTIONS = [{ label: 'Tous', value: 0 },{ label: '< 20 000 km', value: 20000 },{ label: '< 50 000 km', value: 50000 },{ label: '< 100 000 km', value: 100000 },{ label: '< 150 000 km', value: 150000 }];

export default function RecherchePage() {
  const [marque, setMarque] = useState('Toutes');
  const [boite, setBoite] = useState('Toutes');
  const [kmMax, setKmMax] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    if (marque !== 'Toutes') params.set('marque', marque);
    if (boite !== 'Toutes') params.set('boite', boite);
    if (kmMax > 0) params.set('kmMax', kmMax.toString());
    const res = await fetch(`/api/vehicles?${params}`);
    const data = await res.json();
    setResults(data);
    setSearched(true);
    setLoading(false);
  }

  return (
    <>
      <Header />
      <div className="page-hero"><div className="container"><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Sur mesure</span><h1 className="section-title white">Recherche personnalisée</h1><div className="title-line" /></div></div>
      <section className="section-pad" style={{background:'var(--gray-light)'}}>
        <div className="container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-field">
              <label>Marque</label>
              <select value={marque} onChange={e => setMarque(e.target.value)}>
                {MARQUES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="search-field">
              <label>Boîte de vitesses</label>
              <select value={boite} onChange={e => setBoite(e.target.value)}>
                {BOITES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="search-field">
              <label>Kilométrage max</label>
              <select value={kmMax} onChange={e => setKmMax(parseInt(e.target.value))}>
                {KM_OPTIONS.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-red search-btn" disabled={loading}>
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </form>
          {searched && (
            <div style={{marginTop:'48px'}}>
              <p className="stock-count">{results.length} résultat{results.length > 1 ? 's' : ''}</p>
              <div className="stock-grid">
                {results.map((v: any) => <VehicleCard key={v.id} {...v} />)}
              </div>
              {results.length === 0 && <p className="empty-msg">Aucun véhicule ne correspond à vos critères. Essayez d&apos;élargir votre recherche ou <a href="/contact" style={{color:'var(--red)'}}>contactez-nous</a>.</p>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
