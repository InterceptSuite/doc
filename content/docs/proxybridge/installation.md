---
title: Installation
description: Download and install ProxyBridge on Windows, macOS, or Linux.
category: Getting Started
order: 2
---

# Installing ProxyBridge

ProxyBridge releases are published on the [ProxyBridge GitHub releases page](https://github.com/InterceptSuite/ProxyBridge/releases). Each release ships three files:

| File | Platform |
|------|----------|
| `ProxyBridge-Setup-x.x.x.exe` | Windows |
| `ProxyBridge-vx.x.x-Universal-Installer.pkg` | macOS |
| `ProxyBridge-Linux-vx.x.x.tar.gz` | Linux |

Each release also includes a `sha256` checksum for every file. Verify the download before running it:

```bash
# macOS / Linux
shasum -a 256 <downloaded-file>

# Windows (PowerShell)
Get-FileHash <downloaded-file> -Algorithm SHA256
```

Compare the output against the checksum listed on the releases page.

## Windows

1. Download `ProxyBridge-Setup-x.x.x.exe` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases)
2. Run the installer — click through the setup wizard and click **Install**

**GUI**

Search for **ProxyBridge** in the Start menu and click to launch it. Windows will show a UAC prompt asking for administrator permission — click **Yes**. The ProxyBridge GUI will open.

**CLI**

Open **Command Prompt as Administrator** (right-click → *Run as administrator*), then run:

```
ProxyBridge_CLI -h
```

> ProxyBridge requires administrator privileges on Windows to intercept network traffic at the system level.

## macOS

1. Download `ProxyBridge-vx.x.x-Universal-Installer.pkg` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases)
2. Double-click the `.pkg` file to launch the macOS installer
3. Click through the installer steps and click **Install** — enter your password when prompted
4. After installation, open **ProxyBridgeGUI** from Launchpad or Applications

For full macOS setup instructions including enabling the required System Extension, see the [Installing ProxyBridge on macOS](/blog/install-proxybridge-macos) guide.

## Linux

**Option 1 — One-line deploy script**

```bash
curl -Lo deploy.sh https://raw.githubusercontent.com/InterceptSuite/ProxyBridge/refs/heads/master/Linux/deploy.sh && sudo bash deploy.sh
```

**Option 2 — Manual install from tar.gz**

1. Download `ProxyBridge-Linux-vx.x.x.tar.gz` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases)
2. Extract the archive and run the setup script:

```bash
tar -xzf ProxyBridge-Linux-vx.x.x.tar.gz
cd ProxyBridge-Linux-vx.x.x
sudo ./setup.sh
```

Both options install the GUI and CLI. After installation:

```bash
sudo ProxyBridgeGUI     # graphical interface
sudo ProxyBridge --help # CLI
```

For full Linux setup instructions see the [Installing ProxyBridge on Linux](/blog/install-proxybridge-linux) guide.

