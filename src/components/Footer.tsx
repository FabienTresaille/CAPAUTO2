import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">CAP&apos;AUT<span>O</span></div>
            <span className="footer-logo-sub">Conseiller Automobile Privilégié</span>
            <p className="footer-desc">Spécialiste de la vente et du rachat de véhicules d&apos;occasion. Sélection rigoureuse, garantie incluse, livraison à domicile partout en France.</p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Facebook">f</a>
              <a href="#" className="social-btn" aria-label="Instagram">●</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/stock">Notre stock</Link></li>
              <li><Link href="/recherche">Recherche personnalisée</Link></li>
              <li><Link href="/services">Vendre ma voiture</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Nos services</h4>
            <ul>
              <li><Link href="/services">Achat cash</Link></li>
              <li><Link href="/stock">Vente de véhicules</Link></li>
              <li><Link href="/services">Sélection soignée</Link></li>
              <li><Link href="/services">Livraison domicile</Link></li>
              <li><Link href="/services">Financement</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} CAP&apos;AUTO — Tous droits réservés</div>
          <div className="footer-credits">Site réalisé par Agence iA — Marketing Digital</div>
        </div>
      </div>
    </footer>
  );
}
