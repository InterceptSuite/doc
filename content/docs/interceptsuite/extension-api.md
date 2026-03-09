---
title: Extension API Reference
description: Complete reference for building custom InterceptSuite Python extensions.
category: Extensions
order: 10
---

# Extension API Reference

Complete reference for developing custom InterceptSuite Python extensions.

## Extension Class Requirements

Every extension must define a class named `InterceptSuiteExtension`. InterceptSuite only loads files that contain this class -it is required.

```python
class InterceptSuiteExtension:
    def register_interceptor_api(self, interceptor):
        interceptor.set_extension_name('My Extension')
        interceptor.set_extension_version('1.0.0')
```

## Required Methods

### `register_interceptor_api(self, interceptor)`

This method is called by InterceptSuite when the extension loads. It must be present in `InterceptSuiteExtension`.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `interceptor` | object | The InterceptSuite API object |

### Required API Calls

Within `register_interceptor_api`, you must call both of the following:

```python
interceptor.set_extension_name('My Extension')    # Required
interceptor.set_extension_version('1.0.0')        # Required
```

Both methods accept a string parameter. Without these calls, the extension will fail to load.

## Extension Logging

To write messages to the Extension Logs tab inside InterceptSuite, import and use `ExtensionLogger`:

```python
from InterceptSuite.Extensions.APIs.Logging import ExtensionLogger

ExtensionLogger.Log("Extension loaded successfully!")
```

Log messages appear in the **Extension tab → Logs** section. Any string is accepted.

### Full Registration Example

```python
from InterceptSuite.Extensions.APIs.Logging import ExtensionLogger

class InterceptSuiteExtension:
    def register_interceptor_api(self, interceptor):
        interceptor.set_extension_name('My Custom Extension')
        interceptor.set_extension_version('1.0.0')
        ExtensionLogger.Log("Extension registered successfully!")
```

## Custom Data Viewer Tabs

Extensions can add tabs to the packet viewer alongside the built-in **Raw** and **Hex** tabs. This is done by registering a handler class with `AddDataViewerTab`.

### Registering a Custom Tab

```python
interceptor.AddDataViewerTab("Base64", MyHandlerClass())
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| Tab Name | string | The label shown on the tab |
| Handler Instance | object | An instance of your handler class |

### Handler Class Requirements

Your handler class must implement three methods:

```python
class MyHandlerClass:
    def should_show_tab(self, data):
        """Return True to show the tab for this packet, False to hide it."""
        return True

    def fetchdata(self, data):
        """Process packet data and return the content to display in the tab."""
        raw = data.get("data", "")
        return raw  # Return processed string

    def updatedata(self, data):
        """Handle user edits made in the tab. Return updated data or None."""
        edited = data.get("edited_data", "")
        if edited:
            return edited  # Return the updated packet content
        return None
```

### The `data` Dictionary

The `data` parameter passed to all handler methods is a dictionary with the following structure:

```python
{
    "ip":               "23.215.0.136",      # str  - Source IP address
    "destination_ip":   "127.0.0.1",         # str  - Destination IP address
    "source_port":      0,                   # int  - Source port
    "destination_port": 38313,               # int  - Destination port
    "direction":        "Server->Client",    # str  - Packet direction
    "length":           1452,                # int  - Packet length in bytes
    "data":             "packet_payload",    # str  - Raw packet data
    "type":             "Text/Binary",       # str  - Data type
    "timestamp":        "2025-08-16 20.35.26", # str - Timestamp
    "connection_id":    1,                   # int  - Connection identifier
    "is_editable":      False                # bool - False = proxy history view
}
```

### Method Reference

#### `should_show_tab(self, data) -> bool`

Controls visibility of your custom tab for each packet.

- Return `True` to show the tab
- Return `False` to hide the tab

Use this to show your tab only when the packet data is relevant:

```python
def should_show_tab(self, data):
    raw = data.get("data", "")
    return "HTTP" in raw  # Only show for HTTP packets
```

#### `fetchdata(self, data) -> str`

Processes the packet data for display in your tab.

- Receives the full `data` dictionary
- Returns a string to display in the tab

```python
def fetchdata(self, data):
    import base64
    raw = data.get("data", "")
    try:
        return base64.b64decode(raw).decode("utf-8", errors="ignore")
    except Exception:
        return "Invalid base64 data"
```

#### `updatedata(self, data) -> str | None`

Handles user edits made in your custom tab.

- `data.get("edited_data")` contains what the user typed in your tab
- Return the updated packet content to replace the original payload
- Return `None` if no update should be applied

```python
def updatedata(self, data):
    import base64
    edited = data.get("edited_data", "")
    if edited:
        try:
            return base64.b64encode(edited.encode("utf-8")).decode("utf-8")
        except Exception:
            return None
    return None
```

## Complete Example: Base64 Viewer Extension

```python
import base64
from InterceptSuite.Extensions.APIs.Logging import ExtensionLogger


class Base64HandlerClass:
    def should_show_tab(self, data):
        raw = data.get("data", "")
        try:
            base64.b64decode(raw, validate=True)
            return True
        except Exception:
            return False

    def fetchdata(self, data):
        raw = data.get("data", "")
        try:
            return base64.b64decode(raw).decode("utf-8", errors="ignore")
        except Exception:
            return "Unable to decode as Base64"

    def updatedata(self, data):
        edited = data.get("edited_data", "")
        if edited:
            try:
                return base64.b64encode(edited.encode("utf-8")).decode("utf-8")
            except Exception:
                return None
        return None


class InterceptSuiteExtension:
    def register_interceptor_api(self, interceptor):
        interceptor.set_extension_name("Base64 Viewer")
        interceptor.set_extension_version("1.0.0")
        interceptor.AddDataViewerTab("Base64", Base64HandlerClass())
        ExtensionLogger.Log("Base64 Viewer tab registered.")
```

## Example Extensions Repository

For more working examples and starter templates, see the official repository:

[github.com/InterceptSuite/Extension](https://github.com/InterceptSuite/Extension)

The repository includes:

- Working examples for common extension patterns
- Starter templates for custom tab implementations
- Real-world examples following best practices
- Data format examples (Base64, JSON, XML, binary)
