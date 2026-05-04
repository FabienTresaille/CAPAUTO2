import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/VehicleCard';
import { getAllVehicles } from '@/lib/db';
import './stock.css';

export const dynamic = 'force-dynamic';

export default function StockPage() {
  const vehicles = getAllVehicles();

  return (
    <>
      <Header />
      <div className="page-hero"><div className="container"><span className="section-label" style={{color:'rgba(255,255,255,.5)'}}>Catalogue</span><h1 className="section-title white">Notre stock</h1><div className="title-line" /></div></div>
      <section className="section-pad" style={{background:'var(--gray-light)'}}>
        <div className="container">
          <p className="stock-count">{vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} disponible{vehicles.length > 1 ? 's' : ''}</p>
          <div className="stock-grid">
            {vehicles.map(v => (
              <VehicleCard key={v.id} {...v} />
            ))}
          </div>
          {vehicles.length === 0 && <p className="empty-msg">Aucun véhicule en stock pour le moment. Revenez bientôt !</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
