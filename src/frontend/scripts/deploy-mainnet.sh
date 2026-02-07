#!/bin/bash

# Deploy to Internet Computer Mainnet
# This script deploys both backend and frontend canisters to mainnet
# and prints the stable HTTPS URL for the deployed application.

set -e  # Exit on any error

echo "🚀 Starting mainnet deployment..."
echo ""

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ Error: dfx is not installed"
    echo "Install it with: sh -ci \"\$(curl -fsSL https://internetcomputer.org/install.sh)\""
    exit 1
fi

# Check if we have an identity
if ! dfx identity get-principal &> /dev/null; then
    echo "❌ Error: No dfx identity found"
    echo "Create one with: dfx identity new my-identity && dfx identity use my-identity"
    exit 1
fi

echo "📦 Building frontend..."
cd frontend
pnpm install --silent
pnpm run build
cd ..

echo ""
echo "🌐 Deploying to Internet Computer mainnet..."
echo "   (This may take 2-5 minutes for first deployment)"
echo ""

# Deploy to mainnet
dfx deploy --network ic

echo ""
echo "✅ Deployment successful!"
echo ""

# Get the frontend canister ID
FRONTEND_CANISTER_ID=$(dfx canister id frontend --network ic)

# Construct the live URL
LIVE_URL="https://${FRONTEND_CANISTER_ID}.icp0.io"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Your app is live!"
echo ""
echo "   Live URL: ${LIVE_URL}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏳ Important: If you see 'Unknown domain' when opening the URL:"
echo "   • Wait 30-60 seconds for SSL certificate propagation"
echo "   • Refresh the page"
echo "   • Try incognito mode or a different browser"
echo ""
echo "📝 Record this URL in frontend/LIVE_URL.md for future reference"
echo ""
echo "🔍 Verify deployment:"
echo "   bash frontend/scripts/verify-live-url.sh ${LIVE_URL}"
echo ""
