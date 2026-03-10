# Agentic SPM Plugin — Installation Guide

## Prerequisites

Before installing the plugin, you need a **secp256k1 keypair**. This keypair is used to authenticate your client with the Guardian AI API.

---

## Step 1: Generate a secp256k1 Keypair

If you already have a keypair saved at `~/.config/ai-guardian/guard-client-key`, skip to [Step 2](#step-2-install-the-plugin).

### 1.1 Generate the keypair

Run the following command in your terminal to generate a secp256k1 private/public key pair:

```bash
node -e "const crypto=require('crypto');const k=crypto.randomBytes(32).toString('hex');const{createECDH}=crypto;const ec=createECDH('secp256k1');ec.setPrivateKey(k,'hex');console.log('#Keypair generated using secp256k1');console.log('#'+new Date().toString());console.log('privkey='+k);console.log('pubkey='+ec.getPublicKey('hex','compressed'))"
```

You should see output similar to:

```
#Keypair generated using secp256k1
#<Day> <Month> <Date> <Year> <Time> <Timezone>
privkey=ccce16227c7c2891faaee460f4a08bddfc59bd58c48d2cab59b7cac11dfc6807
pubkey=02dfcbcd04fb1df9941f86b7f026fdec8fbfaabc2808c95f92ef8f92035536eba8
```

### 1.2 Create the config directory

```bash
mkdir -p ~/.config/ai-guardian
```

### 1.3 Save the keypair to a file

Create the file `~/.config/ai-guardian/guard-client-key` with the following format:

```
#Keypair generated using secp256k1
#<Day> <Month> <Date> <Year> <Time> <Timezone>
privkey=YOUR_PRIVATE_KEY_HEX
pubkey=YOUR_PUBLIC_KEY_HEX
```

> **Important:** Replace `YOUR_PRIVATE_KEY_HEX` and `YOUR_PUBLIC_KEY_HEX` with the values generated in Step 1.1. The file must **not** be in JSON format — use the plain key=value format shown above.

---

Run the following command to install the Agentic SPM via OpenClaw:

```bash
openclaw plugins install @chrguard/ai-guardian-plugin
```

---

Once the plugin is installed, open your `openclaw.json` file. This is typically located in your OpenClaw directory (e.g., `~/.openclaw/openclaw.json`).

Here is the **complete target state** of `openclaw.json` for everything this guide touches — use this as your reference as you work through the sub-steps below:

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

> `"...": "..."` represents existing fields in your file that you should leave untouched. Replace `<your-username>` with your actual macOS username.

---

### 1.4 Enable plugins

Make sure `plugins.enabled` is set to `true`:

```json
"plugins": {
    "enabled": true,
    ...
}
```

### 1.5 Verify the install entry

Check that `plugins.installs` contains an entry for `ai-guardian-plugin`. It should have been added automatically by the install command:

```json
"installs": {
    "ai-guardian-plugin": {
        "source": "npm",
        "spec": "@chrguard/ai-guardian-plugin",
        "installPath": "/Users/<your-username>/.openclaw/extensions/ai-guardian-plugin",
        ...
    }
}
```

### 1.6 Add to the allow list

In `plugins.allow`, add `"ai-guardian-plugin"`:

```json
"allow": [
    "ai-guardian-plugin"
]
```

### 1.7 Register the load path

Copy the value of `plugins.installs.ai-guardian-plugin.installPath` and add it to `plugins.load.paths`:

```json
"load": {
    "paths": [
        "/Users/<your-username>/.openclaw/extensions/ai-guardian-plugin"
    ]
}
```

> The path must match exactly what is in `installPath`.

### 1.8 Add the plugin entry

Under `plugins.entries`, add the following configuration block:

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

> The `chromiaSecretPath` points to the keypair file you created in Step 1. The `~` expands to your home directory automatically on macOS.

### 1.9 Restart the OpenClaw Gateway

Once all changes are saved, restart the OpenClaw gateway to apply the new plugin configuration:

```bash
openclaw gateway restart
```

---

## Summary

After completing all steps, your `openclaw.json` should reflect:

| Field | Value |
|---|---|
| `plugins.enabled` | `true` |
| `plugins.allow` | includes `"ai-guardian-plugin"` |
| `plugins.load.paths` | includes the `installPath` from `plugins.installs.ai-guardian-plugin` |
| `plugins.entries.ai-guardian-plugin` | full config block as shown above |
| `chromiaSecretPath` | `~/.config/ai-guardian/guard-client-key` |


