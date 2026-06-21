---
title: Introduction
description: What is ProxyBridge and how it lets you route any application through InterceptSuite.
category: Getting Started
order: 1
---

# Introduction to ProxyBridge

**ProxyBridge** is a lightweight, open-source universal proxy client (a [Proxifier](https://www.proxifier.com/) alternative) that provides transparent proxy routing for applications on Windows, macOS, and Linux. It redirects TCP and UDP traffic from specific processes through SOCKS5 or HTTP proxies, with the ability to route, block, or allow traffic on a per-application basis. ProxyBridge fully supports both TCP and UDP proxy routing and works at the system level, making it compatible with proxy-unaware applications without requiring any configuration changes.

For a detailed analysis of OS-level proxy limitations, alternative options, and why ProxyBridge was developed, check out the [Why ProxyBridge?](/docs/proxybridge/why-proxybridge) guide.

## How it works

ProxyBridge operates at the system level and intercepts outbound TCP and UDP connections from target processes, redirecting them through the configured SOCKS5 or HTTP proxy.

```
Target App -> ProxyBridge -> InterceptSuite (SOCKS5) -> Internet
```

This means all traffic from the target application flows through InterceptSuite, where you can inspect, modify, replay, or block it.

## Supported platforms

| Platform | Architecture | Support |
|----------|-------------|---------|
| Windows  | x64         | ✓ |
| macOS    | x64 / ARM64 | ✓ |
| Linux    | x64         | ✓ |

## Next steps

- Read [Why ProxyBridge?](/docs/proxybridge/why-proxybridge) to learn about the benefits of using it.
- Choose your platform to install ProxyBridge:
  - [Install on Windows](/docs/proxybridge/installation-windows)
  - [Install on macOS](/docs/proxybridge/installation-macos)
  - [Install on Linux](/docs/proxybridge/installation-linux)
- Configure ProxyBridge using the platform configuration guides.
