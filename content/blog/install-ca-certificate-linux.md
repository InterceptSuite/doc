---
title: "How to Install the InterceptSuite CA Certificate on Linux"
description: "Step-by-step guide to trust the InterceptSuite CA certificate on Linux (Ubuntu, Debian, Arch, Fedora) so you can intercept HTTPS traffic without certificate errors."
date: "2026-03-09"
author: "InterceptSuite Team"
readTime: "6 min read"
tags: ["Linux", "TLS", "Certificate", "HTTPS"]
---

To intercept HTTPS traffic on Linux, your system and applications must trust the InterceptSuite CA certificate. This guide covers exporting the certificate from InterceptSuite and installing it system-wide on the most common Linux distributions.

## Step 1 -Export the CA Certificate from InterceptSuite

Before installing, export the certificate from the InterceptSuite application.

1. Open **InterceptSuite** and navigate to the **Proxy** tab
2. Click the **Settings** sub-tab within the Proxy section
3. Scroll to the **Certificate Management** section
4. Click **Export Certificate**
5. When prompted for format, select **DER**
6. Choose your preferred save location (e.g. your home directory)
7. Click **Save** -you should now have a `.der` file

## Step 2 -Convert DER to PEM

Most Linux certificate tools work with PEM format. Convert the exported DER file using OpenSSL:

```bash
openssl x509 -inform DER -in interceptsuite-ca.der -out interceptsuite-ca.crt
```

> Replace `interceptsuite-ca.der` with the actual filename you saved in Step 1.

## Step 3 -Install System-Wide

### Ubuntu / Debian

```bash
# Copy the certificate to the system CA store
sudo cp interceptsuite-ca.crt /usr/local/share/ca-certificates/interceptsuite-ca.crt

# Update the CA store
sudo update-ca-certificates
```

You should see output like `1 added, 0 removed; done.`

### Fedora / RHEL / CentOS

```bash
# Copy the certificate
sudo cp interceptsuite-ca.crt /etc/pki/ca-trust/source/anchors/interceptsuite-ca.crt

# Update the CA trust store
sudo update-ca-trust
```

### Arch Linux / Manjaro

```bash
# Copy the certificate
sudo cp interceptsuite-ca.crt /etc/ca-certificates/trust-source/anchors/interceptsuite-ca.crt

# Rebuild the trust store
sudo trust extract-compat
```

## Step 4 -Verify the Installation

Check that the certificate is now trusted by the system:

```bash
# Ubuntu/Debian
awk -v cmd='openssl x509 -noout -subject' '/BEGIN/{close(cmd)};{print | cmd}' \
  /etc/ssl/certs/ca-certificates.crt | grep -i interceptsuite

# Fedora/RHEL
trust list | grep -i interceptsuite
```

Alternatively, test with curl against a site proxied through InterceptSuite:

```bash
# Should return without certificate errors if the CA is trusted
curl -x http://127.0.0.1:4444 https://example.com
```

## Step 5 -Configure Your Browser or Application

Route your traffic through InterceptSuite:

- **Proxy host:** `127.0.0.1`
- **Proxy port:** `4444` (or whichever port you configured)

### ProxyBridge -Recommended Proxy Client

[**ProxyBridge**](https://github.com/InterceptSuite/ProxyBridge) is a free, open-source proxy client built by the InterceptSuite team. It routes any application through InterceptSuite on Linux without needing per-app proxy configuration -especially useful for CLI tools and Electron apps that ignore system proxy settings.

- Forces any process to use a SOCKS5/HTTP proxy regardless of its own proxy settings
- Works with apps that don't natively support proxy configuration
- One-click setup with InterceptSuite
- Available on [GitHub](https://github.com/InterceptSuite/ProxyBridge)

### System-wide proxy (GNOME)

Go to **Settings → Network → Network Proxy**, set to **Manual**, and enter:
- HTTP Proxy: `127.0.0.1` Port `4444`
- HTTPS Proxy: `127.0.0.1` Port `4444`

### Environment variables (terminal / CLI tools)

```bash
export http_proxy=http://127.0.0.1:4444
export https_proxy=http://127.0.0.1:4444
export HTTP_PROXY=http://127.0.0.1:4444
export HTTPS_PROXY=http://127.0.0.1:4444
```

Add these to your `~/.bashrc` or `~/.zshrc` to persist across sessions.

### Firefox on Linux

Firefox uses its own certificate store and does not use the system CA store by default.

1. Open Firefox and go to **Settings → Privacy & Security**
2. Scroll to **Certificates** and click **View Certificates…**
3. Go to the **Authorities** tab and click **Import…**
4. Select your `.der` file (or the converted `.crt`) and click **Open**
5. Check **Trust this CA to identify websites** and click **OK**

### Chrome / Chromium on Linux

Chrome on Linux also maintains its own NSS certificate database. Use the `certutil` tool:

```bash
# Install libnss3-tools if not already present
sudo apt install libnss3-tools   # Ubuntu/Debian
sudo dnf install nss-tools       # Fedora

# Add the certificate to Chrome's NSS database
certutil -d sql:$HOME/.pki/nssdb -A -t "CT,," -n "InterceptSuite" -i interceptsuite-ca.crt
```

Restart Chrome after running this command.

## Troubleshooting

**`update-ca-certificates` reports 0 added** -Make sure the file extension is exactly `.crt` (not `.pem` or `.der`) and the file is in the correct directory.

**curl still shows SSL errors** -Confirm the cert was installed by running `curl --verbose` and checking the CA bundle path it uses. Some systems have multiple CA stores.

**Chrome ignores system CA** -Chrome on Linux uses its own NSS database. Use the `certutil` command in Step 5 to install it there separately.

**`openssl x509` conversion fails** -Double-check the exported file is in DER format. Try opening it in a hex editor -DER files start with the bytes `30 82`.
