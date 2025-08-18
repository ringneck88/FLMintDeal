#!/bin/bash
# Copy production database to development environment

echo "🔄 Copying production database to development environment..."

# Step 1: Copy database from production to a temporary location
echo "📥 Downloading database from production..."
flyctl --app flmintdeal machine exec 78493e6c2015e8 'cat /data/data.db' > temp-prod-db.db

# Step 2: Upload database to development environment
echo "📤 Uploading database to development..."
flyctl --app flmintdeal-dev machine exec 080165ef047908 'cat > /data/data.db' < temp-prod-db.db

# Step 3: Clean up
echo "🧹 Cleaning up..."
rm temp-prod-db.db

echo "✅ Database copy completed successfully!"
echo "🌐 Team development environment ready at: https://flmintdeal-dev.fly.dev/admin"