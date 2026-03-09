---
title: "How to Install the InterceptSuite CA Certificate on macOS"
description: "Step-by-step guide to trust the InterceptSuite CA certificate on macOS using Keychain Access so you can intercept HTTPS traffic without certificate errors."
date: "2026-03-09"
author: "InterceptSuite Team"
readTime: "4 min read"
tags: ["macOS", "TLS", "Certificate", "HTTPS"]
---

To intercept HTTPS traffic on macOS, you need to add the InterceptSuite CA certificate to your system keychain and mark it as trusted. This guide covers exporting the certificate from InterceptSuite and installing it on macOS.

## Step 1 -Export the CA Certificate from InterceptSuite

Before installing, export the certificate from the InterceptSuite application.

1. Open **InterceptSuite** and navigate to the **Proxy** tab
2. Click the **Settings** sub-tab within the Proxy section
3. Scroll to the **Certificate Management** section
4. Click **Export Certificate**
5. When prompted for format, select **DER**
6. Choose your preferred save location (e.g. your Desktop)
7. Click **Save** -you should now have a `.der` file

## Step 2 -Open Keychain Access

1. Open **Spotlight** with **Cmd + Space**
2. Type `Keychain Access` and press **Enter**
3. In the left sidebar, select the **System** keychain (not login)

> **Why System?** Adding to the System keychain makes the certificate trusted for all users and all applications on this Mac.

## Step 3 -Import the Certificate

**Option A -Drag and drop**

1. Open Finder and navigate to your exported `.der` file
2. Drag the file directly into the **Keychain Access** window with **System** selected

**Option B -File menu**

1. In Keychain Access, go to **File → Import Items…**
2. Navigate to your `.der` file and click **Open**
3. Enter your macOS password if prompted

The certificate will appear in the **Certificates** category but will initially show as **Not Trusted**.

## Step 4 -Trust the Certificate

1. In Keychain Access, find the **InterceptSuite** certificate in the list
2. Double-click it to open the certificate details
3. Expand the **Trust** section at the top of the window
4. Set **When using this certificate** to **Always Trust**
5. Close the window -macOS will prompt for your password or Touch ID
6. Authenticate to confirm

The certificate icon will change to show a blue trust badge.

## Step 5 -Verify via Terminal (Optional)

You can verify the certificate is trusted using the `security` command:

```bash
security find-certificate -a -c "InterceptSuite" /Library/Keychains/System.keychain
```

If the certificate appears in the output, it is correctly installed in the System keychain.

## Step 6 -Configure Your Browser or Application

Set your application or system proxy to route traffic through InterceptSuite:

- **Proxy host:** `127.0.0.1`
- **Proxy port:** `4444` (or whichever port you configured)

**System-wide proxy** -Go to **System Settings → Network → [Your connection] → Proxies** and set the HTTP/HTTPS proxy to `127.0.0.1:4444`.

### ProxyBridge -Recommended Proxy Client

[**ProxyBridge**](https://github.com/InterceptSuite/ProxyBridge) is a free, open-source proxy client built by the InterceptSuite team. It simplifies routing any application through InterceptSuite on macOS -ideal for apps that ignore system proxy settings.

- Forces any process to use a SOCKS5/HTTP proxy regardless of its own proxy settings
- Works with apps that don't natively support proxy configuration
- One-click setup with InterceptSuite
- Available on [GitHub](https://github.com/InterceptSuite/ProxyBridge)

### Firefox on macOS

Firefox uses its own certificate store and ignores the macOS Keychain by default.

1. Open Firefox and go to **Settings → Privacy & Security**
2. Scroll to **Certificates** and click **View Certificates…**
3. Go to the **Authorities** tab and click **Import…**
4. Select your `.der` file and click **Open**
5. Check **Trust this CA to identify websites** and click **OK**

## Troubleshooting

**Certificate still shows as Not Trusted** -Ensure you set "Always Trust" in the Trust section and authenticated with your password. Relaunch your browser after making changes.

**Keychain Access asks for password when modifying System keychain** -This is expected. The System keychain requires admin credentials to modify.

**Chrome still shows certificate warnings** -Chrome on macOS uses the System keychain. Try restarting Chrome completely (`Cmd + Q`, then reopen) after trusting the certificate.
