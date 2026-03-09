---
title: Installation
description: Download and install ProxyBridge on Windows, macOS, or Linux.
category: Getting Started
order: 2
---

# Installing ProxyBridge

ProxyBridge is distributed as a standalone binary - no installer required. Download the binary for your platform and you are ready to go.

## Download

Get the latest release from the [ProxyBridge GitHub releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

| Platform | File |
|----------|------|
| Windows x64 | `proxybridge-windows-x64.exe` |
| macOS x64 | `proxybridge-macos-x64` |
| macOS ARM64 | `proxybridge-macos-arm64` |
| Linux x64 | `proxybridge-linux-x64` |

## Windows

1. Download `proxybridge-windows-x64.exe`
2. Place it in a folder on your `PATH` (e.g. `C:\Tools\`) or in the same directory as your project
3. Open a terminal and verify:

```bash
proxybridge --version
```

## macOS

1. Download the binary for your architecture
2. Make it executable and move it to `/usr/local/bin`:

```bash
chmod +x proxybridge-macos-arm64
sudo mv proxybridge-macos-arm64 /usr/local/bin/proxybridge
```

3. If macOS blocks the binary (Gatekeeper), run:

```bash
xattr -dr com.apple.quarantine /usr/local/bin/proxybridge
```

4. Verify the installation:

```bash
proxybridge --version
```

## Linux

1. Download `proxybridge-linux-x64`
2. Make it executable and move it to `/usr/local/bin`:

```bash
chmod +x proxybridge-linux-x64
sudo mv proxybridge-linux-x64 /usr/local/bin/proxybridge
```

3. Verify the installation:

```bash
proxybridge --version
```

## Requirements

ProxyBridge itself has no external dependencies. However, to intercept traffic you must have **InterceptSuite** running with its SOCKS5 proxy active. See [Proxy Settings](/docs/interceptsuite/proxy-settings) in the InterceptSuite docs for how to configure the proxy port.
