#!/bin/bash

# FLMintDeal Database Migration Script
# Migrates data from development to production with backup safety
# Date: $(date +%Y-%m-%d)

set -e  # Exit on any error

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEV_APP="flmintdeal-dev"
PROD_APP="flmintdeal"

echo "🚀 Starting database migration from $DEV_APP to $PROD_APP"
echo "📅 Timestamp: $TIMESTAMP"
echo ""

# Step 1: Create production backup
echo "📦 Step 1: Creating production database backup..."
flyctl ssh console --app $PROD_APP --command "sqlite3 /data/data.db '.dump' > /data/prod_backup_$TIMESTAMP.sql && echo 'Production backup created: prod_backup_$TIMESTAMP.sql'"

# Step 2: Export development database
echo "📤 Step 2: Exporting development database..."
flyctl ssh console --app $DEV_APP --command "sqlite3 /data/data.db '.dump' > /data/dev_export_$TIMESTAMP.sql && echo 'Development export created: dev_export_$TIMESTAMP.sql'"

# Step 3: Copy dev export to local temp
echo "📥 Step 3: Downloading development data..."
flyctl ssh sftp get --app $DEV_APP /data/dev_export_$TIMESTAMP.sql ./dev_export_$TIMESTAMP.sql

# Step 4: Upload dev data to production
echo "📤 Step 4: Uploading development data to production..."
flyctl ssh sftp put --app $PROD_APP ./dev_export_$TIMESTAMP.sql /data/dev_import_$TIMESTAMP.sql

# Step 5: Stop production app for safe migration
echo "🛑 Step 5: Stopping production app for migration..."
flyctl machine stop --app $PROD_APP $(flyctl machine list --app $PROD_APP --json | jq -r '.[0].id')

# Step 6: Import development data to production
echo "💾 Step 6: Importing development data to production..."
flyctl ssh console --app $PROD_APP --command "cd /data && mv data.db data_old_$TIMESTAMP.db && sqlite3 data.db < dev_import_$TIMESTAMP.sql && echo 'Migration completed successfully!'"

# Step 7: Restart production app
echo "▶️  Step 7: Starting production app..."
flyctl machine start --app $PROD_APP $(flyctl machine list --app $PROD_APP --json | jq -r '.[0].id')

# Step 8: Verify migration
echo "✅ Step 8: Verifying migration..."
sleep 30
flyctl ssh console --app $PROD_APP --command "sqlite3 /data/data.db 'SELECT name FROM sqlite_master WHERE type=\"table\";' | head -10"

echo ""
echo "🎉 Migration completed successfully!"
echo ""
echo "📋 Files created:"
echo "  - Production backup: prod_backup_$TIMESTAMP.sql"
echo "  - Development export: dev_export_$TIMESTAMP.sql"
echo "  - Old production DB: data_old_$TIMESTAMP.db"
echo ""
echo "🔄 To rollback if needed:"
echo "  flyctl ssh console --app $PROD_APP --command 'cd /data && mv data.db data_migrated.db && sqlite3 data.db < prod_backup_$TIMESTAMP.sql'"
echo ""
echo "🗑️  Cleanup old files (after verification):"
echo "  rm -f dev_export_$TIMESTAMP.sql"
