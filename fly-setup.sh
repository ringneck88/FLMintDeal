#!/bin/bash

# Setup script for Fly.io apps
# Run this once to create the Fly.io applications

echo "🛠️  Setting up Fly.io applications..."

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI is not installed. Please install it first:"
    echo "   https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

# Check if logged in
if ! fly auth whoami &> /dev/null; then
    echo "❌ Please log in to Fly.io first: fly auth login"
    exit 1
fi

echo "📦 Creating Strapi backend app..."
cd backend
fly apps create flmintdeals-backend --org personal
fly volumes create data --region iad --size 1

echo "🔐 Setting backend environment variables..."
echo "⚠️  Please set these secrets manually:"
echo "   fly secrets set APP_KEYS=\"$(openssl rand -base64 32),$(openssl rand -base64 32)\" --app flmintdeals-backend"
echo "   fly secrets set API_TOKEN_SALT=\"$(openssl rand -base64 32)\" --app flmintdeals-backend"
echo "   fly secrets set ADMIN_JWT_SECRET=\"$(openssl rand -base64 32)\" --app flmintdeals-backend"
echo "   fly secrets set TRANSFER_TOKEN_SALT=\"$(openssl rand -base64 32)\" --app flmintdeals-backend"
echo "   fly secrets set JWT_SECRET=\"$(openssl rand -base64 32)\" --app flmintdeals-backend"
echo "   fly secrets set ENCRYPTION_KEY=\"$(openssl rand -base64 32)\" --app flmintdeals-backend"

echo ""
echo "🎨 Creating Astro frontend app..."
cd ../frontend
fly apps create flmintdeals-frontend --org personal

echo ""
echo "✅ Setup complete! Next steps:"
echo "1. Set the backend secrets (commands shown above)"
echo "2. Run './deploy.sh' to deploy both applications"
echo "3. Configure your Strapi admin at https://flmintdeals-backend.fly.dev/admin"