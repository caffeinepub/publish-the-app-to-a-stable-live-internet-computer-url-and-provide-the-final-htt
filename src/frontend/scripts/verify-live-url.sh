#!/bin/bash

# Verify Live URL Availability
# This script checks if the deployed app is accessible and provides
# guidance if certificate propagation is still in progress.

LIVE_URL="$1"

if [ -z "$LIVE_URL" ]; then
    echo "Usage: bash frontend/scripts/verify-live-url.sh <URL>"
    echo "Example: bash frontend/scripts/verify-live-url.sh https://abc123-xyz789.icp0.io"
    exit 1
fi

echo "🔍 Verifying live URL: ${LIVE_URL}"
echo ""

# Try to fetch the URL
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$LIVE_URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Success! Your app is live and accessible."
    echo ""
    echo "   URL: ${LIVE_URL}"
    echo ""
    echo "🎉 You can now share this link with your special someone!"
    exit 0
elif [ "$HTTP_CODE" = "000" ]; then
    echo "⏳ Connection timeout or DNS not resolved yet"
    echo ""
    echo "This usually means certificate propagation is still in progress."
    echo ""
    echo "What to do:"
    echo "  1. Wait 30-60 seconds"
    echo "  2. Run this script again"
    echo "  3. Or try opening the URL in your browser"
    echo ""
    echo "If this persists after 5 minutes:"
    echo "  • Verify the canister ID: dfx canister id frontend --network ic"
    echo "  • Check canister status: dfx canister status frontend --network ic"
    exit 1
elif [ "$HTTP_CODE" = "404" ] || [ "$HTTP_CODE" = "502" ] || [ "$HTTP_CODE" = "503" ]; then
    echo "⚠️  HTTP ${HTTP_CODE} - Service temporarily unavailable"
    echo ""
    echo "This can happen during initial deployment or certificate setup."
    echo ""
    echo "What to do:"
    echo "  1. Wait 1-2 minutes"
    echo "  2. Run this script again"
    echo "  3. Check canister status: dfx canister status frontend --network ic"
    exit 1
else
    echo "⚠️  Unexpected HTTP code: ${HTTP_CODE}"
    echo ""
    echo "The URL may be accessible but returned an unexpected status."
    echo "Try opening it in your browser: ${LIVE_URL}"
    exit 1
fi
