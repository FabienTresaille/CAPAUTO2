import { notFound } from 'next/navigation';
import { getVehicleById } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleGallery from './VehicleGallery';
import './vehicle-detail.css';

interface Props { params: { id: string } }

export const dynamic = 'force-dynamic';

export default function VehicleDetailPage({ params }: Props) {
  const vehicle = getVehicleById(parseInt(params.id));
  if (!vehicle) notFound();

  const photos: string[] = JSON.parse(vehicle.photos || '[]');
  const mainPhoto = photos[0] || '/placeholder-car.svg';

  return (
    <>
      <Header />
      <main id="vehicle-detail">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <a href="/">Accueil</a> <span>›</span>
            <a href="/stock">Notre Stock</a> <span>›</span>
            <span>{vehicle.marque} {vehicle.modele}</span>
          </div>
        </div>

        <div className="container vd-layout">
          {/* ── Galerie ── */}
          <div className="vd-gallery-col">
            <VehicleGallery photos={photos} vehicleName={`${vehicle.marque} ${vehicle.modele}`} />
          </div>

          {/* ── Infos & CTA ── */}
          <div className="vd-info-col">
            <div className="vd-badge-row">
              <span className="vd-badge">{vehicle.carburant}</span>
              <span className="vd-badge">{vehicle.boite}</span>
              {vehicle.featured === 1 && <span className="vd-badge vd-badge-red">★ En vedette</span>}
            </div>

            <h1 className="vd-title">{vehicle.marque} {vehicle.modele}</h1>
            <p className="vd-subtitle">{vehicle.annee} — {vehicle.couleur && <span>{vehicle.couleur}</span>}</p>

            <div className="vd-price">{vehicle.prix.toLocaleString('fr-FR')} €</div>

            {/* Specs grid */}
            <div className="vd-specs">
              <div className="vd-spec"><span className="vd-spec-icon">📅</span><span className="vd-spec-label">Année</span><span className="vd-spec-val">{vehicle.annee}</span></div>
              <div className="vd-spec"><span className="vd-spec-icon">🛣️</span><span className="vd-spec-label">Kilométrage</span><span className="vd-spec-val">{vehicle.kilometrage.toLocaleString('fr-FR')} km</span></div>
              <div className="vd-spec"><span className="vd-spec-icon">⛽</span><span className="vd-spec-label">Carburant</span><span className="vd-spec-val">{vehicle.carburant}</span></div>
              <div className="vd-spec"><span className="vd-spec-icon">⚙️</span><span className="vd-spec-label">Boîte</span><span className="vd-spec-val">{vehicle.boite}</span></div>
              {vehicle.puissance && <div className="vd-spec"><span className="vd-spec-icon">⚡</span><span className="vd-spec-label">Puissance</span><span className="vd-spec-val">{vehicle.puissance}</span></div>}
              {vehicle.couleur && <div className="vd-spec"><span className="vd-spec-icon">🎨</span><span className="vd-spec-label">Couleur</span><span className="vd-spec-val">{vehicle.couleur}</span></div>}
              <div className="vd-spec"><span className="vd-spec-icon">🚪</span><span className="vd-spec-label">Portes</span><span className="vd-spec-val">{vehicle.nb_portes ?? 5}</span></div>
              <div className="vd-spec"><span className="vd-spec-icon">💺</span><span className="vd-spec-label">Places</span><span className="vd-spec-val">{vehicle.nb_places ?? 5}</span></div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="vd-description">
                <h3>Description</h3>
                <p>{vehicle.description}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="vd-ctas">
              <a href={`/contact?sujet=${encodeURIComponent(`${vehicle.marque} ${vehicle.modele} (réf. ${vehicle.id})`)}`} className="btn btn-red vd-cta-main">
                📞 Nous contacter pour ce véhicule
              </a>
              {vehicle.lien_leboncoin && (
                <a href={vehicle.lien_leboncoin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-red vd-cta-secondary">
                  Voir sur Leboncoin ↗
                </a>
              )}
            </div>

            {/* Garanties */}
            <div className="vd-guarantees">
              <div className="vd-guarantee"><span>✓</span> Véhicule soigneusement sélectionné</div>
              <div className="vd-guarantee"><span>✓</span> Garantie disponible</div>
              <div className="vd-guarantee"><span>✓</span> Financement possible</div>
              <div className="vd-guarantee"><span>✓</span> Livraison à domicile</div>
            </div>
          </div>
        </div>

        {/* Back to stock */}
        <div className="container" style={{padding: '40px 32px'}}>
          <a href="/stock" className="back-to-stock">← Retour au stock</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
