---
title: Traffic Interception
description: Intercept and modify TCP, UDP, and TLS network packets in real-time.
category: Features
order: 5
---

# Traffic Interception

Real-time traffic interception and modification capabilities in InterceptSuite.

## Overview

The **Proxy** tab provides powerful interception features that let you capture and modify network traffic in real-time. You can intercept traffic flowing in both directions:

- **Client to Server** -Intercept outgoing requests from your application
- **Server to Client** -Intercept incoming responses from the server

## Interception Controls

### Forward and Drop Actions

When a packet is intercepted, you have two primary actions:

- **Forward** -Send the (optionally modified) packet to its intended destination
- **Drop** -Discard the packet so it is never delivered

### Enabling Interception

By default, interception is disabled -all traffic passes through without interruption.

To start intercepting:

1. **Enable Interception** -Click the **Intercept ON/OFF** button to activate it
2. **Select Direction** -Enabling interception alone won't capture packets; you must also choose the traffic direction

### Direction Options

Select from three direction modes in the dropdown:

| Mode | Behavior |
|---|---|
| Client to Server | Intercepts only outgoing client requests |
| Server to Client | Intercepts only incoming server responses |
| Both | Intercepts traffic in both directions |

## Packet Data Viewer

The packet data viewer lets you inspect and modify the content of intercepted packets.

### Default State

The viewer is inactive until a packet is intercepted. Once a packet arrives, it becomes editable and ready for inspection.

### Viewing and Editing Options

#### Raw Tab

- **Purpose:** Edit the raw packet data
- **Format:** Plain text representation of the packet bytes
- **Editable:** Yes -you can modify the content before forwarding

#### Hex Tab

- **Purpose:** View packet data in hexadecimal format
- **Format:** Hex representation of the raw bytes
- **Editable:** No -the hex view is read-only

## Multiple Packet Handling

### Intercept Packet Queue

When interception is active, InterceptSuite queues incoming packets automatically:

- Packets are **paused** and added to the intercept queue
- Only the **first packet** in the queue is displayed in the Intercept tab at a time
- A **counter** in the top-right shows the current queue depth

### FIFO Processing

InterceptSuite uses a **FIFO** (First In, First Out) queue:

- The first intercepted packet is always presented first
- Packets are **not** automatically removed from the queue
- You must manually **Forward** or **Drop** each packet to process the next one

### Queue Management Tips

- **Monitor queue depth** -Watch the packet counter to avoid large backlogs
- **Process promptly** -Holding packets too long can cause session timeouts
- **Clear the queue** -Disable interception to auto-forward all queued packets at once

### Auto-Forward on Disable

When you turn off interception:

- All packets currently in the queue are **automatically forwarded**
- This is the fastest way to flush the queue without dropping traffic

## Session Management and Timeouts

### Connection Timeouts

Session timeout behavior depends on the protocol:

- Different protocols have different TCP session timeout durations
- Some sessions have very short timeouts; others tolerate longer holds
- Both client- and server-side timeout characteristics matter

### Session Termination Handling

If you hold a packet too long:

1. The server or client may terminate the session due to timeout
2. Post-termination, any forwarded packets will be rejected
3. InterceptSuite automatically detects session termination
4. Packets that have no active session are automatically dropped

### Best Practices

- **Analyze quickly** -Modify and forward packets before session timeouts
- **Monitor session status** -Use the Connection tab to check if a session is still alive
- **Understand your protocols** -Know the timeout characteristics of the protocols you're working with
