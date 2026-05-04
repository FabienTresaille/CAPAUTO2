'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import './dashboard.css';

interface Vehicle { id: number; marque: string; modele: string; annee: number; kilometrage: number; prix: number; boite: string; carburant: string; photos: string; featured: number; created_at: string; }

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadVehicles() {
    const res = await fetch('/api/vehicles');
    const data = await res.json();
    setVehicles(data);
    setLoading(false);
  }

  useEffect(() => { loadVehicles(); }, []);

  async function toggleFeatured(id: number, current: number) {
    await fetch(`/api/vehicles/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: current ? 0 : 1 }) });
    loadVehicles();
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce véhicule ?')) return;
    await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
    loadVehicles();
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-logo">CAP&apos;AUT<span>O</span> <small>Admin</small></div>
          <nav className="admin-nav">
            <Link href="/admin/dashboard" className="active">Véhicules</Link>
            <Link href="/admin/vehicules/new">+ Ajouter</Link>
            <Link href="/" target="_blank">Voir le site ↗</Link>
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="admin-logout">Déconnexion</button>
          </nav>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-container">
          <div className="admin-top">
            <h1>Gestion des véhicules</h1>
            <Link href="/admin/vehicules/new" className="btn btn-red">+ Ajouter un véhicule</Link>
          </div>
          <div className="admin-stat-bar">
            <div className="admin-stat"><span>{vehicles.length}</span> véhicules en stock</div>
            <div className="admin-stat"><span>{vehicles.filter(v => v.featured).length}</span> en vedette</div>
          </div>

          {loading ? <p className="admin-loading">Chargement...</p> : (
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>Véhicule</th><th>Année</th><th>Km</th><th>Prix</th><th>Boîte</th><th>Photos</th><th>Vedette</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {vehicles.map(v => {
                  const photoCount = JSON.parse(v.photos || '[]').length;
                  return (
                    <tr key={v.id}>
                      <td>#{v.id}</td>
                      <td className="td-vehicle"><strong>{v.marque}</strong> {v.modele}</td>
                      <td>{v.annee}</td>
                      <td>{v.kilometrage.toLocaleString('fr-FR')} km</td>
                      <td className="td-price">{v.prix.toLocaleString('fr-FR')} €</td>
                      <td>{v.boite}</td>
                      <td>{photoCount} 📷</td>
                      <td><button className={`feat-btn ${v.featured ? 'active' : ''}`} onClick={() => toggleFeatured(v.id, v.featured)}>★</button></td>
                      <td className="td-actions">
                        <Link href={`/admin/vehicules/${v.id}/edit`} className="act-btn edit">✏️</Link>
                        <button className="act-btn delete" onClick={() => handleDelete(v.id)}>🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
