const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Open SQLite database
const sqliteDb = new Database('.tmp/data.db', { readonly: true });

console.log('🔍 Analyzing SQLite database...');

// Get all tables
const tables = sqliteDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();

console.log('📋 Found tables:', tables.map(t => t.name).join(', '));

// Create export directory
const exportDir = 'data-export';
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
}

// Export each table
for (const table of tables) {
    const tableName = table.name;
    console.log(`\n📦 Exporting table: ${tableName}`);
    
    try {
        // Get table schema
        const schema = sqliteDb.prepare(`PRAGMA table_info(${tableName})`).all();
        
        // Get all data
        const data = sqliteDb.prepare(`SELECT * FROM ${tableName}`).all();
        
        console.log(`   📊 Records found: ${data.length}`);
        
        if (data.length > 0) {
            // Show sample of first record
            console.log('   📋 Sample record:', JSON.stringify(data[0], null, 2));
        }
        
        // Save to JSON file
        const exportData = {
            tableName,
            schema,
            data,
            recordCount: data.length
        };
        
        fs.writeFileSync(
            path.join(exportDir, `${tableName}.json`),
            JSON.stringify(exportData, null, 2)
        );
        
        console.log(`   ✅ Exported to: ${exportDir}/${tableName}.json`);
        
    } catch (error) {
        console.error(`   ❌ Error exporting ${tableName}:`, error.message);
    }
}

// Create summary
const summary = {
    exportDate: new Date().toISOString(),
    tables: tables.map(t => t.name),
    totalTables: tables.length
};

fs.writeFileSync(
    path.join(exportDir, 'export-summary.json'),
    JSON.stringify(summary, null, 2)
);

sqliteDb.close();

console.log('\n🎉 Data export completed!');
console.log(`📁 Check the '${exportDir}' directory for exported data`);
console.log('💡 Next step: Review the exported data and prepare PostgreSQL import');