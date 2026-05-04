import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'data', 'capauto.db') 
  : path.join(process.cwd(), 'capauto.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
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
}

/* ── Vehicle CRUD ── */
export interface Vehicle {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  prix: number;
  boite: string;
  carburant: string;
  couleur: string;
  puissance: string;
  description: string;
  photos: string;
  lien_leboncoin: string;
  featured: number;
  visible: number;
  created_at: string;
}

export function getAllVehicles(): Vehicle[] {
  return getDb().prepare('SELECT * FROM vehicles WHERE visible = 1 ORDER BY created_at DESC').all() as Vehicle[];
}

export function getFeaturedVehicles(): Vehicle[] {
  return getDb().prepare('SELECT * FROM vehicles WHERE featured = 1 AND visible = 1 ORDER BY created_at DESC LIMIT 3').all() as Vehicle[];
}

export function getVehicleById(id: number): Vehicle | undefined {
  return getDb().prepare('SELECT * FROM vehicles WHERE id = ?').get(id) as Vehicle | undefined;
}

export function searchVehicles(filters: { marque?: string; boite?: string; kmMax?: number }): Vehicle[] {
  let query = 'SELECT * FROM vehicles WHERE visible = 1';
  const params: (string | number)[] = [];

  if (filters.marque && filters.marque !== 'all') {
    query += ' AND LOWER(marque) = LOWER(?)';
    params.push(filters.marque);
  }
  if (filters.boite && filters.boite !== 'all') {
    query += ' AND LOWER(boite) = LOWER(?)';
    params.push(filters.boite);
  }
  if (filters.kmMax) {
    query += ' AND kilometrage <= ?';
    params.push(filters.kmMax);
  }

  query += ' ORDER BY created_at DESC';
  return getDb().prepare(query).all(...params) as Vehicle[];
}

export function getDistinctMarques(): string[] {
  const rows = getDb().prepare('SELECT DISTINCT marque FROM vehicles WHERE visible = 1 ORDER BY marque').all() as { marque: string }[];
  return rows.map(r => r.marque);
}

export function createVehicle(data: Omit<Vehicle, 'id' | 'created_at'>): number {
  const stmt = getDb().prepare(`
    INSERT INTO vehicles (marque, modele, annee, kilometrage, prix, boite, carburant, couleur, puissance, description, photos, lien_leboncoin, featured, visible)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.marque, data.modele, data.annee, data.kilometrage, data.prix,
    data.boite, data.carburant, data.couleur, data.puissance,
    data.description, data.photos, data.lien_leboncoin,
    data.featured, data.visible
  );
  return result.lastInsertRowid as number;
}

export function updateVehicle(id: number, data: Partial<Vehicle>): void {
  const fields = Object.keys(data).filter(k => k !== 'id' && k !== 'created_at');
  if (fields.length === 0) return;
  const sets = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => (data as Record<string, unknown>)[f]);
  getDb().prepare(`UPDATE vehicles SET ${sets} WHERE id = ?`).run(...values, id);
}

export function deleteVehicle(id: number): void {
  getDb().prepare('UPDATE vehicles SET visible = 0 WHERE id = ?').run(id);
}

export function hardDeleteVehicle(id: number): void {
  getDb().prepare('DELETE FROM vehicles WHERE id = ?').run(id);
}

/* ── Messages ── */
export interface Message {
  id: number;
  nom: string;
  telephone: string;
  email: string;
  objet: string;
  message: string;
  lu: number;
  created_at: string;
}

export function createMessage(data: Omit<Message, 'id' | 'lu' | 'created_at'>): number {
  const stmt = getDb().prepare(`
    INSERT INTO messages (nom, telephone, email, objet, message)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(data.nom, data.telephone, data.email, data.objet, data.message);
  return result.lastInsertRowid as number;
}

export function getAllMessages(): Message[] {
  return getDb().prepare('SELECT * FROM messages ORDER BY created_at DESC').all() as Message[];
}
