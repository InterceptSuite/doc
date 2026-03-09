---
title: Introduction
description: What is ProxyBridge and how it lets you route any application through InterceptSuite.
category: Getting Started
order: 1
---

# Introduction to ProxyBridge

**ProxyBridge** is a free, open-source utility designed to work alongside InterceptSuite. It forces any application - even those that ignore system proxy settings - through InterceptSuite's SOCKS5 proxy, enabling full traffic inspection and interception without modifying the target application.

## Why ProxyBridge?

Some applications bypass operating system proxy settings entirely, making it impossible to intercept their traffic with a standard proxy. ProxyBridge solves this by operating at a lower level, redirecting network calls at the process level.

### Key benefits

- **No application modification required** - any app, any language, any framework
- **Per-process control** - choose exactly which processes to route
- **Cross-platform** - Windows, macOS, and Linux support
- **Zero configuration overhead** - point it at InterceptSuite and go

## How it works

ProxyBridge injects itself (or uses OS-level hooks, depending on the platform) into a target process's network stack and redirects all TCP/UDP traffic to the configured SOCKS5 proxy - in this case, InterceptSuite.

```
Target App → ProxyBridge → InterceptSuite (SOCKS5) → Internet
```

This means all traffic from the target application flows through InterceptSuite, where you can inspect, modify, replay, or block it.

## Supported platforms

| Platform | Architecture | Support |
|----------|-------------|---------|
| Windows  | x64         | ✓ |
| macOS    | x64 / ARM64 | ✓ |
| Linux    | x64         | ✓ |

## Next steps

- [Install ProxyBridge](/docs/proxybridge/installation) to get started
- [Configure ProxyBridge](/docs/proxybridge/configuration) to connect it to InterceptSuite
- [Using ProxyBridge](/docs/proxybridge/usage) for a walkthrough of common workflows
