#!/usr/bin/env node

/**
 * Fix API Permissions for Store Content Type
 * This script directly modifies the database to enable Store API permissions
 */

const Database = require('better-sqlite3');
const path = require('path');

async function fixStorePermissions() {
  console.log('🔧 Fixing Store API Permissions');
  console.log('===============================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');
  console.log(`📁 Database path: ${dbPath}`);

  try {
    const db = new Database(dbPath);
    console.log('✅ Connected to database\n');

    // First, check if permissions already exist
    console.log('🔍 Checking existing permissions...');
    const existingPermissions = db.prepare(`
      SELECT p.id, p.action, r.name as role_name
      FROM up_permissions p
      JOIN up_permissions_role_lnk prl ON p.id = prl.permission_id
      JOIN up_roles r ON prl.role_id = r.id
      WHERE p.action LIKE 'api::store.store.%'
    `).all();

    console.log(`Found ${existingPermissions.length} existing store permissions:`);
    existingPermissions.forEach(perm => {
      console.log(`   - ${perm.role_name}: ${perm.action}`);
    });

    // Get the Public role ID
    const publicRole = db.prepare(`
      SELECT id, name FROM up_roles WHERE type = 'public'
    `).get();

    if (!publicRole) {
      console.log('❌ Public role not found');
      return;
    }

    console.log(`\n🎯 Public role found: ID ${publicRole.id}`);

    // Generate current timestamp in milliseconds
    const now = Date.now();
    const nowISO = new Date(now).toISOString();

    // Define the permissions we need for Store API
    const requiredPermissions = [
      'api::store.store.find',
      'api::store.store.findOne',
      'api::store.store.create',
      'api::store.store.update',
      'api::store.store.delete'
    ];

    console.log('\n🔧 Creating Store API permissions...');

    // Begin transaction
    db.exec('BEGIN TRANSACTION');

    let permissionsCreated = 0;
    let permissionsSkipped = 0;

    for (const action of requiredPermissions) {
      // Check if permission already exists
      const existing = db.prepare(`
        SELECT p.id FROM up_permissions p
        JOIN up_permissions_role_lnk prl ON p.id = prl.permission_id
        WHERE p.action = ? AND prl.role_id = ?
      `).get(action, publicRole.id);

      if (existing) {
        console.log(`   ⏭️  ${action} permission already exists`);
        permissionsSkipped++;
        continue;
      }

      // Generate a unique document_id
      const documentId = require('crypto').randomBytes(12).toString('hex');

      // Insert the permission
      const insertPerm = db.prepare(`
        INSERT INTO up_permissions (
          document_id,
          action,
          created_at,
          updated_at,
          published_at,
          created_by_id,
          updated_by_id,
          locale
        )
        VALUES (?, ?, ?, ?, ?, NULL, NULL, NULL)
      `);

      const permResult = insertPerm.run(documentId, action, now, now, now);
      const permissionId = permResult.lastInsertRowid;

      // Link permission to Public role
      const linkPerm = db.prepare(`
        INSERT INTO up_permissions_role_lnk (permission_id, role_id, permission_ord)
        VALUES (?, ?, ?)
      `);

      linkPerm.run(permissionId, publicRole.id, permissionId);

      console.log(`   ✅ Created ${action} permission (ID: ${permissionId})`);
      permissionsCreated++;
    }

    // Commit transaction
    db.exec('COMMIT');

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Created: ${permissionsCreated} permissions`);
    console.log(`   ⏭️  Skipped: ${permissionsSkipped} permissions (already exist)`);

    // Verify the permissions were created
    console.log('\n🔍 Verifying permissions...');
    const finalPermissions = db.prepare(`
      SELECT p.id, p.action, r.name as role_name
      FROM up_permissions p
      JOIN up_permissions_role_lnk prl ON p.id = prl.permission_id
      JOIN up_roles r ON prl.role_id = r.id
      WHERE p.action LIKE 'api::store.store.%' AND r.type = 'public'
    `).all();

    console.log(`Final store permissions for Public role:`);
    finalPermissions.forEach(perm => {
      console.log(`   ✅ ${perm.action}`);
    });

    db.close();

    console.log('\n🎉 Store API permissions have been configured!');
    console.log('\n🔄 Please restart Strapi for permissions to take effect:');
    console.log('   1. Stop the current Strapi server (Ctrl+C)');
    console.log('   2. Run: npm run develop');
    console.log('   3. Check Settings → Roles → Public → Store in admin panel');

  } catch (error) {
    console.error('❌ Error fixing permissions:', error.message);
    console.error('Stack trace:', error.stack);
    if (error.message.includes('no such table')) {
      console.log('\n💡 Database tables may not be initialized yet.');
      console.log('   Make sure Strapi has been started at least once.');
    }
  }
}

// Install better-sqlite3 if not available
try {
  require('better-sqlite3');
  fixStorePermissions().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      fixStorePermissions().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}