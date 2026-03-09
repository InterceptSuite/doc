---
title: "Installing ProxyBridge on Linux"
description: "Two ways to install ProxyBridge on Linux — a one-line deploy script or a manual tar.gz install — so you can route any application through InterceptSuite."
date: "2026-03-09"
author: "InterceptSuite Team"
readTime: "4 min read"
tags: ["Linux", "ProxyBridge", "Installation"]
---

ProxyBridge routes any application's traffic through InterceptSuite, even apps that ignore system proxy settings. On Linux, there are two ways to install it: a one-line deploy script that handles everything automatically, or a manual install from the downloaded package. Both methods install the GUI and CLI.

## Method 1 — One-Line Deploy Script

This is the quickest way to get ProxyBridge installed. The script downloads, extracts, and sets up ProxyBridge in a single step.

Run the following command in your terminal:

```bash
curl -Lo deploy.sh https://raw.githubusercontent.com/InterceptSuite/ProxyBridge/refs/heads/master/Linux/deploy.sh && sudo bash deploy.sh
```

The script will install ProxyBridge and make both the GUI and CLI available system-wide. Once it completes, skip ahead to [Launching ProxyBridge](#launching-proxybridge).

## Method 2 — Manual Install from tar.gz

If you prefer to download the package manually or cannot reach the deploy script URL:

### Step 1 — Download the Package

1. Open your browser and go to [https://interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge)
2. Click **Download for Linux** — this downloads a `.tar.gz` archive (e.g. `ProxyBridge-Linux-v1.0.0.tar.gz`)
3. Save the file to a convenient location, such as your home directory

### Step 2 — Extract the Archive

Open a terminal, navigate to the directory containing the downloaded file, and extract it:

```bash
tar -xzf ProxyBridge-Linux-vX.X.X.tar.gz
cd ProxyBridge-Linux-vX.X.X
```

Replace `vX.X.X` with the actual version number in the filename.

### Step 3 — Run the Setup Script

Run the bundled setup script with `sudo`:

```bash
sudo ./setup.sh
```

The setup script installs ProxyBridge and registers both the GUI and CLI on your system.

## Launching ProxyBridge

After installation, you can launch either the GUI or CLI.

**GUI**

```bash
sudo ProxyBridgeGUI
```

The graphical interface opens, letting you configure proxy settings, add proxy rules, and monitor connections — same as the Windows and macOS versions.

**CLI**

```bash
sudo ProxyBridge --help
```

This prints all available CLI flags and commands. Use the CLI when working on headless servers or in environments without a desktop.

> ProxyBridge requires `sudo` because it operates at the network level to intercept and redirect traffic system-wide.

## Verify ProxyBridge is Working

1. Launch **ProxyBridgeGUI** and click the **Connection** tab
2. Generate some traffic — for example, run `curl https://example.com` in another terminal
3. You should see connection entries appear in real time in the Connection tab

Once you can see connections being logged, ProxyBridge is installed and ready to redirect traffic through InterceptSuite.

## Troubleshooting

### `setup.sh: Permission denied`

Make sure you are running the script with `sudo`:

```bash
sudo ./setup.sh
```

If that still fails, check the file is executable first:

```bash
chmod +x setup.sh
sudo ./setup.sh
```

### `ProxyBridgeGUI: command not found` after install

The install directory may not be on your `PATH`. Try running it with the full path, or open a new terminal session to reload your shell environment.

### GUI does not open on a headless server

Use the CLI instead:

```bash
sudo ProxyBridge --help
```
