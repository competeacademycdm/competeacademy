import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { AUTHENTIC_EXAM_RESOURCES } from '@/data/examResources';
import { AUTHENTIC_FOUNDATION_RESOURCES } from '@/data/foundationResources';

function resolveDbDir(): string {
  const cwd = process.cwd();
  const directDataDir = path.join(cwd, 'data');
  const nestedProjectDataDir = path.join(cwd, 'compete-academy-website', 'data');

  if (fs.existsSync(path.join(directDataDir, 'compete_academy.db'))) {
    return directDataDir;
  }
  if (fs.existsSync(path.join(nestedProjectDataDir, 'compete_academy.db'))) {
    return nestedProjectDataDir;
  }
  if (!fs.existsSync(directDataDir)) {
    fs.mkdirSync(directDataDir, { recursive: true });
  }
  return directDataDir;
}

const DB_DIR = resolveDbDir();
const DB_PATH = path.join(DB_DIR, 'compete_academy.db');

// Singleton database instance across hot-reloads
declare global {
  var __competeAcademyDb: Database.Database | undefined;
}

function getDatabase(): Database.Database {
  if (!global.__competeAcademyDb) {
    const db = new Database(DB_PATH, { timeout: 10000 });
    db.pragma('journal_mode = WAL');
    db.pragma('busy_timeout = 10000');
    db.pragma('foreign_keys = ON');
    initSchema(db);
    global.__competeAcademyDb = db;
  }
  return global.__competeAcademyDb;
}

