#!/usr/bin/env node

/**
 * Inspect Database Structure
 * This script examines the Strapi database to understand the permissions structure
 */

const Database = require('better-sqlite3');
const path = require('path');

async function inspectDatabase() {
  console.log('🔍 Inspecting Database Structure');
  console.log('===============================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');
  console.log(`📁 Database path: ${dbPath}`);

  try {
    const db = new Database(dbPath);
    console.log('✅ Connected to database\n');

    // List all tables
    console.log('📋 Available tables:');
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table'
      ORDER BY name
    `).all();

    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });

    // Check permissions table structure
    console.log('\n🔧 Permissions table structure:');
    const permissionsSchema = db.prepare(`
      PRAGMA table_info(up_permissions)
    `).all();

    if (permissionsSchema.length > 0) {
      console.log('up_permissions columns:');
      permissionsSchema.forEach(col => {
        console.log(`   - ${col.name} (${col.type})`);
      });
    } else {
      console.log('❌ up_permissions table not found');
    }

    // Check roles table
    console.log('\n👥 Roles table structure:');
    const rolesSchema = db.prepare(`
      PRAGMA table_info(up_roles)
    `).all();

    if (rolesSchema.length > 0) {
      console.log('up_roles columns:');
      rolesSchema.forEach(col => {
        console.log(`   - ${col.name} (${col.type})`);
      });

      // Show existing roles
      console.log('\n📝 Existing roles:');
      const roles = db.prepare(`SELECT * FROM up_roles`).all();
      roles.forEach(role => {
        console.log(`   - ${role.name} (ID: ${role.id}, Type: ${role.type})`);
      });
    } else {
      console.log('❌ up_roles table not found');
    }

    // Check for permissions-role linking table
    console.log('\n🔗 Permission-Role linking table:');
    const linkSchema = db.prepare(`
      PRAGMA table_info(up_permissions_role_lnk)
    `).all();

    if (linkSchema.length > 0) {
      console.log('up_permissions_role_lnk columns:');
      linkSchema.forEach(col => {
        console.log(`   - ${col.name} (${col.type})`);
      });
    } else {
      console.log('❌ up_permissions_role_lnk table not found');
    }

    // Show sample permissions if they exist
    console.log('\n📋 Sample permissions:');
    try {
      const samplePerms = db.prepare(`
        SELECT * FROM up_permissions LIMIT 5
      `).all();

      if (samplePerms.length > 0) {
        samplePerms.forEach(perm => {
          console.log(`   - ID: ${perm.id}, Action: ${perm.action}`);
          Object.keys(perm).forEach(key => {
            if (key !== 'id' && key !== 'action') {
              console.log(`     ${key}: ${perm[key]}`);
            }
          });
          console.log('');
        });
      } else {
        console.log('   No permissions found');
      }
    } catch (e) {
      console.log(`   Error reading permissions: ${e.message}`);
    }

    db.close();

  } catch (error) {
    console.error('❌ Error inspecting database:', error.message);
  }
}

// Try to run inspection
try {
  require('better-sqlite3');
  inspectDatabase().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      inspectDatabase().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}