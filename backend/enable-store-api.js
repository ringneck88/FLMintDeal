#!/usr/bin/env node

/**
 * Enable Store API by directly modifying the database
 * Uses Strapi's built-in database connection
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Enabling Store API Access...\n');

// Create a simple SQL script to enable permissions
const sqlScript = `
-- Enable Store API permissions for public role
INSERT OR IGNORE INTO up_permissions (action, subject, properties, conditions, role, enabled, created_at, updated_at)
SELECT
  'api::store.store.find',
  null,
  '{}',
  '[]',
  (SELECT id FROM up_roles WHERE type = 'public'),
  1,
  datetime('now'),
  datetime('now')
WHERE NOT EXISTS (
  SELECT 1 FROM up_permissions
  WHERE action = 'api::store.store.find'
  AND role = (SELECT id FROM up_roles WHERE type = 'public')
);

INSERT OR IGNORE INTO up_permissions (action, subject, properties, conditions, role, enabled, created_at, updated_at)
SELECT
  'api::store.store.findOne',
  null,
  '{}',
  '[]',
  (SELECT id FROM up_roles WHERE type = 'public'),
  1,
  datetime('now'),
  datetime('now')
WHERE NOT EXISTS (
  SELECT 1 FROM up_permissions
  WHERE action = 'api::store.store.findOne'
  AND role = (SELECT id FROM up_roles WHERE type = 'public')
);

INSERT OR IGNORE INTO up_permissions (action, subject, properties, conditions, role, enabled, created_at, updated_at)
SELECT
  'api::store.store.create',
  null,
  '{}',
  '[]',
  (SELECT id FROM up_roles WHERE type = 'public'),
  1,
  datetime('now'),
  datetime('now')
WHERE NOT EXISTS (
  SELECT 1 FROM up_permissions
  WHERE action = 'api::store.store.create'
  AND role = (SELECT id FROM up_roles WHERE type = 'public')
);
`;

const dbPath = path.join(__dirname, '.tmp', 'data.db');
const sqlFilePath = path.join(__dirname, 'enable-store-permissions.sql');

// Write SQL script to file
fs.writeFileSync(sqlFilePath, sqlScript);

console.log('📝 Created SQL script: enable-store-permissions.sql');
console.log('💾 Database location:', dbPath);

// Check if database exists
if (!fs.existsSync(dbPath)) {
  console.log('❌ Database not found. Make sure Strapi is running.');
  process.exit(1);
}

console.log('\n🔧 To enable Store API permissions:');
console.log('1. Stop Strapi server');
console.log('2. Run this command:');
console.log(`   sqlite3 "${dbPath}" < "${sqlFilePath}"`);
console.log('3. Restart Strapi server');
console.log('4. Test with: node scripts/direct-store-import.js\n');

// Alternative approach - try using better-sqlite3 if available
try {
  const Database = require('better-sqlite3');
  console.log('🚀 Found better-sqlite3, attempting direct database modification...');

  const db = new Database(dbPath);

  // Get public role ID
  const publicRole = db.prepare("SELECT id FROM up_roles WHERE type = 'public'").get();

  if (!publicRole) {
    console.log('❌ Public role not found in database');
    db.close();
    process.exit(1);
  }

  console.log(`✅ Found public role with ID: ${publicRole.id}`);

  // Check existing permissions
  const existingPerms = db.prepare("SELECT action FROM up_permissions WHERE role = ? AND action LIKE '%store%'").all(publicRole.id);
  console.log(`📋 Existing store permissions: ${existingPerms.length}`);

  // Insert permissions
  const insertPerm = db.prepare(`
    INSERT OR IGNORE INTO up_permissions (action, subject, properties, conditions, role, enabled, created_at, updated_at)
    VALUES (?, null, '{}', '[]', ?, 1, datetime('now'), datetime('now'))
  `);

  const permissions = [
    'api::store.store.find',
    'api::store.store.findOne',
    'api::store.store.create'
  ];

  let created = 0;
  permissions.forEach(action => {
    try {
      const result = insertPerm.run(action, publicRole.id);
      if (result.changes > 0) {
        console.log(`✅ Created permission: ${action}`);
        created++;
      } else {
        console.log(`⏭️  Permission already exists: ${action}`);
      }
    } catch (error) {
      console.log(`❌ Failed to create ${action}: ${error.message}`);
    }
  });

  db.close();

  if (created > 0) {
    console.log(`\n🎉 Successfully created ${created} new permissions!`);
    console.log('🔄 Please restart Strapi to apply changes');
  } else {
    console.log('\n⚠️  All permissions already exist');
  }

} catch (error) {
  console.log(`⚠️  better-sqlite3 not available: ${error.message}`);
  console.log('📋 Please use the manual SQL approach above');
}

// Cleanup
try {
  fs.unlinkSync(sqlFilePath);
} catch (e) {
  // Ignore cleanup errors
}