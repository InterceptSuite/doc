---
title: Quick Start on Linux
description: Get InterceptSuite running and start intercepting traffic on Linux in under 5 minutes.
category: Getting Started
order: 7
---

# Quick Start on Linux

Get InterceptSuite running on Linux in under 5 minutes.

## Step 1: Launch InterceptSuite

When you launch the InterceptSuite application on Linux, it automatically:

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

### Install the Certificate on Linux

**Ubuntu / Debian:**

```bash
sudo cp certificate.der /usr/local/share/ca-certificates/interceptsuite.der
sudo update-ca-certificates
```

**CentOS / RHEL / Fedora:**

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

### Option 1: System-wide Proxy (GNOME)

1. Open **Settings -> Network -> Network Proxy**.
2. Select **Manual**.
3. In **Socks Host**, enter: `127.0.0.1`, Port: `4444`.
4. Click **Apply**.

### Option 2: Environment Variables

```bash
export ALL_PROXY=socks5://127.0.0.1:4444
export all_proxy=socks5://127.0.0.1:4444
export HTTPS_PROXY=socks5://127.0.0.1:4444
export HTTP_PROXY=socks5://127.0.0.1:4444
```

### Option 3: Application-specific (Firefox)

1. Open **Preferences -> General -> Network Settings**.
2. Select **Manual proxy configuration**.
3. In **SOCKS Host**, enter: `127.0.0.1`, Port: `4444`.
4. Select **SOCKS v5**.
5. Check **Proxy DNS when using SOCKS v5**.

### Option 4: ProxyBridge (Recommended for granular control)

1. Install ProxyBridge using the Linux setup script:
   ```bash
   curl -Lo deploy.sh https://raw.githubusercontent.com/InterceptSuite/ProxyBridge/refs/heads/master/Linux/deploy.sh && sudo bash deploy.sh
   ```
2. Open the ProxyBridge GUI with root privileges:
   ```bash
   sudo ProxyBridgeGUI
   ```
3. Open Proxy Settings and configure the host to `127.0.0.1`, port to `4444`, and type to SOCKS5.
4. Navigate to Proxy Rules and add a rule for the specific applications you want to route through InterceptSuite.

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
