#!/bin/bash

# Deployment script for FLMintDeals to Fly.io
# Make sure you have fly CLI installed and are logged in

echo "🚀 Deploying FLMintDeals to Fly.io..."

# Deploy backend first
echo "📦 Deploying Strapi backend..."
cd backend
fly deploy --app flmintdeals-backend
if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully"
else
    echo "❌ Backend deployment failed"
    exit 1
fi

# Deploy frontend
echo "🎨 Deploying Astro frontend..."
cd ../frontend
fly deploy --app flmintdeals-frontend
if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully"
    echo "🎉 Deployment complete!"
    echo "Frontend: https://flmintdeals-frontend.fly.dev"
    echo "Backend: https://flmintdeals-backend.fly.dev"
else
    echo "❌ Frontend deployment failed"
    exit 1
fi