---
title: Why ProxyBridge?
description: Learn about the limitations of standard OS proxies and Proxifier, and why ProxyBridge was built.
category: Getting Started
order: 1.5
---

# Why ProxyBridge?

Setting up a proxy sounds straightforward, but OS-level proxy settings and traditional proxy clients have significant limitations that make them unsuitable for most interception and routing scenarios.

## Limitations of Standard Proxies

### Most proxy clients only support TCP, leaving UDP out

The vast majority of proxy clients, including Proxifier, only intercept TCP connections. UDP traffic passes through untouched, which means DNS queries, QUIC connections, game traffic, VoIP, and any other UDP-based protocol completely bypass the proxy. The common workaround is to use a TUN interface or a VPN, but that adds significant setup complexity and routes all traffic indiscriminately.

ProxyBridge natively supports UDP proxy routing without requiring a TUN device or VPN.

### Proxifier does not support Linux

Proxifier is available on Windows and macOS only. There is no Linux version. If you need to intercept traffic on a Linux machine (such as a server, a CI runner, or a development VM), Proxifier is not an option.

ProxyBridge runs on Windows, macOS, and Linux with the same feature set across all three platforms.

### OS proxy settings only work for apps that respect them

Every major OS lets you configure a system-wide proxy in its network settings. The problem is that this only affects applications that actively read and honour those settings, typically web browsers. CLI tools, native desktop applications, game clients, custom software, and most non-browser apps ignore the system proxy entirely and make direct connections. There is no way to force those applications through a proxy using OS settings alone.

### Windows system proxy only supports HTTP (not SOCKS5)

Windows system proxy settings (`Settings -> Network & Internet -> Proxy`) only accept an HTTP proxy. SOCKS5 is not supported at the OS level on Windows. InterceptSuite's default listener is SOCKS5, so configuring the Windows system proxy to point at it does not work. ProxyBridge bridges this gap by accepting the OS-level redirect and forwarding traffic to any backend proxy type, including SOCKS5.

macOS and Linux have the same limitation for many applications: even where SOCKS5 is technically configurable in OS settings, most apps do not honour it.

### No granular control over what gets proxied

Even when an application does respect the system proxy, the OS gives you an all-or-nothing switch, meaning either everything goes through the proxy or nothing does. There is no way to:

- Proxy only a specific application while others connect directly
- Proxy traffic to a specific IP address or hostname but not others
- Proxy only certain ports (for example, only LDAP on port 389)
- Block a specific process from accessing the network at all

ProxyBridge solves all of this with a rule engine that lets you match on **process name**, **destination host**, and **destination port**, with a per-rule action of **PROXY**, **DIRECT**, or **BLOCK**.

## Key Benefits

- **Works with any application**: Works with applications that ignore system proxy settings.
- **SOCKS5 support on Windows**: Bypasses the OS-level SOCKS5 limitation.
- **Per-process control**: Target specific executables instead of routing the whole system.
- **Fine-grained rules**: Match on process, destination IP/host, port, and protocol.
- **TCP and UDP support**: Full proxy routing for both protocols.
- **Cross-platform**: Support for Windows, macOS, and Linux.
- **Zero configuration overhead**: Point it at InterceptSuite and go.
