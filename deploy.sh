#!/bin/bash

# Deployment script for FLMintDeals to Fly.io
# Make sure you have fly CLI installed and are logged in

echo "🚀 Deploying FLMintDeals to Fly.io..."

# Deploy backend first
echo "📦 Deploying Strapi backend..."
cd backend
flyctl deploy --app flmintdeal
if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully"
else
    echo "❌ Backend deployment failed"
    exit 1
fi

# Deploy frontend
echo "🎨 Deploying Astro frontend..."
cd ../frontend
flyctl deploy --app flmintdeal-frontend
if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully"
    echo "🎉 Deployment complete!"
    echo "Frontend: https://flmintdeal-frontend.fly.dev"
    echo "Backend: https://flmintdeal.fly.dev"
else
    echo "❌ Frontend deployment failed"
    exit 1
fi