const fs = require('fs');
const path = require('path');

// This script will generate SQL INSERT statements for PostgreSQL
// Since we can't directly connect to the fly.io database from here,
// we'll generate the SQL that can be executed remotely

console.log('🔄 Creating PostgreSQL import script...');

const exportDir = 'data-export';
const outputFile = 'postgres-import.sql';

// Read the exported data
const dealsData = JSON.parse(fs.readFileSync(path.join(exportDir, 'deals.json'), 'utf8'));
const adminUsersData = JSON.parse(fs.readFileSync(path.join(exportDir, 'admin_users.json'), 'utf8'));
const adminRolesData = JSON.parse(fs.readFileSync(path.join(exportDir, 'admin_roles.json'), 'utf8'));

let sqlStatements = [];

// Add header comment
sqlStatements.push('-- FLMintDeals Data Migration');
sqlStatements.push('-- Generated from SQLite export');
sqlStatements.push('-- Execute this script in your PostgreSQL database');
sqlStatements.push('');

// First, import admin roles (needed for admin users)
console.log('📋 Processing admin roles...');
if (adminRolesData.data && adminRolesData.data.length > 0) {
    sqlStatements.push('-- Import admin roles');
    for (const role of adminRolesData.data) {
        const values = [
            role.id || 'DEFAULT',
            role.document_id ? `'${role.document_id}'` : 'NULL',
            role.name ? `'${role.name.replace(/'/g, "''")}'` : 'NULL',
            role.code ? `'${role.code}'` : 'NULL',
            role.description ? `'${role.description.replace(/'/g, "''")}'` : 'NULL',
            role.created_at ? `'${new Date(role.created_at).toISOString()}'` : 'NULL',
            role.updated_at ? `'${new Date(role.updated_at).toISOString()}'` : 'NULL',
            role.published_at ? `'${new Date(role.published_at).toISOString()}'` : 'NULL',
            role.created_by_id || 'NULL',
            role.updated_by_id || 'NULL',
            role.locale ? `'${role.locale}'` : 'NULL'
        ];
        
        const insertSQL = `INSERT INTO admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (${values.join(', ')});`;
        sqlStatements.push(insertSQL);
    }
    sqlStatements.push('');
}

// Import admin users
console.log('👤 Processing admin users...');
if (adminUsersData.data && adminUsersData.data.length > 0) {
    sqlStatements.push('-- Import admin users');
    for (const user of adminUsersData.data) {
        const values = [
            user.id || 'DEFAULT',
            user.document_id ? `'${user.document_id}'` : 'NULL',
            user.firstname ? `'${user.firstname.replace(/'/g, "''")}'` : 'NULL',
            user.lastname ? `'${user.lastname.replace(/'/g, "''")}'` : 'NULL',
            user.username ? `'${user.username.replace(/'/g, "''")}'` : 'NULL',
            user.email ? `'${user.email}'` : 'NULL',
            user.password ? `'${user.password}'` : 'NULL',
            user.reset_password_token ? `'${user.reset_password_token}'` : 'NULL',
            user.registration_token ? `'${user.registration_token}'` : 'NULL',
            user.is_active ? (user.is_active ? 'true' : 'false') : 'NULL',
            user.blocked ? (user.blocked ? 'true' : 'false') : 'NULL',
            user.prefered_language ? `'${user.prefered_language}'` : 'NULL',
            user.created_at ? `'${new Date(user.created_at).toISOString()}'` : 'NULL',
            user.updated_at ? `'${new Date(user.updated_at).toISOString()}'` : 'NULL',
            user.published_at ? `'${new Date(user.published_at).toISOString()}'` : 'NULL',
            user.created_by_id || 'NULL',
            user.updated_by_id || 'NULL',
            user.locale ? `'${user.locale}'` : 'NULL'
        ];
        
        const insertSQL = `INSERT INTO admin_users (id, document_id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (${values.join(', ')});`;
        sqlStatements.push(insertSQL);
    }
    sqlStatements.push('');
}

// Import deals
console.log('🛍️  Processing deals...');
if (dealsData.data && dealsData.data.length > 0) {
    sqlStatements.push('-- Import deals');
    for (const deal of dealsData.data) {
        const values = [
            deal.id || 'DEFAULT',
            deal.document_id ? `'${deal.document_id}'` : 'NULL',
            deal.title ? `'${deal.title.replace(/'/g, "''")}'` : 'NULL',
            deal.description ? `'${deal.description.replace(/'/g, "''")}'` : 'NULL',
            deal.price || 'NULL',
            deal.original_price || 'NULL',
            deal.discount || 'NULL',
            deal.category ? `'${deal.category.replace(/'/g, "''")}'` : 'NULL',
            deal.featured ? (deal.featured ? 'true' : 'false') : 'NULL',
            deal.slug ? `'${deal.slug}'` : 'NULL',
            deal.created_at ? `'${new Date(deal.created_at).toISOString()}'` : 'NULL',
            deal.updated_at ? `'${new Date(deal.updated_at).toISOString()}'` : 'NULL',
            deal.published_at ? `'${new Date(deal.published_at).toISOString()}'` : 'NULL',
            deal.created_by_id || 'NULL',
            deal.updated_by_id || 'NULL',
            deal.locale ? `'${deal.locale}'` : 'NULL'
        ];
        
        const insertSQL = `INSERT INTO deals (id, document_id, title, description, price, original_price, discount, category, featured, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (${values.join(', ')});`;
        sqlStatements.push(insertSQL);
    }
    sqlStatements.push('');
}

// Update sequences to prevent ID conflicts
sqlStatements.push('-- Update sequences to prevent ID conflicts');
sqlStatements.push("SELECT setval('admin_users_id_seq', (SELECT MAX(id) FROM admin_users));");
sqlStatements.push("SELECT setval('admin_roles_id_seq', (SELECT MAX(id) FROM admin_roles));");
sqlStatements.push("SELECT setval('deals_id_seq', (SELECT MAX(id) FROM deals));");
sqlStatements.push('');

// Write the SQL file
const sqlContent = sqlStatements.join('\n');
fs.writeFileSync(outputFile, sqlContent);

console.log('✅ PostgreSQL import script created!');
console.log(`📁 File: ${outputFile}`);
console.log('');
console.log('📊 Summary:');
console.log(`   - Admin users: ${adminUsersData.recordCount}`);
console.log(`   - Deals: ${dealsData.recordCount}`);
console.log('');
console.log('🚀 Next steps:');
console.log('1. Copy the SQL file to your Fly.io PostgreSQL database');
console.log('2. Execute the SQL statements to import your data');
console.log('3. Verify the import was successful');