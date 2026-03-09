---
title: Quick Start
description: Get InterceptSuite running and start intercepting traffic in under 5 minutes.
category: Getting Started
order: 4
---

# Quick Start

Get InterceptSuite running in under 5 minutes.

## Step 1: Launch InterceptSuite

When you launch the InterceptSuite application, it automatically:

- Opens the SOCKS5 TCP proxy on `127.0.0.1:4444`
- Opens the UDP relay port on `127.0.0.1:4445`

You should see the application interface with both services running in the background and confirmed in the Proxy tab.

## Step 2: Install the CA Certificate (Required)

If this is your first time installing InterceptSuite, or you're updating to a new version, you must install the CA certificate into your system for TLS interception to work.

### Export the Certificate from InterceptSuite

1. In the InterceptSuite application, navigate to the **Proxy** tab
2. Go to the **Settings** tab within the Proxy section
3. In the **Certificate Management** section, click **Export Certificate**
4. Select DER format
5. Choose your preferred export directory and save the file

### Install the Certificate by Platform

#### Windows

1. Locate the exported certificate file (`.cer` or `.der`)
2. Double-click on the certificate file
3. Click **Install Certificate...**
4. Select **Local Machine** (not Current User)
5. Choose **Place all certificates in the following store**
6. Click **Browse** and select **Trusted Root Certification Authorities**
7. Click **Next** and **Finish**
8. Click **Yes** when prompted with a security warning
9. You should see "The import was successful"

#### macOS

1. Locate the exported certificate file
2. Double-click the certificate to open Keychain Access
3. The certificate is added to the "login" keychain
4. Find the certificate in Keychain Access
5. Double-click it to open its settings
6. Expand the **Trust** section
7. Set **Secure Sockets Layer (SSL)** to **Always Trust**
8. Close the window and enter your admin password when prompted

#### Linux

**Ubuntu/Debian:**

```bash
sudo cp certificate.der /usr/local/share/ca-certificates/interceptsuite.der
sudo update-ca-certificates
```

**CentOS/RHEL/Fedora:**

```bash
sudo cp certificate.der /etc/pki/ca-trust/source/anchors/interceptsuite.der
sudo update-ca-trust
```

**Arch Linux:**

```bash
sudo cp certificate.der /etc/ca-certificates/trust-source/anchors/interceptsuite.der
sudo trust extract-compat
```

## Step 3: Configure Your Application

InterceptSuite uses the SOCKS5 protocol because it supports both HTTP and non-HTTP traffic. Traditional HTTP proxies do not natively handle non-HTTP traffic, which is why InterceptSuite focuses on SOCKS5.

### Windows Configuration

Windows does not natively support SOCKS5 proxy in its system settings (Settings → Network & Internet → Proxy only exposes HTTP proxy).

**Recommended: Use ProxyBridge for system-wide SOCKS5 support**

1. Download ProxyBridge from [interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge)
2. Install and launch ProxyBridge
3. Navigate to the proxy menu and select **Proxy Settings**
4. Enter address: `127.0.0.1`, port: `4444`, type: SOCKS5, then save
5. Navigate to the proxy menu and **Proxy Rules**
6. Add a new rule for the application you want to intercept

### macOS Configuration

**Option 1: Native System Settings**

1. Open **System Preferences → Network**
2. Select your active network connection (Wi-Fi or Ethernet)
3. Click **Advanced → Proxies**
4. Check **SOCKS Proxy**
5. Enter SOCKS Proxy Server: `127.0.0.1:4444`
6. Click **OK** and **Apply**

**Option 2: ProxyBridge (Recommended for granular control)**

1. Download ProxyBridge from [interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge)
2. Follow the same configuration steps as Windows above

### Linux Configuration

**Option 1: System-wide Proxy (GNOME)**

1. Open **Settings → Network → Network Proxy**
2. Select **Manual**
3. In **Socks Host**, enter: `127.0.0.1`, Port: `4444`
4. Click **Apply**

**Option 2: Environment Variables**

```bash
export ALL_PROXY=socks5://127.0.0.1:4444
export all_proxy=socks5://127.0.0.1:4444
export HTTPS_PROXY=socks5://127.0.0.1:4444
export HTTP_PROXY=socks5://127.0.0.1:4444
```

**Option 3: Application-specific (Firefox)**

1. Open **Preferences → General → Network Settings**
2. Select **Manual proxy configuration**
3. In **SOCKS Host**, enter: `127.0.0.1`, Port: `4444`
4. Select **SOCKS v5**
5. Check **Proxy DNS when using SOCKS v5**

### Application-Specific Configuration

For apps that allow direct proxy configuration, use:

- **Proxy Host:** `127.0.0.1`
- **Proxy Port:** `4444`
- **Proxy Type:** SOCKS5

## Step 4: Start Intercepting

1. Configure your target application to use the SOCKS5 proxy
2. Start making network requests from the application
3. Monitor traffic in real-time through the InterceptSuite interface
4. Analyze captured data using the built-in Proxy History and Intercept tools

You're all set. Next, explore the [Traffic Interception](/docs/traffic-interception) guide to learn how to intercept and modify packets in real-time.
