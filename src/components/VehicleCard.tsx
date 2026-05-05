import Link from 'next/link';
import './VehicleCard.css';

interface VehicleCardProps {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  prix: number;
  boite: string;
  carburant: string;
  photos: string;
  lien_leboncoin: string;
  nb_portes?: number;
  nb_places?: number;
}

export default function VehicleCard({ id, marque, modele, annee, kilometrage, prix, boite, carburant, photos, lien_leboncoin, nb_portes, nb_places }: VehicleCardProps) {
  const photoList: string[] = JSON.parse(photos || '[]');
  const mainPhoto = photoList.length > 0 ? photoList[0] : '/placeholder-car.svg';

  return (
    <div className="vehicle-card">
      <Link href={`/stock/${id}`} className="vehicle-img-link">
        <div className="vehicle-img-wrap">
          <img src={mainPhoto} alt={`${marque} ${modele}`} className="vehicle-img" />
          <div className="vehicle-badges">
            <span className="badge-year">{annee}</span>
            <span className="badge-fuel">{carburant}</span>
          </div>
          {photoList.length > 1 && (
            <span className="badge-photos">📷 {photoList.length}</span>
          )}
        </div>
      </Link>
      <div className="vehicle-info">
        <h3 className="vehicle-name">
          <Link href={`/stock/${id}`}>{marque} {modele}</Link>
        </h3>
        <div className="vehicle-specs">
          <span>{kilometrage.toLocaleString('fr-FR')} km</span>
          <span>•</span>
          <span>{boite}</span>
          {nb_portes && <><span>•</span><span>{nb_portes}P</span></>}
          {nb_places && <><span>•</span><span>{nb_places} places</span></>}
        </div>
        <div className="vehicle-price">{prix.toLocaleString('fr-FR')} €</div>
        <div className="vehicle-actions">
          <Link href={`/stock/${id}`} className="btn btn-red btn-sm">
            Voir le véhicule
          </Link>
          {lien_leboncoin && (
            <a href={lien_leboncoin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-red btn-sm">
              Leboncoin ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
