---
title: "How to Install the InterceptSuite CA Certificate on Windows"
description: "Step-by-step guide to trust the InterceptSuite CA certificate on Windows so you can intercept HTTPS traffic without certificate errors."
date: "2026-03-09"
author: "InterceptSuite Team"
readTime: "5 min read"
tags: ["Windows", "TLS", "Certificate", "HTTPS"]
---

To intercept HTTPS traffic, your operating system must trust the InterceptSuite Certificate Authority (CA). This guide walks you through exporting the certificate from InterceptSuite and installing it as a trusted root CA on Windows.

## Step 1 - Export the CA Certificate from InterceptSuite

Before installing the certificate, you need to export it from the application.

1. Open **InterceptSuite** and navigate to the **Proxy** tab
2. Click the **Settings** sub-tab within the Proxy section
3. Scroll to the **Certificate Management** section
4. Click **Export Certificate**
5. When prompted for format, select **DER**
6. Choose your preferred save location (e.g. your Desktop)
7. Click **Save** - you should now have a `.der` file

## Step 2 - Install the Certificate

Windows lets you install a certificate directly by double-clicking the file - no MMC required.

1. **Double-click** the `.der` file you exported
2. Windows will open the **Certificate** dialog showing the certificate details
3. Click **Install Certificate…**
4. Choose the store location:
   - **Current User** - installs only for your Windows account
   - **Local Machine** - installs for all users on this PC (requires admin)

   Select whichever fits your needs and click **Next**

5. Select **Place all certificates in the following store** and click **Browse…**
6. In the list, select **Trusted Root Certification Authorities** and click **OK**
7. Click **Next**, then **Finish**
8. Click **OK** on the success dialog

> If you chose **Local Machine**, Windows will prompt for administrator confirmation - click **Yes**.

## Step 3 - Verify the Installation

1. Press **Win + R**, type `certmgr.msc`, and press **Enter** (for Current User) - or `certlm.msc` for Local Machine
2. Expand **Trusted Root Certification Authorities → Certificates**
3. Look for **InterceptSuite** in the list
4. Double-click it to confirm the certificate details match

## Step 4 - Configure Your Browser or Application

Now that the system trusts the CA, configure your application to use InterceptSuite as a proxy:

- **Proxy host:** `127.0.0.1`
- **Proxy port:** `4444` (or whichever port you configured)

Most browsers on Windows (Chrome, Edge) use the system certificate store automatically. Firefox uses its own store - see the Firefox-specific section below.

### ProxyBridge - Recommended Proxy Client

[**ProxyBridge**](https://github.com/InterceptSuite/ProxyBridge) is a free, open-source proxy client built by the InterceptSuite team. It makes routing any application through InterceptSuite on Windows effortless -no manual proxy settings needed per app.

- Forces any process to use a SOCKS5/HTTP proxy regardless of its own proxy settings
- Works with apps that don't natively support proxy configuration
- One-click setup with InterceptSuite
- Available on [GitHub](https://github.com/InterceptSuite/ProxyBridge)

### Firefox on Windows

Firefox maintains its own certificate store and does not use the Windows system store by default.

1. Open Firefox and go to **Settings → Privacy & Security**
2. Scroll to **Certificates** and click **View Certificates…**
3. Go to the **Authorities** tab and click **Import…**
4. Select your `.der` file and click **Open**
5. Check **Trust this CA to identify websites** and click **OK**

## Troubleshooting

**Certificate warnings still appear** - Make sure you selected *Trusted Root Certification Authorities* as the store during installation. Restart your browser after importing.

**Double-click doesn't open the certificate dialog** - Right-click the `.der` file and choose **Open With → Crypto Shell Extensions**.

**Local Machine install requires admin** - Right-click the `.der` file and choose **Run as administrator**, or use the Current User option which doesn't need admin rights.
