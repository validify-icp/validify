# 🚀 ICP Project Setup Guide

This guide will walk you through setting up the development environment, creating identities, deploying locally, and deploying to the Internet Computer (IC) mainnet.

---

## 🔧 1. Install Dependencies

### 📦 Required Tools

* [Node.js (v16 or v18)](https://nodejs.org/)
* [DFX SDK (from DFINITY)](https://internetcomputer.org/docs/current/developer-docs/setup/sdk-installation)

### 📥 Install DFX

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

> ✅ Restart your terminal after installing.

---

## 👤 2. Create and Use an Identity

### Create a new identity

```bash
dfx identity new <your-identity-name>
```

Example:

```bash
dfx identity new dev
```

### Use your identity

```bash
dfx identity use <your-identity-name>
```

Example:

```bash
dfx identity use dev
```

### Check current identity

```bash
dfx identity whoami
```

---

## 🎟 3. Redeem Coupon for Free Cycles

If you have a coupon code, redeem it using:

```bash
dfx ledger fabricate-cycles --coupon <YOUR_COUPON_CODE> --network ic
```

Example:

```bash
dfx ledger fabricate-cycles --coupon 9c167e82b2926e04a53d281e9f275c4f --network ic
```

Check your cycles balance:

```bash
dfx wallet --network ic balance
```

---

## 🧪 4. Deploy Canisters Locally

### Start the local replica

```bash
dfx start --background
```

### Deploy all canisters to local

```bash
dfx deploy
```

### OR deploy specific canister

```bash
dfx deploy <canister-name>
```

### View local frontend (if applicable)

```bash
http://localhost:4943/?canisterId=$(dfx canister id <frontend-canister-name>)
```

---

## 🌐 5. Deploy Canisters on IC Mainnet

### Step 1: Create Canisters on IC

```bash
dfx canister create <canister-name> --network ic
```

Or all at once:

```bash
dfx canister create --all --network ic
```

### Step 2: Top Up Canisters with Cycles

Example to top up with 5T cycles:

```bash
dfx canister top-up <canister-name> --amount 5000000000000 --network ic
```

### Step 3: Deploy to IC Network

```bash
dfx deploy --network ic
```

### Check Canister IDs

```bash
dfx canister id <canister-name> --network ic
```

### Access Frontend on ICP

```bash
https://<frontend-canister-id>.icp0.io/
```

---

## 📌 Notes

* All deployment settings are defined in `dfx.json`
* Make sure to commit your `.did` files and important build artifacts for frontend/backend interface integration.

---

## 💬 Need Help?

Join the [DFINITY Developer Forum](https://forum.dfinity.org/) or reach out to the ICP community on [Discord](https://discord.gg/hs3vPbvx2q)

---
