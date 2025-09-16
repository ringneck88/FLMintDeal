#!/usr/bin/env node

/**
 * Explore Admin Database Schema
 * Find the correct table structure for admin permissions
 */

const Database = require('better-sqlite3');
const path = require('path');

async function exploreAdminDb() {
  console.log('🔍 Exploring Admin Database Schema');
  console.log('=================================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');

  try {
    const db = new Database(dbPath);

    // Get all table names
    console.log('📋 All Tables:');
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name LIKE '%admin%'
      ORDER BY name
    `).all();

    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });

    console.log('\n🔍 Admin Permissions Table Structure:');
    const permTableInfo = db.prepare(`PRAGMA table_info(admin_permissions)`).all();
    permTableInfo.forEach(col => {
      console.log(`   ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
    });

    console.log('\n📋 Sample Admin Permissions:');
    const samplePerms = db.prepare(`SELECT * FROM admin_permissions LIMIT 5`).all();
    samplePerms.forEach(perm => {
      console.log(`   ID: ${perm.id}`);
      console.log(`   Action: ${perm.action}`);
      console.log(`   Subject: ${perm.subject}`);
      console.log(`   Properties: ${perm.properties || 'None'}`);
      console.log(`   Conditions: ${perm.conditions || 'None'}`);
      console.log('');
    });

    console.log('🔗 Admin Roles Link Table Structure:');
    const roleLinkInfo = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name LIKE '%admin%role%'
    `).all();

    roleLinkInfo.forEach(table => {
      console.log(`\n   Table: ${table.name}`);
      try {
        const tableInfo = db.prepare(`PRAGMA table_info(${table.name})`).all();
        tableInfo.forEach(col => {
          console.log(`     ${col.name}: ${col.type}`);
        });
      } catch (e) {
        console.log(`     Error reading schema: ${e.message}`);
      }
    });

    console.log('\n👤 Admin Users and Roles:');
    const usersWithRoles = db.prepare(`
      SELECT au.id, au.email, au.firstname, au.lastname
      FROM admin_users au
      ORDER BY au.id
    `).all();

    usersWithRoles.forEach(user => {
      console.log(`   User: ${user.firstname} ${user.lastname} (${user.email})`);

      // Try to find role links
      try {
        const roleLinks = db.prepare(`
          SELECT ar.name, ar.code
          FROM admin_users_roles_lnk aurl
          JOIN admin_roles ar ON aurl.role_id = ar.id
          WHERE aurl.user_id = ?
        `).all(user.id);

        if (roleLinks.length > 0) {
          roleLinks.forEach(role => {
            console.log(`     Role: ${role.name} (${role.code})`);
          });
        } else {
          console.log(`     ❌ No roles assigned!`);
        }
      } catch (e) {
        console.log(`     Error getting roles: ${e.message}`);
      }
      console.log('');
    });

    db.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Install better-sqlite3 if not available
try {
  require('better-sqlite3');
  exploreAdminDb().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      exploreAdminDb().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}