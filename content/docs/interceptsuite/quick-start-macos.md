---
title: Quick Start on macOS
description: Get InterceptSuite running and start intercepting traffic on macOS in under 5 minutes.
category: Getting Started
order: 6
---

# Quick Start on macOS

Get InterceptSuite running on macOS in under 5 minutes.

## Step 1: Launch InterceptSuite

When you launch the InterceptSuite application on macOS, it automatically:

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

### Install the Certificate on macOS

1. Locate the exported certificate file.
2. Double-click the certificate to open Keychain Access.
3. The certificate is added to the "login" keychain.
4. Find the certificate in Keychain Access.
5. Double-click it to open its settings.
6. Expand the **Trust** section.
7. Set **Secure Sockets Layer (SSL)** to **Always Trust**.
8. Close the window and enter your admin password when prompted.

## Step 3: Configure Your Application

### Option 1: Native System Settings

1. Open **System Preferences (or System Settings) -> Network**.
2. Select your active network connection (Wi-Fi or Ethernet).
3. Click **Advanced -> Proxies** (or **Details -> Proxies** on newer macOS versions).
4. Check **SOCKS Proxy**.
5. Enter SOCKS Proxy Server: `127.0.0.1:4444`.
6. Click **OK** and **Apply**.

### Option 2: ProxyBridge (Recommended for granular control)

1. Download ProxyBridge from [interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge).
2. Install and launch ProxyBridge.
3. Navigate to the proxy menu and select **Proxy Settings**.
4. Enter address: `127.0.0.1`, port: `4444`, type: SOCKS5, then save.
5. Navigate to the proxy menu and **Proxy Rules**.
6. Add a new rule for the application you want to intercept.

### Direct Application Configuration

For apps that allow direct proxy configuration, use:

- **Proxy Host**: `127.0.0.1`
- **Proxy Port**: `4444`
- **Proxy Type**: SOCKS5

## Step 4: Start Intercepting

1. Configure your target application to use the SOCKS5 proxy.
2. Start making network requests from the application.
3. Monitor traffic in real-time through the InterceptSuite interface.
4. Analyze captured data using the built-in Proxy History and Intercept tools.

You are all set. Next, explore the [Traffic Interception](/docs/traffic-interception) guide to learn how to intercept and modify packets in real-time.
