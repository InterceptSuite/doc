---
title: Usage
description: Using ProxyBridge alongside InterceptSuite for real-world traffic interception workflows.
category: Configuration
order: 4
---

# Using ProxyBridge

This guide walks through common workflows for using ProxyBridge together with InterceptSuite.

## Basic workflow

1. **Start InterceptSuite** and enable the SOCKS5 proxy (default port `1080`)
2. **Make sure interception is enabled** in the Traffic Interception panel
3. **Launch your target application through ProxyBridge**:

```bash
proxybridge -- <your application>
```

4. **Watch traffic appear** in InterceptSuite's Proxy History

## Intercepting a command-line tool

```bash
# Intercept all HTTP/HTTPS traffic from curl
proxybridge -- curl -k https://api.example.com/v1/users

# Intercept traffic from a Go binary
proxybridge -- ./my-go-service --port 9000

# Intercept traffic from a Python script
proxybridge -- python3 harvest.py
```

> **Note:** Use `-k` (or `--insecure`) in tools like `curl` to bypass certificate validation, since InterceptSuite's CA certificate will be presented for TLS connections. Alternatively, [install the CA certificate](/blog/install-ca-certificate-macos) system-wide to avoid this.

## Intercepting a GUI application

On macOS and Linux, wrap the application binary directly:

```bash
# macOS - intercept Electron app
proxybridge -- /Applications/MyApp.app/Contents/MacOS/MyApp

# Linux
proxybridge -- /usr/bin/myapp
```

On Windows, run from a terminal:

```powershell
proxybridge -- "C:\Program Files\MyApp\myapp.exe"
```

## Intercepting traffic for a specific domain only

Use `--include` to narrow down which hosts are intercepted, letting everything else pass through normally:

```bash
proxybridge --include "api.example.com" -- my-app
```

## Replaying and modifying requests

Once traffic appears in InterceptSuite's Proxy History:

1. Right-click a request → **Send to Repeater**
2. Modify headers, body, or URL
3. Click **Send** to replay the modified request
4. Compare the original and modified responses side-by-side

## Scripting with the Extension API

Combine ProxyBridge with InterceptSuite's [Python Extension API](/docs/interceptsuite/extension-api) to automate traffic modification:

```python
from interceptsuite import Extension, Request, Response

class MyExtension(Extension):
    def on_request(self, request: Request) -> Request:
        # Add a custom header to every request from the target app
        request.headers['X-Debug'] = 'proxybridge'
        return request
```

## Troubleshooting

### Traffic not appearing in InterceptSuite

- Confirm InterceptSuite's SOCKS5 proxy is running (check the status indicator in the UI)
- Verify `--proxy-port` matches the port configured in InterceptSuite's Proxy Settings
- Ensure interception is not paused

### TLS handshake errors

- The target application may be pinning certificates. Use `--verbose` to see which hosts are failing.
- [Install the InterceptSuite CA certificate](/blog/install-ca-certificate-windows) system-wide to avoid validation errors for standard apps.

### Application crashes on launch

- Some applications detect proxy injection. Try `--proxy-type http` as an alternative.
- On macOS, ensure the binary is not quarantined: `xattr -dr com.apple.quarantine proxybridge`
