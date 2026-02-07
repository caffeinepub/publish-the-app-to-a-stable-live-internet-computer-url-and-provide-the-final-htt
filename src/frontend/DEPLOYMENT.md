# Live Deployment Guide

This guide explains how to deploy your Valentine's Day proposal app to the Internet Computer mainnet for production use.

## Prerequisites

Before deploying to mainnet, ensure you have:

1. **dfx installed** (Internet Computer SDK)
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Identity configured**
   ```bash
   dfx identity get-principal
   ```
   If you don't have an identity, create one:
   ```bash
   dfx identity new my-identity
   dfx identity use my-identity
   ```

3. **Cycles available** for deployment
   - Get free cycles from the [cycles faucet](https://faucet.dfinity.org/)
   - Or purchase cycles through an exchange
   - You'll need approximately 1-2 trillion cycles for initial deployment

## Deployment Steps

### 1. Clean Install and Build

Start from a clean state:

