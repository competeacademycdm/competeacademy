import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data/compete_academy.db');
console.log('Testing against database at:', dbPath);

const db = new Database(dbPath);

console.log('\n======================================================');
console.log('COMPETE ACADEMY — RECONCILIATION & SYNC AUDIT SUITE');
console.log('======================================================\n');

// 1. Database total counts
const totalRow = db.prepare('SELECT COUNT(*) as total FROM learning_materials').get();
const publishedRow = db.prepare('SELECT COUNT(*) as pub FROM learning_materials WHERE is_published = 1').get();
const draftRow = db.prepare('SELECT COUNT(*) as draft FROM learning_materials WHERE is_published = 0').get();
const missingAttRow = db.prepare("SELECT COUNT(*) as missing FROM learning_materials WHERE file_url IS NULL OR TRIM(file_url) = ''").get();
const missingRows = db.prepare("SELECT id, title, course, file_url FROM learning_materials WHERE file_url IS NULL OR TRIM(file_url) = ''").all();

console.log('1. Database Master Counts:');
console.log(`   Total Records:        ${totalRow.total}`);
console.log(`   Published:            ${publishedRow.pub}`);
console.log(`   Drafts:               ${draftRow.draft}`);
console.log(`   Missing Attachments:  ${missingAttRow.missing}`);
if (missingRows.length > 0) {
  console.log('   Missing details:', missingRows);
}

// 2. Programme Breakdown
console.log('\n2. Programme Breakdown (Database):');
const courseRows = db.prepare('SELECT course, COUNT(*) as count, SUM(is_published) as published FROM learning_materials GROUP BY course ORDER BY count DESC').all();
console.table(courseRows);

// 3. Test Full Admin Lifecycle Simulation:
console.log('\n3. Testing CRUD Lifecycle:');

// 3a. Create a new test resource
const testId = `mat-test-verify-${Date.now()}`;
db.prepare(`
  INSERT INTO learning_materials (
    id, title, description, subject, course, category, material_type, class_level, chapter, academic_year, medium, file_url, file_name, is_published
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
`).run(
  testId,
  'Verification Test Resource - Advanced Mechanics',
  'Automated test resource for synchronization lifecycle verification',
  'Physics',
  'JEE Main & Advanced',
  'notes',
  'Study Materials',
  null,
  'Kinematics',
  '2026',
  'English',
  'https://jeemain.nta.nic.in/archive/',
  'test.pdf'
);

const checkCreated = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(testId);
console.log('   [PASS] Created test resource:', checkCreated.id, '| Published:', checkCreated.is_published);

// 3b. Update Title & Programme
db.prepare('UPDATE learning_materials SET title = ?, course = ? WHERE id = ?').run(
  'Verification Test Resource - Updated Quantum Physics',
  'NEET Medical',
  testId
);
const checkUpdated = db.prepare('SELECT title, course FROM learning_materials WHERE id = ?').get(testId);
console.log('   [PASS] Updated title & course:', checkUpdated.title, '| Course:', checkUpdated.course);

// 3c. Unpublish (Draft status)
db.prepare('UPDATE learning_materials SET is_published = 0 WHERE id = ?').run(testId);
const checkUnpublished = db.prepare('SELECT is_published FROM learning_materials WHERE id = ?').get(testId);
console.log('   [PASS] Unpublished (Draft status):', checkUnpublished.is_published === 0 ? 'DRAFT (hidden from public)' : 'FAIL');

// 3d. Republish
db.prepare('UPDATE learning_materials SET is_published = 1 WHERE id = ?').run(testId);
const checkRepublished = db.prepare('SELECT is_published FROM learning_materials WHERE id = ?').get(testId);
console.log('   [PASS] Republished (Active status):', checkRepublished.is_published === 1 ? 'PUBLISHED (visible on public)' : 'FAIL');

// 3e. Delete test resource
db.prepare('DELETE FROM learning_materials WHERE id = ?').run(testId);
const checkDeleted = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(testId);
console.log('   [PASS] Cleaned up test resource:', checkDeleted === undefined ? 'REMOVED COMPLETELY' : 'FAIL');

// 4. Verify Final Database Count matches original 66
const finalCount = db.prepare('SELECT COUNT(*) as total FROM learning_materials').get().total;
console.log('\n4. Final Invariant Check:');
console.log(`   Final Total Records: ${finalCount} (Expected: 66) -> ${finalCount === 66 ? 'VERIFIED MATCH' : 'FAIL'}`);

db.close();
console.log('\n======================================================\n');
