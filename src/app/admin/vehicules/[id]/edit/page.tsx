'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '../new/vehicule-form.css';

const MARQUES = ['Audi','BMW','Citroën','Dacia','Ford','Mercedes','Opel','Peugeot','Renault','Seat','Toyota','Volkswagen','Autre'];
const CARBURANTS = ['Essence','Diesel','Hybride','Électrique','GPL'];

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<any>(null);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`).then(r => r.json()).then(data => {
      setForm(data);
      setExistingPhotos(JSON.parse(data.photos || '[]'));
    });
  }, [id]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const f = Array.from(files);
    setNewPhotos(prev => [...prev, ...f]);
    f.forEach(file => { const r = new FileReader(); r.onload = e => setNewPreviews(prev => [...prev, e.target?.result as string]); r.readAsDataURL(file); });
  }

  function removeExisting(i: number) { setExistingPhotos(prev => prev.filter((_, idx) => idx !== i)); }
  function removeNew(i: number) { setNewPhotos(prev => prev.filter((_, idx) => idx !== i)); setNewPreviews(prev => prev.filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let uploadedPaths: string[] = [];
    if (newPhotos.length > 0) {
      const fd = new FormData();
      newPhotos.forEach(p => fd.append('photos', p));
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      uploadedPaths = data.paths || [];
    }
    const allPhotos = [...existingPhotos, ...uploadedPaths];
    await fetch(`/api/vehicles/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, photos: JSON.stringify(allPhotos) }),
    });
    router.push('/admin/dashboard');
  }

  if (!form) return <div className="admin-layout"><div className="admin-main"><p style={{color:'#bbb',textAlign:'center',padding:'80px'}}>Chargement...</p></div></div>;

  return (
    <div className="admin-layout">
      <header className="admin-header"><div className="admin-header-inner"><a href="/admin/dashboard" className="admin-logo">CAP&apos;AUT<span>O</span> <small>Admin</small></a><a href="/admin/dashboard" className="back-link">← Retour au dashboard</a></div></header>
      <main className="admin-main">
        <div className="admin-container" style={{maxWidth:'800px'}}>
          <h1 className="form-page-title">Modifier : {form.marque} {form.modele}</h1>
          <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="vf-row">
              <div className="vf-field"><label>Marque</label><select value={form.marque} onChange={e => setForm({...form, marque: e.target.value})}>{MARQUES.map(m => <option key={m}>{m}</option>)}</select></div>
              <div className="vf-field"><label>Modèle</label><input required value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} /></div>
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
              <div className="vf-field"><label>Couleur</label><input value={form.couleur} onChange={e => setForm({...form, couleur: e.target.value})} /></div>
              <div className="vf-field"><label>Puissance</label><input value={form.puissance} onChange={e => setForm({...form, puissance: e.target.value})} /></div>
            </div>
            <div className="vf-field full"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
            <div className="vf-field full"><label>Lien Leboncoin</label><input value={form.lien_leboncoin} onChange={e => setForm({...form, lien_leboncoin: e.target.value})} /></div>
            <div className="vf-field full"><label className="vf-check"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({...form, featured: e.target.checked ? 1 : 0})} /> Afficher en vedette</label></div>

            <div className="vf-field full">
              <label>Photos existantes ({existingPhotos.length})</label>
              {existingPhotos.length > 0 && (
                <div className="photo-previews">{existingPhotos.map((p, i) => (
                  <div key={i} className="photo-preview"><img src={p} alt={`Photo ${i+1}`} /><button type="button" onClick={() => removeExisting(i)}>✕</button></div>
                ))}</div>
              )}
            </div>

            <div className="vf-field full">
              <label>Ajouter des photos</label>
              <div className="photo-drop" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
                <input ref={fileRef} type="file" multiple accept="image/*" style={{display:'none'}} onChange={e => handleFiles(e.target.files)} />
                <p>📷 Cliquez ou glissez vos photos ici</p>
              </div>
              {newPreviews.length > 0 && (
                <div className="photo-previews">{newPreviews.map((p, i) => (
                  <div key={i} className="photo-preview"><img src={p} alt={`Nouvelle ${i+1}`} /><button type="button" onClick={() => removeNew(i)}>✕</button></div>
                ))}</div>
              )}
            </div>

            <button type="submit" className="btn btn-red vf-submit" disabled={saving}>{saving ? 'Enregistrement...' : 'Mettre à jour'}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
