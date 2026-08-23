import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import Database from "better-sqlite3";

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  password_salt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __authDatabase: Database.Database | undefined;
}

function getDb() {
  if (!global.__authDatabase) {
    const dataDir = join(process.cwd(), "data");
    mkdirSync(dataDir, { recursive: true });
    const dbPath = join(dataDir, "auth.sqlite");
    const db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.prepare(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`
    ).run();
    global.__authDatabase = db;
  }

  return global.__authDatabase;
}

function hashPassword(password: string, salt: string) {
  const derived = scryptSync(password, salt, 64);
  return Buffer.from(derived).toString("hex");
}

function createSalt() {
  return randomBytes(16).toString("hex");
}

function normalizeUsername(username: string) {
  return username.trim();
}

function validateInput(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) {
    return "Benutzername ist erforderlich.";
  }
  if (normalizedUsername.length > 64) {
    return "Benutzername darf maximal 64 Zeichen haben.";
  }
  if (password.length < 8) {
    return "Passwort muss mindestens 8 Zeichen lang sein.";
  }
  if (password.length > 128) {
    return "Passwort darf maximal 128 Zeichen haben.";
  }
  return null;
}

function verifyPassword(password: string, passwordHash: string, passwordSalt: string) {
  const computed = hashPassword(password, passwordSalt);
  const computedBuffer = Buffer.from(computed, "hex");
  const storedBuffer = Buffer.from(passwordHash, "hex");
  if (computedBuffer.length !== storedBuffer.length) {
    return false;
  }
  return timingSafeEqual(computedBuffer, storedBuffer);
}

export function registerUser(username: string, password: string) {
  const error = validateInput(username, password);
  if (error) {
    return { ok: false as const, message: error };
  }

  const normalizedUsername = normalizeUsername(username);
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM users WHERE username = ?")
    .get(normalizedUsername) as { id: number } | undefined;

  if (existing) {
    return { ok: false as const, message: "Benutzername existiert bereits." };
  }

  const salt = createSalt();
  const hash = hashPassword(password, salt);
  db.prepare(
    "INSERT INTO users (username, password_hash, password_salt) VALUES (?, ?, ?)"
  ).run(normalizedUsername, hash, salt);
  return { ok: true as const, message: "Registrierung erfolgreich." };
}

export function loginUser(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || !password) {
    return { ok: false as const, message: "Benutzername und Passwort sind erforderlich." };
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, username, password_hash, password_salt FROM users WHERE username = ?")
    .get(normalizedUsername) as UserRow | undefined;

  if (!user || !verifyPassword(password, user.password_hash, user.password_salt)) {
    return { ok: false as const, message: "Ungültiger Benutzername oder Passwort." };
  }

  return { ok: true as const, message: `Willkommen, ${user.username}!` };
}

export function changePassword(
  username: string,
  currentPassword: string,
  newPassword: string
) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || !currentPassword || !newPassword) {
    return { ok: false as const, message: "Alle Felder sind erforderlich." };
  }

  const passwordError = validateInput(normalizedUsername, newPassword);
  if (passwordError) {
    return { ok: false as const, message: passwordError };
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, password_hash, password_salt FROM users WHERE username = ?")
    .get(normalizedUsername) as UserRow | undefined;

  if (!user || !verifyPassword(currentPassword, user.password_hash, user.password_salt)) {
    return { ok: false as const, message: "Aktuelles Passwort ist nicht korrekt." };
  }

  const salt = createSalt();
  const hash = hashPassword(newPassword, salt);
  db.prepare("UPDATE users SET password_hash = ?, password_salt = ? WHERE id = ?").run(
    hash,
    salt,
    user.id
  );

  return { ok: true as const, message: "Passwort erfolgreich geändert." };
}
