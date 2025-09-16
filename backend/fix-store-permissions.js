const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open the database
const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Fixing Store API permissions...');

// Get the public role ID
db.get("SELECT id FROM up_roles WHERE type = 'public'", (err, role) => {
  if (err) {
    console.error('Error finding public role:', err);
    return;
  }

  if (!role) {
    console.error('Public role not found');
    return;
  }

  console.log(`Found public role with ID: ${role.id}`);

  // Check if permissions already exist
  db.all("SELECT * FROM up_permissions WHERE role = ? AND action LIKE '%store%'", [role.id], (err, existing) => {
    if (err) {
      console.error('Error checking existing permissions:', err);
      return;
    }

    if (existing && existing.length > 0) {
      console.log('Store permissions already exist:', existing.map(p => p.action));
    } else {
      console.log('Creating Store permissions...');

      // Insert permissions for Store API
      const permissions = [
        {
          action: 'api::store.store.find',
          enabled: 1
        },
        {
          action: 'api::store.store.findOne',
          enabled: 1
        },
        {
          action: 'api::store.store.create',
          enabled: 1
        }
      ];

      permissions.forEach(perm => {
        db.run(
          "INSERT INTO up_permissions (action, subject, properties, conditions, role, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
          [perm.action, null, '{}', '[]', role.id, perm.enabled],
          function(err) {
            if (err) {
              console.error(`Error inserting permission ${perm.action}:`, err);
            } else {
              console.log(`✅ Created permission: ${perm.action}`);
            }
          }
        );
      });
    }

    setTimeout(() => {
      db.close();
      console.log('🎉 Store permissions setup complete! Restart Strapi to apply changes.');
    }, 1000);
  });
});