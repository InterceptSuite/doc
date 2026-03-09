---
title: Connection Management
description: Monitor live network connections and track session lifecycle in InterceptSuite.
category: Features
order: 7
---

# Connection Management

Monitor and manage network connections in InterceptSuite.

## Overview

The **Connection** tab provides real-time monitoring of all network connections routed through the proxy. Use it to track source and destination ports, monitor connection status, and correlate connections with proxy history data.

## Connection Monitoring

### Connection Information

Each row in the connection table shows:

| Column | Description |
|---|---|
| Connection ID | Unique identifier for the connection |
| Source Port | The originating port of the connection |
| Destination Port | The target port of the connection |
| Status | Active or disconnected |

### Connection Status Tracking

**Active Connections:**
- Real-time status updates
- Live source and destination port information
- Ongoing session tracking

**Disconnected Connections:**
- Automatically detected when a session ends
- Identifies whether the disconnection was initiated by the server or client
- Historical record is retained until manually cleared

## Connection ID

Every connection is assigned a unique **Connection ID** that you can use across multiple InterceptSuite features to correlate data.

### Using Connection IDs Across Features

**In the Connection Tab:**
- Check whether a specific Connection ID shows a disconnection status
- Determine whether the connection was terminated by the server or client

**In Proxy History:**
- Search for the same Connection ID to find all packets associated with that session
- Cross-reference connection status with packet data

**In the Intercept Tab:**
- Verify connection status before or during packet interception
- Determine if the session is still alive before forwarding a held packet

### Connection Status Workflow

1. **Monitor** -Identify the Connection ID of interest in the Connection tab
2. **Cross-reference** -Use the same ID in Proxy History to review related packets
3. **Validate** -Check the connection status in the Intercept tab before acting
4. **Correlate** -Understand the full connection lifecycle across all features

## Connection Management

### Context Menu Options

Right-click the connection table to access:

| Action | Description |
|---|---|
| Copy | Copy selected connection information to clipboard |
| Clear Selected | Remove selected connection entries from the table |
| Clear All | Remove all connection entries from the table |

### Data Retention Considerations

The Connection tab stores port information that is required for accurate PCAP export (Professional Edition). Before clearing connection data, consider:

- **PCAP Export** -Removing connection entries causes InterceptSuite to use dummy port numbers when exporting those connections to PCAP
- **Cross-feature tracking** -Cleared connections break the ability to correlate data across features
- **Recommendation** -Keep connection data for as long as you may need to export PCAP files for those sessions

## Use Cases

### Network Monitoring

- Track which applications are generating traffic
- Monitor connection counts and port patterns
- Observe connection lifecycle from open to close

### Troubleshooting

- Identify whether a disconnect was client-initiated or server-initiated
- Use Connection IDs to trace the full history of a failing session
- Detect unexpected connection resets

### Security Analysis

- Map connection patterns for specific applications under test
- Identify unexpected outbound connections
- Correlate connection data with intercepted payload content

## Best Practices

- **Leave connections in the table** until you've finished any PCAP exports for those sessions
- **Use Connection IDs** consistently when correlating data across Proxy History and Intercept
- **Monitor status actively** -disconnected status early in a session often indicates a proxy or certificate configuration issue
- **Always verify connection status** before acting on a held packet in the Intercept tab
