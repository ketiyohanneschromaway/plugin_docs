# Agentic SPM Plugin — Installation Guide

## Prerequisites

Before you install, make sure you have:

- **Node.js** v18 or later installed (`node --version` to check)
- **OpenClaw CLI** installed and accessible in your terminal
- A terminal with access to your home directory

The plugin uses a **secp256k1 keypair** to authenticate your client with the Guardian AI API. You'll generate this in Step 1.

---

## Step 1: Generate a secp256k1 Keypair

> **Skip this step** if you already have a keypair saved at `~/.config/ai-guardian/guard-client-key`.

Your keypair is a private/public key pair used to sign requests to the Chromia blockchain. Think of the private key as your password — keep it secret.

### 1.1 Generate the keypair

Run this command in your terminal. It uses Node's built-in `crypto` module — no extra dependencies needed:

```bash
node -e "const crypto=require('crypto');const k=crypto.randomBytes(32).toString('hex');const{createECDH}=crypto;const ec=createECDH('secp256k1');ec.setPrivateKey(k,'hex');console.log('#Keypair generated using secp256k1');console.log('#'+new Date().toString());console.log('privkey='+k);console.log('pubkey='+ec.getPublicKey('hex','compressed'))"
```

You'll see output like this:

```
#Keypair generated using secp256k1
#Thu Jan 01 2026 12:00:00 GMT+0000 (UTC)
privkey=ccce16227c7c2891faaee460f4a08bddfc59bd58c48d2cab59b7cac11dfc6807
pubkey=02dfcbcd04fb1df9941f86b7f026fdec8fbfaabc2808c95f92ef8f92035536eba8
```

> **Important:** Copy and save both keys immediately. The private key cannot be recovered if lost.

### 1.2 Create the config directory

```bash
mkdir -p ~/.config/ai-guardian
```

### 1.3 Save the keypair to a file

Create the file `~/.config/ai-guardian/guard-client-key` with the exact format below. **Do not use JSON** — the plugin expects a plain `key=value` format.

```
#Keypair generated using secp256k1
#<Day> <Month> <Date> <Year> <Time> <Timezone>
privkey=YOUR_PRIVATE_KEY_HEX
pubkey=YOUR_PUBLIC_KEY_HEX
```

Replace `YOUR_PRIVATE_KEY_HEX` and `YOUR_PUBLIC_KEY_HEX` with your values from Step 1.1.

---

## Step 2: Install the Plugin

Run the following command to install the Agentic SPM via the OpenClaw CLI:

```bash
openclaw plugins install @chrguard/ai-guardian-plugin
```

This command downloads the plugin from npm and places it in `~/.openclaw/extensions/ai-guardian-plugin`. The `openclaw.json` file will be partially updated automatically, but you still need to configure it manually as described in Step 3.

---

## Step 3: Configure openclaw.json

Open your `openclaw.json` file — typically located at `~/.openclaw/openclaw.json`.

Below is the **complete target state** of the plugin-related sections. Use this as your reference:

```json
{
    "...": "...",

    "plugins": {
        "enabled": true,
        "allow": [
            "...",
            "ai-guardian-plugin"
        ],
        "load": {
            "paths": [
                "...",
                "/Users/<your-username>/.openclaw/extensions/ai-guardian-plugin"
            ]
        },
        "entries": {
            "...": "...",
            "ai-guardian-plugin": {
                "enabled": true,
                "config": {
                    "enabled": true,
                    "enforceDecision": true,
                    "chromiaBrid": "5D007915E9DE53AA29784820E8F41CE65A4436703E23B8AF49B83C7FB4FDB048",
                    "chromiaNodes": [
                        "https://node6.testnet.chromia.com:7740",
                        "https://node7.testnet.chromia.com:7740",
                        "https://node8.testnet.chromia.com:7740"
                    ],
                    "chromiaJudgeOperation": "judge_action",
                    "chromiaStatusQuery": "get_judgment_status",
                    "chromiaFtAuth": false,
                    "chromiaTxAwait": true,
                    "timeoutMs": 15000,
                    "chromiaTxTimeoutMs": 25000,
                    "chromiaQueryTimeoutMs": 8000,
                    "chromiaPollTimeoutMs": 30000,
                    "chromiaPollIntervalMs": 1000,
                    "chromiaSecretPath": "~/.config/ai-guardian/guard-client-key"
                }
            }
        },
        "installs": {
            "ai-guardian-plugin": {
                "source": "npm",
                "spec": "@chrguard/ai-guardian-plugin",
                "installPath": "/Users/<your-username>/.openclaw/extensions/ai-guardian-plugin",
                "...": "..."
            }
        }
    }
}
```

> `"...": "..."` represents **existing fields** in your file — leave them as-is. Replace `<your-username>` with your actual macOS username.

Now apply each of these four sub-steps to get there:

### 3.1 Enable plugins

Make sure `plugins.enabled` is set to `true`:

```json
"plugins": {
    "enabled": true,
    ...
}
```

### 3.2 Add to the allow list

In `plugins.allow`, add `"ai-guardian-plugin"`:

```json
"allow": [
    "...",
    "ai-guardian-plugin"
]
```

### 3.3 Register the load path

Copy the `installPath` value from `plugins.installs.ai-guardian-plugin` and add it to `plugins.load.paths`:

```json
"load": {
    "paths": [
        "...",
        "/Users/<your-username>/.openclaw/extensions/ai-guardian-plugin"
    ]
}
```

> The path must **match exactly** what is in `installPath` — including the username.

### 3.4 Add the plugin entry

Under `plugins.entries`, add the full configuration block:

```json
"entries": {
    "ai-guardian-plugin": {
        "enabled": true,
        "config": {
            "enabled": true,
            "enforceDecision": true,
            "chromiaBrid": "5D007915E9DE53AA29784820E8F41CE65A4436703E23B8AF49B83C7FB4FDB048",
            "chromiaNodes": [
                "https://node6.testnet.chromia.com:7740",
                "https://node7.testnet.chromia.com:7740",
                "https://node8.testnet.chromia.com:7740"
            ],
            "chromiaJudgeOperation": "judge_action",
            "chromiaStatusQuery": "get_judgment_status",
            "chromiaFtAuth": false,
            "chromiaTxAwait": true,
            "timeoutMs": 15000,
            "chromiaTxTimeoutMs": 25000,
            "chromiaQueryTimeoutMs": 8000,
            "chromiaPollTimeoutMs": 30000,
            "chromiaPollIntervalMs": 1000,
            "chromiaSecretPath": "~/.config/ai-guardian/guard-client-key"
        }
    }
}
```

> The `chromiaSecretPath` points to the keypair file you created in Step 1. The `~` automatically expands to your home directory on macOS.

---

## Step 4: Restart the Gateway

Once all changes are saved, restart the OpenClaw gateway to load the new plugin configuration:

```bash
openclaw gateway restart
```

You should see a confirmation message that the gateway has restarted and the plugin is active.

---

## Summary

After completing all steps, your setup should reflect the following:

| Field | Expected Value |
|---|---|
| `plugins.enabled` | `true` |
| `plugins.allow` | includes `"ai-guardian-plugin"` |
| `plugins.load.paths` | includes the `installPath` from `plugins.installs` |
| `plugins.entries.ai-guardian-plugin` | full config block as shown above |
| `chromiaSecretPath` | `~/.config/ai-guardian/guard-client-key` |
| `enforceDecision` | `true` (enables actual blocking on the blockchain verdict) |
