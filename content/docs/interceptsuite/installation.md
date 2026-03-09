---
title: Installation
description: Learn how to install InterceptSuite on Windows, macOS, or Linux.
category: Getting Started
order: 2
---

# Installation

Learn how to install InterceptSuite on your system.

## System Requirements

### Supported Platforms

| Platform | Version |
|---|---|
| macOS | macOS 13+ (Apple Silicon only) |
| Windows | Windows 10 and 11 (x64) |
| Linux | Ubuntu 20.04+, Debian 11+, Fedora 35+ |

### Unsupported Platforms

- **macOS Intel** -Not supported and not planned (Intel Macs are no longer supported by Apple)
- **Windows ARM** -Not currently supported but planned for a future release

## Download and Installation

### Download InterceptSuite

Visit the [download page](https://interceptsuite.com/download) to download the installer for your platform. The same page provides both the Standard Edition (free) and the Professional Edition.

> The Professional Edition requires a valid license key to activate. See the [License Activation Guide](/docs/license-activation) for details.

### Installation by Platform

#### Windows

1. Download the `installer.exe` file
2. Run the installer
3. Follow the installation wizard prompts
4. Launch InterceptSuite from the Start Menu or Desktop shortcut

#### macOS

1. Download the `.pkg` installer file
2. Double-click to open the installer
3. Follow the installation prompts
4. If macOS blocks the app, open **System Preferences → Security & Privacy** and click **Open Anyway**

#### Linux

Choose from three available package formats based on your distribution:

**Debian/Ubuntu** (`.deb`)

```bash
sudo dpkg -i interceptsuite.deb
sudo apt-get install -f
```

**Fedora/Red Hat** (`.rpm`)

```bash
sudo rpm -i interceptsuite.rpm
```

**Universal** (`.AppImage`)

```bash
chmod +x interceptsuite.AppImage
./interceptsuite.AppImage
```

## Next Steps

After installation, continue to the [License Activation](/docs/license-activation) guide (Professional Edition only) or head straight to the [Quick Start](/docs/quick-start) guide to begin intercepting traffic.
