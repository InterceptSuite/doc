---
title: Install on macOS
description: Download and install ProxyBridge on macOS.
category: Getting Started
order: 3
---

# Installing ProxyBridge on macOS

ProxyBridge releases are published on the [ProxyBridge GitHub releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

## Download and Verification

### Download Installer

Download the latest `ProxyBridge-vx.x.x-Universal-Installer.pkg` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

Each release includes a `sha256` checksum for every file. Verify the download before running it by running the following command in the terminal:

```bash
shasum -a 256 <downloaded-file>
```

Compare the output against the checksum listed on the releases page.

## Installation Steps

1. Double-click the `.pkg` file to launch the macOS installer.
2. Click through the installer steps and click **Install** (enter your password when prompted).
3. After installation, open **ProxyBridgeGUI** from Launchpad or Applications.

For full macOS setup instructions including enabling the required System Extension, see the [Installing ProxyBridge on macOS](/blog/install-proxybridge-macos) guide.