function initSchema(db: Database.Database) {
  // 1. Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'superadmin',
      is_active INTEGER NOT NULL DEFAULT 1,
      must_change_password INTEGER NOT NULL DEFAULT 0,
      password_changed_at DATETIME,
      failed_login_attempts INTEGER NOT NULL DEFAULT 0,
      locked_until DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations for admin_users security columns
  const existingAdminCols = db.prepare('PRAGMA table_info(admin_users)').all() as { name: string }[];
  const adminColNames = new Set(existingAdminCols.map((c) => c.name));

  if (!adminColNames.has('is_active')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1').run();
    } catch {}
  }
  if (!adminColNames.has('must_change_password')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0').run();
    } catch {}
  }
  if (!adminColNames.has('password_changed_at')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN password_changed_at DATETIME').run();
    } catch {}
  }
  if (!adminColNames.has('failed_login_attempts')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN failed_login_attempts INTEGER NOT NULL DEFAULT 0').run();
    } catch {}
  }
  if (!adminColNames.has('locked_until')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN locked_until DATETIME').run();
    } catch {}
  }
  if (!adminColNames.has('updated_at')) {
    try {
      db.prepare('ALTER TABLE admin_users ADD COLUMN updated_at DATETIME').run();
    } catch {}
  }

  // Normalize all stored admin emails to lowercase trimmed format
  try {
    db.prepare('UPDATE admin_users SET email = LOWER(TRIM(email)) WHERE email != LOWER(TRIM(email))').run();
  } catch {}

  // 1b. Admin server-side sessions table (revocable session lifecycle)
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token_jti TEXT UNIQUE NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      revoked_at DATETIME,
      revoked_reason TEXT,
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_jti ON admin_sessions(token_jti);
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_user ON admin_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
  `);

  // 1c. Admin login attempts table (persistent rate limiting & brute-force defense)
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_login_attempts (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      user_agent TEXT,
      success INTEGER NOT NULL DEFAULT 0,
      failure_reason TEXT,
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_email ON admin_login_attempts(email, attempted_at);
    CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip ON admin_login_attempts(ip_address, attempted_at);
  `);

  // 1d. Admin password reset tokens table (SHA-256 hashed, single-use, short-lived)
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_password_resets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token_hash TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      used_at DATETIME,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_admin_password_resets_hash ON admin_password_resets(token_hash);
    CREATE INDEX IF NOT EXISTS idx_admin_password_resets_user ON admin_password_resets(user_id);
  `);

  // 1e. Institutional settings key-value store
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Learning materials table (extended with class_level, chapter, academic_year, medium)
  db.exec(`
    CREATE TABLE IF NOT EXISTS learning_materials (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      subject TEXT NOT NULL,
      course TEXT NOT NULL,
      category TEXT NOT NULL,
      material_type TEXT NOT NULL,
      class_level TEXT,
      chapter TEXT,
      academic_year TEXT,
      medium TEXT DEFAULT 'English',
      file_url TEXT,
      file_name TEXT,
      file_size INTEGER,
      thumbnail_url TEXT,
      is_published INTEGER NOT NULL DEFAULT 1,
      downloads_count INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations for learning_materials columns
  const existingMaterialCols = db.prepare('PRAGMA table_info(learning_materials)').all() as { name: string }[];
  const matColNames = new Set(existingMaterialCols.map((c) => c.name));

  if (!matColNames.has('class_level')) {
    try {
      db.prepare('ALTER TABLE learning_materials ADD COLUMN class_level TEXT').run();
    } catch {}
  }
  if (!matColNames.has('chapter')) {
    try {
      db.prepare('ALTER TABLE learning_materials ADD COLUMN chapter TEXT').run();
    } catch {}
  }
  if (!matColNames.has('academic_year')) {
    try {
      db.prepare('ALTER TABLE learning_materials ADD COLUMN academic_year TEXT').run();
    } catch {}
  }
  if (!matColNames.has('medium')) {
    try {
      db.prepare('ALTER TABLE learning_materials ADD COLUMN medium TEXT DEFAULT "English"').run();
    } catch {}
  }

  // Optimized indices for high-concurrency public vault and admin search
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_learning_materials_lookup ON learning_materials(is_published, course, category);
    CREATE INDEX IF NOT EXISTS idx_learning_materials_course ON learning_materials(course);
    CREATE INDEX IF NOT EXISTS idx_learning_materials_created ON learning_materials(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_learning_materials_subject ON learning_materials(subject);
  `);

  // 3. Admin activity audit log
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_activity_logs (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      entity_title TEXT,
      admin_email TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Resource download students (Leads with verification status)
  db.exec(`
    CREATE TABLE IF NOT EXISTS resource_students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      mobile TEXT UNIQUE NOT NULL,
      verification_status TEXT NOT NULL DEFAULT 'Pending',
      registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      verified_at DATETIME,
      last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_resource_students_mobile ON resource_students(mobile);
    CREATE INDEX IF NOT EXISTS idx_resource_students_status ON resource_students(verification_status);
  `);

  // 5. Active OTP verification attempts
  db.exec(`
    CREATE TABLE IF NOT EXISTS otp_verifications (
      id TEXT PRIMARY KEY,
      mobile TEXT NOT NULL,
      otp_hash TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      max_attempts INTEGER NOT NULL DEFAULT 5,
      resend_count INTEGER NOT NULL DEFAULT 0,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      verified INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_otp_mobile ON otp_verifications(mobile);
  `);

  // 6. Verified resource download & access records
  db.exec(`
    CREATE TABLE IF NOT EXISTS resource_download_records (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      resource_title TEXT NOT NULL,
      download_type TEXT NOT NULL,
      file_path TEXT NOT NULL,
      ip_address TEXT,
      exam_category TEXT DEFAULT 'neet',
      access_method TEXT DEFAULT 'external_link',
      destination_url TEXT,
      download_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES resource_students(id)
    );
    CREATE INDEX IF NOT EXISTS idx_download_records_student ON resource_download_records(student_id);
    CREATE INDEX IF NOT EXISTS idx_download_records_mobile ON resource_download_records(mobile);
    CREATE INDEX IF NOT EXISTS idx_download_records_res ON resource_download_records(resource_id);
  `);

  try {
    db.prepare('ALTER TABLE resource_download_records ADD COLUMN exam_category TEXT DEFAULT "neet"').run();
  } catch {}
  try {
    db.prepare('ALTER TABLE resource_download_records ADD COLUMN access_method TEXT DEFAULT "external_link"').run();
  } catch {}
  try {
    db.prepare('ALTER TABLE resource_download_records ADD COLUMN destination_url TEXT').run();
  } catch {}

  // 7. Academic Programs CMS Table (5 Major Programs with full editable intelligence)
  db.exec(`
    CREATE TABLE IF NOT EXISTS academic_programs (
      id TEXT PRIMARY KEY,
      program_code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_name TEXT NOT NULL,
      badge TEXT NOT NULL,
      headline TEXT NOT NULL,
      introduction TEXT NOT NULL,
      target_audience TEXT NOT NULL,
      exam_name TEXT NOT NULL,
      conducting_authority TEXT NOT NULL,
      exam_frequency TEXT NOT NULL,
      exam_mode TEXT NOT NULL,
      total_marks INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      negative_marking_rule TEXT NOT NULL,
      official_source_title TEXT NOT NULL,
      official_source_url TEXT NOT NULL,
      exam_year TEXT NOT NULL,
      verified_date TEXT NOT NULL,
      exam_stages_json TEXT NOT NULL,
      marks_distribution_json TEXT NOT NULL,
      eligibility_json TEXT NOT NULL,
      curriculum_json TEXT NOT NULL,
      learning_journey_json TEXT NOT NULL,
      student_approach_json TEXT NOT NULL,
      career_opportunities_json TEXT NOT NULL,
      faqs_json TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_academic_programs_code ON academic_programs(program_code);
  `);

  // 8. Controlled Administrator Provisioning & Compromised Credential Rotation
  // Never hardcode plaintext credentials in source code.
  const bootstrapEmail = (process.env.ADMIN_INITIAL_EMAIL || 'admin@competeacademy.in').trim().toLowerCase();
  const bootstrapPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const bootstrapPasswordHash = process.env.ADMIN_INITIAL_PASSWORD_HASH;

  const existingAdmin = db
    .prepare('SELECT id, email, password_hash, password_changed_at FROM admin_users WHERE LOWER(TRIM(email)) = ?')
    .get(bootstrapEmail) as
    | { id: string; email: string; password_hash: string; password_changed_at: string | null }
    | undefined;

  const resolveBootstrapHash = (): string | null => {
    if (bootstrapPasswordHash && bootstrapPasswordHash.startsWith('$2')) {
      return bootstrapPasswordHash;
    }
    if (bootstrapPassword && bootstrapPassword.length >= 12) {
      const salt = bcrypt.genSaltSync(12);
      return bcrypt.hashSync(bootstrapPassword, salt);
    }
    return null;
  };

  if (!existingAdmin) {
    const newHash = resolveBootstrapHash();
    if (newHash) {
      const nowIso = new Date().toISOString();
      db.prepare(`
        INSERT INTO admin_users (
          id, email, password_hash, name, role, is_active, must_change_password, password_changed_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
      `).run(
        'admin-default-01',
        bootstrapEmail,
        newHash,
        'Academy Registrar & Dean',
        'superadmin',
        nowIso,
        nowIso
      );
    }
  } else if (!existingAdmin.password_changed_at) {
    // Rotate legacy pre-hardening credential if environment bootstrap secret is provided
    const rotatedHash = resolveBootstrapHash();
    if (rotatedHash) {
      const nowIso = new Date().toISOString();
      db.prepare(`
        UPDATE admin_users
        SET password_hash = ?,
            password_changed_at = ?,
            updated_at = ?,
            failed_login_attempts = 0,
            locked_until = NULL
        WHERE id = ?
      `).run(rotatedHash, nowIso, nowIso, existingAdmin.id);

      db.prepare(`
        UPDATE admin_sessions
        SET revoked_at = ?, revoked_reason = 'CREDENTIAL_ROTATION'
        WHERE user_id = ? AND revoked_at IS NULL
      `).run(nowIso, existingAdmin.id);

      db.prepare(`
        INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
        VALUES (?, 'SECURITY_ROTATE', 'ADMIN_CREDENTIAL', ?, 'Rotated compromised legacy administrator credential', ?)
      `).run(`log-${Date.now()}`, existingAdmin.id, bootstrapEmail);
    }
  }

  // 9. Ensure authentic learning materials repository is fully seeded (Single Source of Truth)
  ensureSeededLearningMaterials(db);
}

/**
 * Idempotently seeds the database with all 62 authentic exam and foundation resources
 * if they are not already present in learning_materials.
 */
function ensureSeededLearningMaterials(db: Database.Database) {
  try {
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO learning_materials (
        id, title, description, subject, course, category, material_type,
        class_level, chapter, academic_year, medium,
        file_url, file_name, file_size, thumbnail_url, is_published, downloads_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)
    `);

    const seedTransaction = db.transaction(() => {
      // 1. Exam Resources (38 authentic items)
      for (const item of AUTHENTIC_EXAM_RESOURCES) {
        let course = 'Foundation Classes';
        if (item.category === 'neet') course = 'NEET Medical';
        else if (item.category === 'jee') course = 'JEE Main & Advanced';
        else if (item.category === 'upsc') course = 'UPSC Civil Services';
        else if (item.category === 'tnpsc') course = 'TNPSC State Services';

        let category = 'notes';
        if (item.paperType === 'Question Paper') category = 'pyq';
        else if (item.paperType === 'Official Answer Key' || item.paperType === 'Final Answer Key') category = 'mocks';
        else if (item.paperType === 'Syllabus & Info') category = 'clinics';

        const title = item.notes && item.notes.length > 0 && !item.notes.startsWith('Official')
          ? `${item.year} ${item.examName} — ${item.subject}`
          : `${item.year} ${item.examName} — ${item.subject}`;

        const fileUrl = item.downloadUrl || item.officialSourceUrl || null;
        const fileName = item.downloadUrl ? path.basename(item.downloadUrl) : '';

        insertStmt.run(
          item.id,
          title,
          item.notes || `Official authentic resource for ${item.examName} published by ${item.authority}.`,
          item.subject,
          course,
          category,
          item.paperType,
          null, // class_level
          item.sessionOrPhase || null, // chapter / session
          item.year ? String(item.year) : null,
          item.language || 'English',
          fileUrl,
          fileName,
          null,
          null
        );
      }

      // 2. Foundation Resources (24 authentic items)
      for (const item of AUTHENTIC_FOUNDATION_RESOURCES) {
        let category = 'notes';
        if (item.resourceSection === 'Question Papers') category = 'pyq';
        else if (item.resourceSection === 'Answer Keys') category = 'mocks';
        else if (item.resourceSection === 'Syllabus') category = 'clinics';

        const fileUrl = item.fileUrl || item.officialSourceUrl || null;
        const fileName = item.fileUrl ? path.basename(item.fileUrl) : '';

        insertStmt.run(
          item.id,
          item.title,
          item.description || `Foundation curriculum module for ${item.classLevel} ${item.subject}.`,
          item.subject,
          'Foundation Classes',
          category,
          item.resourceSection,
          item.classLevel,
          item.chapter || null,
          item.academicYear,
          item.medium,
          fileUrl,
          fileName,
          null,
          null
        );
      }
    });

    seedTransaction();
  } catch (err) {
    console.error('Error ensuring seeded learning materials:', err);
  }
}

export const db = getDatabase();
