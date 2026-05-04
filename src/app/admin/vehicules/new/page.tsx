'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './vehicule-form.css';

const MARQUES = ['Audi','BMW','Citroën','Dacia','Ford','Mercedes','Opel','Peugeot','Porsche','Renault','Seat','Toyota','Volkswagen','Autre'];
const CARBURANTS = ['Essence','Diesel','Hybride','Électrique','GPL'];

export default function NewVehiclePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ marque:'Peugeot', modele:'', annee: new Date().getFullYear(), kilometrage:0, prix:0, boite:'Manuelle', carburant:'Essence', couleur:'', puissance:'', description:'', lien_leboncoin:'', featured:0 });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const newFiles = Array.from(files);
    setPhotos(prev => [...prev, ...newFiles]);
    newFiles.forEach(f => { const r = new FileReader(); r.onload = e => setPreviews(prev => [...prev, e.target?.result as string]); r.readAsDataURL(f); });
  }

  function removePhoto(i: number) {
    setPhotos(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let photoPaths: string[] = [];
    if (photos.length > 0) {
      const fd = new FormData();
      photos.forEach(p => fd.append('photos', p));
      const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
      const upData = await upRes.json();
      photoPaths = upData.paths || [];
    }
    await fetch('/api/vehicles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, photos: JSON.stringify(photoPaths), visible: 1 }),
    });
    router.push('/admin/dashboard');
  }

  return (
    <div className="admin-layout">
      <header className="admin-header"><div className="admin-header-inner"><a href="/admin/dashboard" className="admin-logo">CAP&apos;AUT<span>O</span> <small>Admin</small></a><a href="/admin/dashboard" className="back-link">← Retour au dashboard</a></div></header>
      <main className="admin-main">
        <div className="admin-container" style={{maxWidth:'800px'}}>
          <h1 className="form-page-title">Ajouter un véhicule</h1>
          <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="vf-row">
              <div className="vf-field"><label>Marque</label><select value={form.marque} onChange={e => setForm({...form, marque: e.target.value})}>{MARQUES.map(m => <option key={m}>{m}</option>)}</select></div>
              <div className="vf-field"><label>Modèle</label><input required value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} placeholder="3008 GT" /></div>
            </div>
            <div className="vf-row">
              <div className="vf-field"><label>Année</label><input required type="number" value={form.annee} onChange={e => setForm({...form, annee: +e.target.value})} /></div>
              <div className="vf-field"><label>Kilométrage</label><input required type="number" value={form.kilometrage} onChange={e => setForm({...form, kilometrage: +e.target.value})} /></div>
              <div className="vf-field"><label>Prix (€)</label><input required type="number" value={form.prix} onChange={e => setForm({...form, prix: +e.target.value})} /></div>
            </div>
            <div className="vf-row">
              <div className="vf-field"><label>Boîte</label><select value={form.boite} onChange={e => setForm({...form, boite: e.target.value})}><option>Manuelle</option><option>Automatique</option></select></div>
              <div className="vf-field"><label>Carburant</label><select value={form.carburant} onChange={e => setForm({...form, carburant: e.target.value})}>{CARBURANTS.map(c => <option key={c}>{c}</option>)}</select></div>
            </div>
            <div className="vf-row">
              <div className="vf-field"><label>Couleur</label><input value={form.couleur} onChange={e => setForm({...form, couleur: e.target.value})} placeholder="Noir Perla" /></div>
              <div className="vf-field"><label>Puissance</label><input value={form.puissance} onChange={e => setForm({...form, puissance: e.target.value})} placeholder="130 ch" /></div>
            </div>
            <div className="vf-field full"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Décrivez le véhicule..." /></div>
            <div className="vf-field full"><label>Lien Leboncoin</label><input value={form.lien_leboncoin} onChange={e => setForm({...form, lien_leboncoin: e.target.value})} placeholder="https://www.leboncoin.fr/..." /></div>
            <div className="vf-field full"><label className="vf-check"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({...form, featured: e.target.checked ? 1 : 0})} /> Afficher en vedette (slider accueil)</label></div>

            {/* Photo upload */}
            <div className="vf-field full">
              <label>Photos</label>
              <div className="photo-drop" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
                <input ref={fileRef} type="file" multiple accept="image/*" style={{display:'none'}} onChange={e => handleFiles(e.target.files)} />
                <p>📷 Cliquez ou glissez vos photos ici</p>
                <span>JPG, PNG — max 40 photos</span>
              </div>
              {previews.length > 0 && (
                <div className="photo-previews">{previews.map((p, i) => (
                  <div key={i} className="photo-preview"><img src={p} alt={`Photo ${i+1}`} /><button type="button" onClick={() => removePhoto(i)}>✕</button></div>
                ))}</div>
              )}
            </div>

            <button type="submit" className="btn btn-red vf-submit" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer le véhicule'}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
