---
title: Configuration (Windows)
description: Configure ProxyBridge on Windows to route application traffic through InterceptSuite.
category: Configuration
order: 3
---

# Configuration — Windows

Open **ProxyBridge** from the Start menu. Windows will show a UAC prompt — click **Yes** to grant the required administrator permissions. ProxyBridge requires administrator privileges to intercept network traffic at the kernel level.

## Proxy Settings

![ProxyBridge Proxy Settings window](/img/proxy-setting.png)

1. Click the **Proxy** tab in the main window
2. Click **Proxy Settings** from the menu
3. Select **Proxy Type** — `SOCKS5` or `HTTP`
4. Enter **Proxy Host** — IP address of the proxy server (e.g. `127.0.0.1`, `192.168.1.100`)
5. Enter **Proxy Port** (e.g. `4444` for InterceptSuite, `1080` for SOCKS5, `8080` for HTTP)
6. (Optional) Enter **Proxy Username** and **Proxy Password** for authenticated proxies — HTTP Basic Auth and SOCKS5 authentication are both supported. Leave blank for local InterceptSuite use.
7. Click **Save Changes**

### Test Proxy Connection

1. Click **Test Proxy Connection**
2. Enter **Destination IP/Host** (default: `google.com`)
3. Enter **Destination Port** (default: `80`)
4. Click **Start Test** — results appear in the output area

## Proxy Rules

![ProxyBridge Add Rule window](/img/proxy-rule.png)

![ProxyBridge Rules list](/img/proxy-rule2.png)

1. Click the **Proxy** tab, then click **Proxy Rules**
2. Click **Add Rule**
3. Configure the rule fields:

**Applications**

| Format | Example |
|--------|---------|
| All processes | `*` |
| Single process | `chrome.exe` |
| Multiple processes (semicolon-separated) | `firefox.exe; chrome.exe` |
| Wildcard match | `steam*.exe` |
| Browse button | select executable from disk |

**Target Hosts** (optional — leave empty or use `*` for all)

| Format | Example |
|--------|---------|
| Specific IP | `127.0.0.1` |
| Wildcard range | `192.168.*.*` |
| Multiple IPs | `127.0.0.1; 192.168.1.1` |
| IP range | `10.10.1.1-10.10.255.255` |

**Target Ports** (optional — leave empty or use `*` for all)

| Format | Example |
|--------|---------|
| Specific ports | `80; 8080` |
| Port range | `80-8000` |

**Protocol** — `TCP`, `UDP`, or `Both (TCP + UDP)`

**Action**

| Action | Behaviour |
|--------|-----------|
| `PROXY` | Route through the configured proxy |
| `DIRECT` | Allow direct internet access |
| `BLOCK` | Block all internet access |

4. Click **Save Rule**

> Rules are evaluated top-down — the first matching rule wins. Place more specific rules above broader ones.

> Adding a `PROXY` rule while no proxy is configured will result in traffic being routed as a direct connection. Configure proxy settings before using PROXY rules.

### Exporting and Importing Rules

Rules can be exported to a JSON file and imported on another machine, making it easy to share or back up configurations. The format is compatible across Windows, macOS, and Linux.

**Export**

1. In the **Proxy Rules** window, tick the checkboxes in the **Select** column for the rules you want to export (or click **Select All**)
2. Click **Export** (only active when at least one rule is selected)
3. Choose a save location — the file is saved as JSON

**Import**

1. Click **Import**
2. Select a previously exported JSON file
3. Rules are added to your existing rule list

**JSON format**

```json
[
  {
    "processNames": "chrome.exe",
    "targetHosts": "*",
    "targetPorts": "*",
    "protocol": "TCP",
    "action": "PROXY",
    "enabled": true
  },
  {
    "processNames": "firefox.exe",
    "targetHosts": "192.168.*.*",
    "targetPorts": "80;443",
    "protocol": "BOTH",
    "action": "DIRECT",
    "enabled": true
  }
]
```

## Activity Monitoring

![ProxyBridge Connections tab showing live traffic](/img/ProxyBridge.png)

- View real-time connection activity in the **Connections** tab
- Monitor both TCP and UDP connections across all processes
- See whether each connection is routed as `PROXY`, `DIRECT`, or `BLOCK`
- Use the search box to filter connections

## CLI

The CLI provides the same capabilities as the GUI and is useful for scripting and automation. Open **Command Prompt as Administrator**, then run:

```
ProxyBridge_CLI -h
```

### Common examples

