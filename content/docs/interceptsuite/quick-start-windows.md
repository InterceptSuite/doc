---
title: Quick Start on Windows
description: Get InterceptSuite running and start intercepting traffic on Windows in under 5 minutes.
category: Getting Started
order: 5
---

# Quick Start on Windows

Get InterceptSuite running on Windows in under 5 minutes.

## Step 1: Launch InterceptSuite

When you launch the InterceptSuite application on Windows, it automatically:

- Opens the SOCKS5 TCP proxy on `127.0.0.1:4444`
- Opens the UDP relay port on `127.0.0.1:4445`

You should see the application interface with both services running in the background and confirmed in the Proxy tab.

## Step 2: Install the CA Certificate (Required)

If this is your first time installing InterceptSuite, or you are updating to a new version, you must install the CA certificate into your system for TLS interception to work.

### Export the Certificate from InterceptSuite

1. In the InterceptSuite application, navigate to the **Proxy** tab.
2. Go to the **Settings** tab within the Proxy section.
3. In the **Certificate Management** section, click **Export Certificate**.
4. Select DER format.
5. Choose your preferred export directory and save the file.

### Install the Certificate on Windows

1. Locate the exported certificate file (`.cer` or `.der`).
2. Double-click on the certificate file.
3. Click **Install Certificate...**.
4. Select **Local Machine** (not Current User).
5. Choose **Place all certificates in the following store**.
6. Click **Browse** and select **Trusted Root Certification Authorities**.
7. Click **Next** and **Finish**.
8. Click **Yes** when prompted with a security warning.
9. You should see "The import was successful".

> For a video guide, watch: [InterceptSuite MITM Setup: Install CA Certificate on Windows](https://www.youtube.com/watch?v=wf8tCvlw_yg)

## Step 3: Configure Your Application

Windows does not natively support SOCKS5 proxy in its system settings (Settings -> Network & Internet -> Proxy only exposes HTTP proxy).

### Recommended: Use ProxyBridge for system-wide SOCKS5 support

1. Download ProxyBridge from [interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge).
2. Install and launch ProxyBridge.
3. Navigate to the proxy menu and select **Proxy Settings**.
4. Enter address: `127.0.0.1`, port: `4444`, type: SOCKS5, then save.
5. Navigate to the proxy menu and **Proxy Rules**.
6. Add a new rule for the application you want to intercept.

> For a video guide, watch: [Intercept Windows Thick Client with InterceptSuite](https://www.youtube.com/watch?v=8Gude5ksGZM)

### Direct Application Configuration

For apps that allow direct proxy configuration (for example, web browsers or specific clients), use:

- **Proxy Host**: `127.0.0.1`
- **Proxy Port**: `4444`
- **Proxy Type**: SOCKS5

## Step 4: Start Intercepting

1. Configure your target application to use the SOCKS5 proxy.
2. Start making network requests from the application.
3. Monitor traffic in real-time through the InterceptSuite interface.
4. Analyze captured data using the built-in Proxy History and Intercept tools.

You are all set. Next, explore the [Traffic Interception](/docs/traffic-interception) guide to learn how to intercept and modify packets in real-time.
