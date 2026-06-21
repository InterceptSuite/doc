---
title: Install on Linux
description: Download and install ProxyBridge on Linux.
category: Getting Started
order: 4
---

# Installing ProxyBridge on Linux

ProxyBridge releases are published on the [ProxyBridge GitHub releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

## Download and Verification

If you choose to install manually, download the latest `ProxyBridge-Linux-vx.x.x.tar.gz` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

Each release includes a `sha256` checksum for every file. Verify the download before running it by running the following command in the terminal:

```bash
shasum -a 256 <downloaded-file>
```

Compare the output against the checksum listed on the releases page.

## Installation Options

### Option 1: One-line deploy script

```bash
curl -Lo deploy.sh https://raw.githubusercontent.com/InterceptSuite/ProxyBridge/refs/heads/master/Linux/deploy.sh && sudo bash deploy.sh
```

### Option 2: Manual install from tar.gz

1. Extract the downloaded archive and run the setup script:

```bash
tar -xzf ProxyBridge-Linux-vx.x.x.tar.gz
cd ProxyBridge-Linux-vx.x.x
sudo ./setup.sh
```

Both options install the CLI, GUI, and core libraries to the following system paths:
- `/usr/local/bin/ProxyBridge`: Command-line interface
- `/usr/local/bin/ProxyBridgeGUI`: Graphical interface (requires GTK3)
- `/usr/local/lib/libproxybridge.so`: Core intercept library
- `/etc/proxybridge/`: Configuration folder

## Running ProxyBridge

After installation, you can launch the GUI or run the CLI:

```bash
sudo ProxyBridgeGUI     # graphical interface
sudo ProxyBridge --help # CLI
```

For full Linux setup instructions see the [Installing ProxyBridge on Linux](/blog/install-proxybridge-linux) guide.
