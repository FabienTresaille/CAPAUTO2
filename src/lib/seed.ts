import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'capauto.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marque TEXT NOT NULL,
    modele TEXT NOT NULL,
    annee INTEGER NOT NULL,
    kilometrage INTEGER NOT NULL,
    prix REAL NOT NULL,
    boite TEXT NOT NULL DEFAULT 'Manuelle',
    carburant TEXT NOT NULL DEFAULT 'Essence',
    couleur TEXT DEFAULT '',
    puissance TEXT DEFAULT '',
    description TEXT DEFAULT '',
    photos TEXT DEFAULT '[]',
    lien_leboncoin TEXT DEFAULT '',
    featured INTEGER DEFAULT 0,
    visible INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    telephone TEXT DEFAULT '',
    email TEXT NOT NULL,
    objet TEXT DEFAULT '',
    message TEXT NOT NULL,
    lu INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed demo vehicles
const vehicles = [
  { marque: 'Peugeot', modele: '3008 GT', annee: 2021, km: 45000, prix: 26990, boite: 'Automatique', carburant: 'Diesel', couleur: 'Noir Perla', puissance: '130 ch', desc: 'SUV familial en excellent état. Entretien complet Peugeot. Toit panoramique, caméra 360°, sièges chauffants.', featured: 1 },
  { marque: 'BMW', modele: 'Série 3 320d', annee: 2020, km: 62000, prix: 29500, boite: 'Automatique', carburant: 'Diesel', couleur: 'Blanc Alpin', puissance: '190 ch', desc: 'Berline sportive avec pack M Sport. Navigation professionnelle, cuir Dakota, LED adaptatifs.', featured: 1 },
  { marque: 'Mercedes', modele: 'Classe A 200', annee: 2022, km: 28000, prix: 31900, boite: 'Automatique', carburant: 'Essence', couleur: 'Gris Cosmos', puissance: '163 ch', desc: 'Dernière génération avec système MBUX. Ambiance lumineuse 64 couleurs, caméra de recul, parktronic.', featured: 1 },
  { marque: 'Renault', modele: 'Captur Intens', annee: 2023, km: 15000, prix: 21490, boite: 'Automatique', carburant: 'Essence', couleur: 'Orange Valencia', puissance: '140 ch', desc: 'Quasi-neuf, encore sous garantie constructeur. Écran tactile 9.3 pouces, aide au stationnement.', featured: 0 },
  { marque: 'Volkswagen', modele: 'Golf 8 R-Line', annee: 2021, km: 38000, prix: 27990, boite: 'Automatique', carburant: 'Essence', couleur: 'Bleu Atlantique', puissance: '150 ch', desc: 'Finition R-Line complète. Digital cockpit Pro, acc adaptatif, jantes 18 pouces.', featured: 0 },
  { marque: 'Audi', modele: 'A3 Sportback', annee: 2022, km: 32000, prix: 28500, boite: 'Automatique', carburant: 'Essence', couleur: 'Gris Nardo', puissance: '150 ch', desc: 'S-Line extérieur et intérieur. Virtual cockpit, MMI Navigation Plus, sono B&O.', featured: 0 },
  { marque: 'Toyota', modele: 'Yaris Cross', annee: 2023, km: 12000, prix: 24990, boite: 'Automatique', carburant: 'Hybride', couleur: 'Gris Fumé', puissance: '116 ch', desc: 'Hybride automatique. Consommation ultra-basse, Toyota Safety Sense dernière génération.', featured: 0 },
  { marque: 'Citroën', modele: 'C5 Aircross', annee: 2021, km: 52000, prix: 22490, boite: 'Manuelle', carburant: 'Diesel', couleur: 'Blanc Banquise', puissance: '130 ch', desc: 'Confort de référence avec suspensions à butées hydrauliques. Sièges Advanced Comfort.', featured: 0 },
  { marque: 'Ford', modele: 'Puma ST-Line', annee: 2022, km: 25000, prix: 23990, boite: 'Manuelle', carburant: 'Essence', couleur: 'Rouge Lucid', puissance: '125 ch', desc: 'Design sportif, MegaBox de 80L dans le coffre. Ford SYNC 3, caméra de recul.', featured: 0 },
  { marque: 'Dacia', modele: 'Duster Journey', annee: 2023, km: 8000, prix: 19490, boite: 'Manuelle', carburant: 'Essence', couleur: 'Vert Cèdre', puissance: '130 ch', desc: 'Rapport qualité-prix imbattable. Écran multimédia 8 pouces, climatisation auto, caméra 360°.', featured: 0 },
  { marque: 'Opel', modele: 'Corsa Elegance', annee: 2022, km: 22000, prix: 17990, boite: 'Automatique', carburant: 'Essence', couleur: 'Noir Diamant', puissance: '130 ch', desc: 'Citadine premium. Matrix LED, sièges ergonomiques certifiés AGR, Apple CarPlay sans fil.', featured: 0 },
  { marque: 'Seat', modele: 'Leon FR', annee: 2021, km: 41000, prix: 22990, boite: 'Automatique', carburant: 'Essence', couleur: 'Rouge Desire', puissance: '150 ch', desc: 'Sportive et technologique. Full LED, cockpit digital, navigation, sièges sport.', featured: 0 },
];

const stmt = db.prepare(`
  INSERT INTO vehicles (marque, modele, annee, kilometrage, prix, boite, carburant, couleur, puissance, description, photos, lien_leboncoin, featured, visible)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
`);

const insertAll = db.transaction(() => {
  for (const v of vehicles) {
    stmt.run(v.marque, v.modele, v.annee, v.km, v.prix, v.boite, v.carburant, v.couleur, v.puissance, v.desc, '[]', '', v.featured);
  }
});

insertAll();
console.log(`✅ Base de données créée avec ${vehicles.length} véhicules de démo.`);
db.close();
