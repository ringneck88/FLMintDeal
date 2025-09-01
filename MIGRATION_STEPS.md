# Database Migration: Dev → Production

**Migration Date**: $(date)
**Source**: flmintdeal-dev.fly.dev  
**Target**: flmintdeal.fly.dev

## 🛡️ Safety First: Create Backups

### Step 1: Backup Production Database
```bash
# Connect to production
flyctl ssh console --app flmintdeal

# Inside production container:
cd /data
sqlite3 data.db '.dump' > production_backup_$(date +%Y%m%d_%H%M%S).sql
ls -la production_backup*.sql
exit
```

### Step 2: Export Development Database  
```bash
# Connect to development
flyctl ssh console --app flmintdeal-dev

# Inside development container:
cd /data
sqlite3 data.db '.dump' > development_export_$(date +%Y%m%d_%H%M%S).sql
ls -la development_export*.sql
exit
```

## 📤 Migration Process

### Step 3: Download Development Data
```bash
# From your local machine
flyctl ssh sftp get --app flmintdeal-dev /data/development_export_[TIMESTAMP].sql ./dev_data.sql
```

### Step 4: Upload to Production
```bash
# Upload dev data to production
flyctl ssh sftp put --app flmintdeal ./dev_data.sql /data/dev_import.sql
```

### Step 5: Stop Production App (Critical!)
```bash
# Stop production for safe migration
flyctl machine stop --app flmintdeal $(flyctl machine list --app flmintdeal --json | jq -r '.[0].id')

# Or manually:
flyctl machine stop 78493e6c2015e8 --app flmintdeal
```

### Step 6: Perform Migration
```bash
# Connect to production (while stopped)
flyctl ssh console --app flmintdeal

# Inside production container:
cd /data

# Backup current database with timestamp
mv data.db data_old_$(date +%Y%m%d_%H%M%S).db

# Import development data
sqlite3 data.db < dev_import.sql

# Verify tables were created
sqlite3 data.db "SELECT name FROM sqlite_master WHERE type='table';"

# Check record counts
sqlite3 data.db "SELECT COUNT(*) FROM sqlite_master WHERE type='table';"

exit
```

### Step 7: Restart Production
```bash
# Start production app
flyctl machine start 78493e6c2015e8 --app flmintdeal

# Wait for startup
sleep 30

# Verify app is running
flyctl status --app flmintdeal
```

### Step 8: Verification
```bash
# Test production admin panel
# Visit: https://flmintdeal.fly.dev/admin

# Test API endpoints
curl -I https://flmintdeal.fly.dev/api/cannabinoids-types
curl -I https://flmintdeal.fly.dev/api/dosing-forms
```

## 🔄 Rollback Instructions (If Needed)

### Quick Rollback Process
```bash
# If something goes wrong, rollback immediately:

# 1. Stop production
flyctl machine stop 78493e6c2015e8 --app flmintdeal

# 2. Connect and restore
flyctl ssh console --app flmintdeal

# Inside container:
cd /data
mv data.db data_failed_migration.db
mv data_old_[TIMESTAMP].db data.db
exit

# 3. Restart production
flyctl machine start 78493e6c2015e8 --app flmintdeal
```

### Alternative: Restore from SQL Backup
```bash
# Connect to production
flyctl ssh console --app flmintdeal

# Inside container:
cd /data
mv data.db data_failed.db
sqlite3 data.db < production_backup_[TIMESTAMP].sql
exit

# Restart app
flyctl machine start 78493e6c2015e8 --app flmintdeal
```

## 📁 Files Created (Keep These!)

- `production_backup_[TIMESTAMP].sql` - Original production backup
- `data_old_[TIMESTAMP].db` - Original production database file
- `development_export_[TIMESTAMP].sql` - Development data export
- `dev_data.sql` - Local copy of development data

## ⚠️ Important Notes

1. **Downtime**: Production will be offline during steps 5-7 (5-10 minutes)
2. **Backup Retention**: Keep backup files for at least 1 week
3. **Testing**: Test admin panel and API endpoints after migration
4. **Content Types**: Dev has cannabis content types, ensure they match your needs
5. **Admin Users**: Development admin credentials will replace production ones

## 🧹 Cleanup (After 1 Week)
```bash
# Remove temporary files (only after confirming migration success)
rm -f dev_data.sql
flyctl ssh console --app flmintdeal --command "rm -f /data/dev_import.sql"
```

---

**Execute these steps one by one, and verify each step before proceeding to the next!**