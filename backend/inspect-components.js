#!/usr/bin/env node

/**
 * Inspect Component Tables
 */

const Database = require('better-sqlite3');
const path = require('path');

async function inspectComponents() {
  console.log('🔍 Inspecting Component Tables');
  console.log('=============================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');

  try {
    const db = new Database(dbPath);

    // Check component tables structure
    const componentTables = [
      'components_common_addresses',
      'components_common_hours',
      'components_store_service_tags',
      'stores',
      'stores_cmps'
    ];

    for (const tableName of componentTables) {
      console.log(`📋 Table: ${tableName}`);

      try {
        const schema = db.prepare(`PRAGMA table_info(${tableName})`).all();

        if (schema.length > 0) {
          schema.forEach(col => {
            console.log(`   - ${col.name} (${col.type})`);
          });

          // Show sample data
          console.log(`\n   Sample data:`);
          const sample = db.prepare(`SELECT * FROM ${tableName} LIMIT 2`).all();
          if (sample.length > 0) {
            sample.forEach((row, i) => {
              console.log(`   Row ${i + 1}:`);
              Object.keys(row).forEach(key => {
                console.log(`     ${key}: ${row[key]}`);
              });
            });
          } else {
            console.log('     (no data)');
          }
        } else {
          console.log('   ❌ Table not found');
        }
      } catch (e) {
        console.log(`   ❌ Error: ${e.message}`);
      }

      console.log('');
    }

    db.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Install better-sqlite3 if not available
try {
  require('better-sqlite3');
  inspectComponents().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      inspectComponents().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}