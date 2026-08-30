import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import Database from "better-sqlite3";
import { SESSION_TTL_MS } from "@/config/auth";
import type { UserRole } from "@/types/auth";

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  password_salt: string;
  role: UserRole;
}

interface AdminUserListRow {
  id: number;
  username: string;
  role: UserRole;
}

interface SessionUser {
  id: number;
  username: string;
  role: UserRole;
  expiresAt: number;
}

interface SessionRecord {
  sessionId: number;
  expiresAt: number;
  issuedAt: number | null;
}

declare global {
  var __authDatabase: Database.Database | undefined;
}

function getDb() {
  if (!global.__authDatabase) {
    const dbPath = process.env.AUTH_DB_PATH ?? join("/tmp", "auth.sqlite");
    mkdirSync(dirname(dbPath), { recursive: true });
    const db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.prepare(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`
    ).run();
    const userColumns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
    const hasRole = userColumns.some((column) => column.name === "role");
    if (!hasRole) {
      db.prepare("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'").run();
    }
    db.prepare(
      "UPDATE users SET role = 'user' WHERE role IS NULL OR role NOT IN ('admin', 'user')"
    ).run();
    db.prepare("UPDATE users SET role = 'admin' WHERE username = 'toffel73'").run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token_hash TEXT UNIQUE NOT NULL,
        issued_at INTEGER,
        expires_at INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ).run();
    const columns = db.prepare("PRAGMA table_info(sessions)").all() as Array<{ name: string }>;
    const hasIssuedAt = columns.some((column) => column.name === "issued_at");
    if (!hasIssuedAt) {
      db.prepare("ALTER TABLE sessions ADD COLUMN issued_at INTEGER").run();
    }
    db.prepare("CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash)").run();
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

function normalizeRole(role: string | undefined): UserRole {
  return role === "admin" ? "admin" : "user";
}

function validateUsernameAndPassword(username: string, password: string) {
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

function validatePasswordOnly(password: string) {
  if (!password) {
    return "Passwort ist erforderlich.";
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

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function registerUser(username: string, password: string, role: string | undefined = "user") {
  const error = validateUsernameAndPassword(username, password);
  if (error) {
    return { ok: false as const, message: error };
  }

  const normalizedUsername = normalizeUsername(username);
  const normalizedRole = normalizeRole(role);
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
    "INSERT INTO users (username, password_hash, password_salt, role) VALUES (?, ?, ?, ?)"
  ).run(normalizedUsername, hash, salt, normalizedRole);
  return { ok: true as const, message: "Registrierung erfolgreich." };
}

export function listUsersForAdmin(): AdminUserListRow[] {
  const db = getDb();
  return db
    .prepare("SELECT id, username, role FROM users ORDER BY username COLLATE NOCASE ASC")
    .all() as AdminUserListRow[];
}

export function loginUser(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || !password) {
    return { ok: false as const, message: "Benutzername und Passwort sind erforderlich." };
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, username, password_hash, password_salt, role FROM users WHERE username = ?")
    .get(normalizedUsername) as UserRow | undefined;

  if (!user || !verifyPassword(password, user.password_hash, user.password_salt)) {
    return { ok: false as const, message: "Ungültiger Benutzername oder Passwort." };
  }

  return { ok: true as const, message: `Willkommen, ${user.username}!`, userId: user.id };
}

export function createSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashSessionToken(token);
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_TTL_MS;
  const db = getDb();
  db.prepare(
    "INSERT INTO sessions (user_id, token_hash, issued_at, expires_at) VALUES (?, ?, ?, ?)"
  ).run(userId, tokenHash, issuedAt, expiresAt);
  return token;
}

export function getSessionUser(sessionToken: string): SessionUser | null {
  if (!sessionToken) {
    return null;
  }

  const tokenHash = hashSessionToken(sessionToken);
  const db = getDb();
  const row = db
    .prepare(
      `SELECT users.id AS userId, users.username, sessions.id AS sessionId,
              users.role, sessions.expires_at AS expiresAt, sessions.issued_at AS issuedAt
       FROM sessions
       INNER JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ?`
    )
    .get(tokenHash) as (SessionRecord & { userId: number; username: string; role: UserRole }) | undefined;

  if (!row) {
    return null;
  }

  if (!isSessionRecordValid(row)) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(row.sessionId);
    return null;
  }

  return { id: row.userId, username: row.username, role: row.role, expiresAt: row.expiresAt };
}

export function deleteSession(sessionToken: string): void {
  if (!sessionToken) return;
  const tokenHash = hashSessionToken(sessionToken);
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash);
}

function isSessionRecordValid(session: SessionRecord) {
  const now = Date.now();
  if (session.issuedAt === null) {
    return false;
  }
  return session.expiresAt > now;
}

export function changePasswordByUserId(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  if (!currentPassword || !newPassword) {
    return { ok: false as const, message: "Alle Felder sind erforderlich." };
  }

  const passwordError = validatePasswordOnly(newPassword);
  if (passwordError) {
    return { ok: false as const, message: passwordError };
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, username, password_hash, password_salt, role FROM users WHERE id = ?")
    .get(userId) as UserRow | undefined;

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
  db.prepare("DELETE FROM sessions WHERE user_id = ?").run(user.id);

  return { ok: true as const, message: "Passwort erfolgreich geändert." };
}
