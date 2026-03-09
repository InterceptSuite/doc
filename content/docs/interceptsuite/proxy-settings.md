---
title: Proxy Settings
description: Configure the proxy server, network addresses, logging, and certificate management.
category: Features
order: 8
---

# Proxy Settings

Configure and manage proxy server settings in InterceptSuite.

## Overview

The **Proxy Settings** section provides complete control over the proxy server, including network configuration, logging verbosity, and certificate management. This is where you tune the core proxy behavior.

## Proxy Server Control

### Starting and Stopping

- Use the **Start/Stop** controls to manually manage the proxy server
- By default, the proxy starts automatically when you launch InterceptSuite
- Changes take effect immediately

### Default Configuration

| Setting | Default Value |
|---|---|
| IP Address | `127.0.0.1` |
| SOCKS5 Port | `4444` |
| Protocol | SOCKS5 |
| Auto-start | Enabled |

## Network Configuration

### SOCKS5 Proxy Settings

You can customize the IP address and port the proxy listens on:

1. **Select IP Address** -Choose from available system IPs in the dropdown
2. **Set Port Number** -Enter your desired SOCKS5 proxy port (default: 4444)
3. **Save Settings** -Click save; the configuration takes effect immediately

> Port changes apply instantly without restarting the proxy service.

### UDP Relay Settings

The UDP relay port is fixed and not configurable:

| Setting | Value |
|---|---|
| UDP Relay Port | `4445` |
| IP Address | Same as SOCKS5 proxy IP |
| Configurable | No |

The UDP relay automatically binds to the same IP address as the SOCKS5 proxy. There is no manual configuration for the UDP relay port.

## Logging Configuration

### Verbose Logging

Enabling verbose logging adds significantly more detail to the log output:

- **Default:** Standard logging (connection events, errors)
- **Verbose:** Additional packet-level and diagnostic information

**When to enable verbose logging:**
- Diagnosing connection problems
- Troubleshooting extension behavior
- Performing in-depth traffic analysis
- Development and testing of extensions

**Performance note:** Verbose logging increases log size and processing overhead. Disable it for production use or when performance matters.

## Certificate Management

### Export Certificate

Click **Export Certificate** to save the InterceptSuite CA certificate and private key:

- Exports in **DER format**
- Includes the private key
- Use the exported certificate to install trust on client systems

**Common uses:**
- Installing the CA cert on target systems
- Adding to browsers, applications, or container environments
- Backing up the certificate before regenerating

### Regenerate Certificate

Click **Regenerate Certificate** to immediately create a new CA certificate:

- The current CA certificate is deleted and replaced instantly
- No proxy downtime -regeneration completes without stopping the service
- The new certificate is available immediately after regeneration

**When to regenerate:**
- The certificate may be compromised
- Starting a fresh analysis project and want a clean cert
- Certificate trust issues on client systems
- As part of a periodic security rotation policy

> **Important:** After regenerating, all client systems must reinstall the new CA certificate for TLS interception to work correctly. The old certificate will no longer be trusted by InterceptSuite.

## Configuration Workflow

### Initial Setup

1. Verify the defaults (IP `127.0.0.1`, port `4444`) meet your needs
2. Adjust IP or port if you need to proxy traffic from other hosts on your network
3. Enable verbose logging if you need detailed diagnostic information
4. Export the CA certificate and install it on your target systems

### Ongoing Management

1. Monitor proxy status to ensure it's running when needed
2. Adjust the IP/port configuration as your environment changes
3. Export or regenerate certificates as needed
4. Toggle verbose logging when troubleshooting, disable afterward

## Important Notes

### Network Considerations

- **IP selection** -If you need other devices to proxy through InterceptSuite, bind to your local network IP instead of `127.0.0.1`
- **Port conflicts** -Ensure the selected ports (`4444`, `4445`) are not already in use by other services
- **Firewall rules** -Configure your firewall to allow inbound traffic on the configured ports if intercepting from remote devices

### Certificate Impact

- Regenerating the CA certificate immediately breaks TLS interception for all clients until they install the new certificate
- Always export a backup of the certificate before regenerating if you need to restore it later