```powershell
# Route Chrome through InterceptSuite (SOCKS5)
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule "chrome.exe:*:*:TCP:PROXY"

# Use an HTTP proxy
ProxyBridge_CLI --proxy http://192.168.1.100:8080

# Multiple processes in one rule
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule "chrome.exe;firefox.exe:*:*:TCP:PROXY"

# Multiple rules with verbose logging
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule "chrome.exe:*:*:TCP:PROXY" --rule "firefox.exe:*:*:TCP:PROXY" --verbose 2

# Block a specific process
ProxyBridge_CLI --rule "malware.exe:*:*:BOTH:BLOCK"

# Route all traffic through proxy, but let InterceptSuite itself go direct
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule "InterceptSuite.exe:*:*:TCP:DIRECT" --rule "*:*:*:TCP:PROXY"

# Target specific IPs and ports
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule "chrome.exe:192.168.*;10.10.*.*:80;443;8080:TCP:PROXY"

# Load rules from a JSON file
ProxyBridge_CLI --proxy socks5://127.0.0.1:4444 --rule-file C:\rules.json

# Combine file rules with an extra command-line rule
ProxyBridge_CLI --rule-file C:\rules.json --rule "steam.exe:*:*:TCP:PROXY"
```

### All options

```
Options:
  --proxy <proxy>          Proxy server URL with optional authentication
                           Format: type://ip:port or type://ip:port:username:password
                           Examples: socks5://127.0.0.1:1080
                                     http://proxy.com:8080:myuser:mypass
                           [default: socks5://127.0.0.1:4444]

  --rule <rule>            Traffic routing rule (repeatable)
                           Format: process:hosts:ports:protocol:action
                             process  - chrome.exe, chr*.exe, *.exe, or *
                                        (use ; for multiple: chrome.exe;firefox.exe)
                             hosts    - *, google.com, 192.168.*.*, or multiple (;)
                             ports    - *, 443, 80;8080, 80-100
                             protocol - TCP, UDP, or BOTH
                             action   - PROXY, DIRECT, or BLOCK

  --rule-file <path>       Path to JSON rules file (same format as GUI export)
                           Example: --rule-file C:\\rules.json

  --dns-via-proxy          Route DNS queries through proxy [default: true]

  --localhost-via-proxy    Route localhost (127.x.x.x) through proxy
                           [default: false — see notes below]

  --verbose <level>        0 = no logs (default), 1 = log messages,
                           2 = connection events, 3 = both

  --version                Show version information

  --update                 Check for updates and download latest version

  -h, --help               Show help
```

### Rule format reference

**Format:** `process:hosts:ports:protocol:action`

| Field | Values |
|-------|--------|
| process | `chrome.exe`, `chrome.exe;firefox.exe`, `steam*.exe`, `*` |
| hosts | `*`, `192.168.1.1`, `192.168.*.*`, `10.0.1.1-10.0.255.255`, `host1;host2` |
| ports | `*`, `443`, `80;443;8080`, `80-8000` |
| protocol | `TCP`, `UDP`, `BOTH` |
| action | `PROXY`, `DIRECT`, `BLOCK` |

Process names are case-insensitive. Press `Ctrl+C` to stop ProxyBridge.

## Things to Note

### DNS traffic

DNS traffic on TCP/UDP port 53 is handled separately from proxy rules — port 53 rules are ignored. DNS routing is controlled by the **DNS via Proxy** option in the Proxy menu (enabled by default). When enabled, all DNS queries go through the proxy. When disabled, DNS uses direct connection.

CLI equivalent: `--dns-via-proxy`

### Localhost traffic

Localhost traffic (`127.0.0.0/8`) bypasses proxy rules and goes direct by default. This is the recommended setting because most proxy servers reject localhost connections to prevent SSRF attacks, and many applications run local services on `127.0.0.1` that must stay on your machine (DevTools debugging, local dev servers, IPC).

**Enable localhost proxying only when:**
- The proxy is running on the same machine (e.g. `127.0.0.1:4444`)
- You are security testing and need to intercept localhost traffic in InterceptSuite/Burp Suite

GUI: **Proxy** menu → **Localhost via Proxy**  
CLI: `--localhost-via-proxy`

### Addresses that always go direct

The following are automatically routed as direct regardless of rules (you can still BLOCK them with an explicit rule):

| Type | Range |
|------|-------|
| Broadcast | `255.255.255.255` and `x.x.x.255` |
| Multicast | `224.0.0.0 – 239.255.255.255` |
| APIPA / link-local | `169.254.0.0/16` |
| DHCP ports | UDP 67, 68 |

