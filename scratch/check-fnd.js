const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/compete_academy.db');
console.log('Opening db at:', dbPath);
const db = new Database(dbPath);

console.log('--- FOUNDATION ROWS (SAMPLE 5) ---');
console.log(db.prepare("SELECT id, title, course, class_level, file_url FROM learning_materials WHERE course = 'Foundation Classes' LIMIT 5").all());

console.log('--- ALL COURSES AND COUNTS ---');
console.log(db.prepare("SELECT course, count(*) as count, sum(is_published) as published FROM learning_materials GROUP BY course").all());
