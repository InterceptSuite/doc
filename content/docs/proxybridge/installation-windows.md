---
title: Install on Windows
description: Download and install ProxyBridge on Windows.
category: Getting Started
order: 2
---

# Installing ProxyBridge on Windows

ProxyBridge releases are published on the [ProxyBridge GitHub releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

## Download and Verification

### Download Installer

Download the latest `ProxyBridge-Setup-X.X.X.exe` from the [releases page](https://github.com/InterceptSuite/ProxyBridge/releases).

Each release includes a `sha256` checksum for every file. Verify the download before running it by running the following command in PowerShell:

```powershell
Get-FileHash <downloaded-file> -Algorithm SHA256
```

Compare the output against the checksum listed on the releases page.

## Installation Steps

1. Run the installer with Administrator privileges.
2. The installer will perform the following actions:
   - Install ProxyBridge to `C:\Program Files\ProxyBridge`
   - Add the install directory to your system PATH (GUI, CLI, and DLL all accessible).
   - Create Start Menu shortcuts for the GUI application.
   - Include the required WinDivert kernel driver dependency.

## Running ProxyBridge

### GUI

Search for **ProxyBridge** in the Start menu and click to launch it. Click **Yes** on the UAC prompt to grant the required administrator permissions.

### CLI

Open **Command Prompt as Administrator** (right-click and choose *Run as administrator*), then run:

```cmd
ProxyBridge_CLI.exe -h
```

> ProxyBridge requires administrator privileges on Windows to intercept network traffic at the kernel level.
