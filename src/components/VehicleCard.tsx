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
}

export default function VehicleCard({ id, marque, modele, annee, kilometrage, prix, boite, carburant, photos, lien_leboncoin }: VehicleCardProps) {
  const photoList: string[] = JSON.parse(photos || '[]');
  const mainPhoto = photoList.length > 0 ? photoList[0] : '/placeholder-car.svg';

  return (
    <div className="vehicle-card">
      <div className="vehicle-img-wrap">
        <img src={mainPhoto} alt={`${marque} ${modele}`} className="vehicle-img" />
        <div className="vehicle-badges">
          <span className="badge-year">{annee}</span>
          <span className="badge-fuel">{carburant}</span>
        </div>
      </div>
      <div className="vehicle-info">
        <h3 className="vehicle-name">{marque} {modele}</h3>
        <div className="vehicle-specs">
          <span>{kilometrage.toLocaleString('fr-FR')} km</span>
          <span>•</span>
          <span>{boite}</span>
        </div>
        <div className="vehicle-price">{prix.toLocaleString('fr-FR')} €</div>
        <div className="vehicle-actions">
          <Link href={`/contact?sujet=Intéressé par ${marque} ${modele}`} className="btn btn-red btn-sm">
            Nous contacter
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
