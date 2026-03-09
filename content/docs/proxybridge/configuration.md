---
title: Configuration
description: Configure ProxyBridge to route application traffic through InterceptSuite.
category: Configuration
order: 3
---

# Configuration

ProxyBridge is configured through command-line flags or an optional `proxybridge.json` config file. Both methods support the same options.

## Command-line flags

```bash
proxybridge [flags] -- <command> [args...]
```

| Flag | Default | Description |
|------|---------|-------------|
| `--proxy-host` | `127.0.0.1` | Host where InterceptSuite's SOCKS5 proxy is listening |
| `--proxy-port` | `1080` | SOCKS5 proxy port |
| `--proxy-type` | `socks5` | Proxy type: `socks5` or `http` |
| `--dns-over-proxy` | `true` | Resolve DNS through the proxy (recommended) |
| `--include` | (all) | Comma-separated list of host patterns to intercept |
| `--exclude` | (none) | Comma-separated list of host patterns to bypass |
| `--verbose` | `false` | Enable verbose logging |

## Example - launch an app through InterceptSuite

```bash
# Route curl through InterceptSuite on the default port
proxybridge -- curl https://example.com

# Specify a custom port
proxybridge --proxy-port 8888 -- curl https://example.com

# Route a Python script
proxybridge -- python3 my_script.py
```

## Config file (`proxybridge.json`)

Create a `proxybridge.json` in your working directory to avoid repeating flags:

```json
{
  "proxyHost": "127.0.0.1",
  "proxyPort": 1080,
  "proxyType": "socks5",
  "dnsOverProxy": true,
  "exclude": ["localhost", "127.0.0.1"]
}
```

ProxyBridge automatically loads `proxybridge.json` from the current directory. Override the config file path with `--config`:

```bash
proxybridge --config /path/to/my-config.json -- my-app
```

## DNS settings

With `--dns-over-proxy true` (the default), all DNS queries are resolved through the SOCKS5 proxy. This ensures that domain names in request URLs appear correctly in InterceptSuite's proxy history rather than as raw IP addresses.

Set `--dns-over-proxy false` only if you need local DNS resolution (e.g. for internal domains not reachable through InterceptSuite).

## Exclude patterns

Use `--exclude` to bypass specific hosts - useful for local services you do not want to intercept:

```bash
proxybridge --exclude "localhost,*.internal.example.com" -- my-app
```

Wildcard `*` matches any subdomain level. Exact hostnames and IP addresses are also supported.