### UDP proxy requirements

**HTTP proxy + UDP = direct connection**

HTTP proxy servers do not support UDP. If your configured proxy type is HTTP and you add a rule with Action `PROXY` and Protocol `UDP` or `BOTH`, ProxyBridge will not forward those UDP packets through the proxy — they will go direct instead. `BLOCK` and `DIRECT` UDP rules work regardless of proxy type.

**SOCKS5 is required for UDP proxying, but is not sufficient on its own**

Switching to a SOCKS5 proxy enables UDP forwarding in ProxyBridge, but whether UDP traffic actually reaches the destination depends entirely on whether the SOCKS5 proxy server supports the **UDP ASSOCIATE** command. Most SOCKS5 proxy servers on the market — including SSH dynamic port forwarding (`ssh -D`) — do not implement UDP ASSOCIATE. If ProxyBridge forwards a UDP packet to a SOCKS5 proxy that doesn't support it, the proxy will drop the packet. You may experience slow connectivity, packet loss, or broken applications that rely on UDP.

Only add UDP `PROXY` rules if you have confirmed your SOCKS5 proxy server supports UDP ASSOCIATE.

**QUIC and HTTP/3**

Even with a SOCKS5 proxy that supports UDP ASSOCIATE, many modern applications and websites may still not work correctly over UDP proxy. Most major websites and CDNs (Cloudflare, Fastly, Google, etc.) now support **HTTP/3**, which runs over **QUIC** — a UDP-based protocol. Routing QUIC traffic through a SOCKS5 proxy requires the proxy server to understand and handle QUIC and HTTP/3 specifically, not just raw UDP. A proxy that supports UDP ASSOCIATE at the SOCKS5 level does not automatically gain HTTP/3 or QUIC support.

In practice, unless your SOCKS5 proxy explicitly supports HTTP/3 and QUIC proxying, routing UDP to it may work for simple UDP applications but will likely fail or degrade for any traffic to modern CDN-backed websites.

**Testing UDP and HTTP/3 support**

If you want to test ProxyBridge's UDP proxying including HTTP/3 and QUIC, [Nexus Proxy](https://github.com/InterceptSuite/nexus-proxy) is a SOCKS5 proxy server built by InterceptSuite specifically for this purpose. It supports UDP ASSOCIATE along with HTTP/3 and QUIC handling. It is not a full production-ready proxy server, but it is useful for validating that UDP rules, HTTP/3, and QUIC traffic flow correctly through ProxyBridge before deploying a production setup.

### IPv6

IPv6 is not currently supported. IPv4 only.

## How It Works

ProxyBridge uses [WinDivert](https://reqrypt.org/windivert.html) to intercept all TCP/UDP packets at the kernel level and applies your rules to each packet.

**Traffic flow for a proxied connection:**

1. An application (Chrome, a game, a desktop tool) generates a TCP/UDP packet
2. The WinDivert kernel driver intercepts the outbound packet before it reaches the network
3. ProxyBridge evaluates the packet against your rules:
   - **BLOCK** → packet is dropped
   - **DIRECT** or no match → packet is re-injected unchanged
   - **PROXY** → packet destination is rewritten to an internal relay port (`34010` for TCP, `34011` for UDP)
4. The relay server reads the original destination, wraps the connection in SOCKS5/HTTP proxy protocol, authenticates if required, and forwards to the proxy
5. The proxy (InterceptSuite) forwards to the real destination
6. Response traffic flows back through the relay, which restores the original source IP/port before re-injection into the network stack

Applications are completely unaware of any of this — they see normal socket behaviour.

## Resource Usage

ProxyBridge runs internal TCP and UDP relay servers to redirect intercepted packets to the configured proxy server. Under normal low-traffic conditions, CPU and memory usage is minimal.

### CPU usage

Under high network load, the relay servers handle large volumes of packets, which increases CPU usage. A spike of **2–11% CPU** during heavy traffic is normal. As soon as network load drops, CPU usage should return to below 1% or lower. If CPU usage remains elevated when the machine is otherwise idle, check whether a rule is matching unexpectedly high volumes of traffic.

### Memory usage

The relay servers maintain per-connection state and a connection cache to keep routing fast under load. Memory usage can rise from a baseline of around 50–60 MB to 100–150 MB during heavy traffic. Once load decreases, memory should settle back to below 100 MB or lower. The cache is managed automatically — you do not need to restart ProxyBridge to reclaim memory.


