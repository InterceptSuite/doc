---
title: "Installing ProxyBridge on macOS"
description: "Step-by-step guide to download, install, and enable the ProxyBridge system extension on macOS so you can route any application through InterceptSuite."
date: "2026-03-09"
author: "InterceptSuite Team"
readTime: "5 min read"
tags: ["macOS", "ProxyBridge", "Installation", "System Extension"]
---

ProxyBridge routes any application's traffic through InterceptSuite, even apps that ignore system proxy settings. This guide walks through downloading and installing the macOS `.pkg` file and enabling the required System Extension.

## Step 1 - Download the macOS Package

1. Open your browser and go to [https://interceptsuite.com/download/proxybridge](https://interceptsuite.com/download/proxybridge)
2. Click **Download for macOS** - this downloads a `.pkg` installer file
3. Once the download completes, locate the file in your **Downloads** folder (e.g. `ProxyBridge.pkg`)

## Step 2 - Run the Installer

1. Double-click **`ProxyBridge.pkg`** to launch the macOS installer
2. Click **Continue** on the Introduction screen
3. Click **Install** - you may be prompted to enter your macOS password to authorise the installation
4. Click **Close** when the installation completes

ProxyBridge is now installed at `/Applications/ProxyBridge.app`.

## Step 3 - First Launch and System Extension Prompt

On the first launch, ProxyBridge needs to install a **System Extension** to intercept network traffic at the OS level. macOS requires you to explicitly approve this.

1. Open **ProxyBridge** from your Applications folder or Launchpad
2. A dialog will appear prompting you to install the system extension - this extension is **required** for ProxyBridge to work

![ProxyBridge permission prompt asking to install the system extension](/img/ProxyBridge-install-permission.png)

3. Click **Open System Settings** in the dialog - this takes you directly to the right settings screen

> **If the dialog doesn't appear or you accidentally dismissed it** - don't worry, you can enable the extension manually in the next step.

## Step 4 - Enable the Network Extension in System Settings

Navigate to the exact location in System Settings where the extension must be approved:

1. Open **System Settings** (`Apple menu → System Settings`)
2. Go to **General → Login Items & Extensions**
3. Scroll down to the **Extensions** section
4. Click the **"By Categories"** tab at the top of the extensions list
5. Select **Network Extensions** from the list of categories

![System Settings showing the Network Extensions panel with ProxyBridge listed](/img/ProxyBridge-extesion.png)

6. Find **ProxyBridge** in the Network Extensions list and toggle it **on**
7. macOS will ask you to confirm - click **Allow**
8. Enter your macOS password (or use Touch ID) when prompted

Once enabled, the toggle turns blue and the extension is active.

> **Note:** On some macOS versions a restart is required after enabling the extension. If ProxyBridge still shows a warning after toggling, restart your Mac and check again.

## Step 5 - Verify ProxyBridge is Working

You can verify ProxyBridge is working directly inside the app - no need to switch to InterceptSuite first.

1. Open **ProxyBridge** and click the **Connection** tab
2. You should see network traffic from your system appearing as connection logs
3. If the list is empty, generate some traffic to trigger it:
   - Open a website in **Chrome** or **Safari**
   - Or run a quick terminal command, e.g. `curl https://example.com`
4. Check the **Connection** tab again - you should now see connection entries appearing in real time

![ProxyBridge Connection tab showing live network traffic logs](/img/proxybridge-mac.png)

Once you can see connection logs, ProxyBridge is fully installed and ready to redirect traffic. You can also use **InterceptSuite** to MITM, inspect, modify, or replay network packets.

## Troubleshooting

### "System Extension Blocked" after enabling

If the extension toggle is greyed out or blocked:

1. Open **System Settings → Privacy & Security**
2. Scroll to the **Security** section at the bottom
3. Look for a message: *"System software from 'InterceptSuite' was blocked"*
4. Click **Allow** and enter your password, then restart

### macOS won't open the `.pkg` file (Gatekeeper)

If macOS shows *"ProxyBridge.pkg cannot be opened because it is from an unidentified developer"*:

1. **Right-click** (or Control-click) the `.pkg` file
2. Select **Open** from the context menu
3. Click **Open** in the confirmation dialog

### ProxyBridge crashes on launch

Make sure you are running **macOS 12 Monterey or later**. ProxyBridge does not support older macOS versions due to the System Extension API requirements.
