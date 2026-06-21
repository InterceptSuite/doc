---
title: Install on Linux
description: Learn how to install InterceptSuite on Linux.
category: Getting Started
order: 4
---

# Install InterceptSuite on Linux

Learn how to install InterceptSuite on Linux.

## System Requirements

- **Supported OS**: Ubuntu 20.04+, Debian 11+, Fedora 35+

## Download and Installation

### Download InterceptSuite

Visit the [download page](https://interceptsuite.com/download) to download the Linux installer.

> InterceptSuite is a paid commercial product ($300 USD/year) and requires a valid license key to activate. See the [License Activation Guide](/docs/license-activation) for details.

### Installation Steps

Choose from three available package formats based on your distribution:

**Debian / Ubuntu** (`.deb`)

```bash
sudo dpkg -i interceptsuite.deb
sudo apt-get install -f
```

**Fedora / Red Hat** (`.rpm`)

```bash
sudo rpm -i interceptsuite.rpm
```

**Universal** (`.AppImage`)

```bash
chmod +x interceptsuite.AppImage
./interceptsuite.AppImage
```

## Next Steps

After installation, continue to the [License Activation](/docs/license-activation) guide to activate your subscription, or head straight to the [Quick Start on Linux](/docs/interceptsuite/quick-start-linux) guide to begin intercepting traffic.
