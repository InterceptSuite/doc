export const docNavigation = [
  {
    category: 'Getting Started',
    slug: 'getting-started',
    description: 'Install InterceptSuite and start intercepting traffic in minutes.',
    icon: 'rocket',
    color: '#10B981',
    items: [
      { title: 'Introduction', slug: 'introduction', description: 'What is InterceptSuite and what can it do.' },
      { title: 'Installation', slug: 'installation', description: 'Install InterceptSuite on Windows, macOS, or Linux.' },
      { title: 'License Activation', slug: 'license-activation', description: 'Activate your Professional Edition license key.' },
      { title: 'Quick Start', slug: 'quick-start', description: 'Get up and running in under 5 minutes.' },
    ],
  },
  {
    category: 'Features',
    slug: 'features',
    description: 'In-depth guides for every feature in InterceptSuite.',
    icon: 'layers',
    color: '#3B82F6',
    items: [
      { title: 'Traffic Interception', slug: 'traffic-interception', description: 'Intercept and modify network packets in real-time.' },
      { title: 'Proxy History', slug: 'proxy-history', description: 'Review, search, and export every packet processed.' },
      { title: 'Connection Management', slug: 'connection-management', description: 'Monitor live connections and track session status.' },
      { title: 'Proxy Settings', slug: 'proxy-settings', description: 'Configure the proxy server, logging, and certificates.' },
    ],
  },
  {
    category: 'Extensions',
    slug: 'extensions',
    description: 'Extend InterceptSuite with custom Python 3 scripts.',
    icon: 'puzzle',
    color: '#F59E0B',
    items: [
      { title: 'Extension Overview', slug: 'extensions', description: 'Add Python extensions to process and analyze packets.' },
      { title: 'Extension API Reference', slug: 'extension-api', description: 'Complete reference for the InterceptSuite extension API.' },
    ],
  },
]

export const proxyBridgeNavigation = [
  {
    category: 'Getting Started',
    slug: 'getting-started',
    description: 'Install ProxyBridge and route your first application.',
    icon: 'rocket',
    color: '#10B981',
    items: [
      { title: 'Introduction', slug: 'introduction', description: 'What is ProxyBridge and how it works.' },
      { title: 'Installation', slug: 'installation', description: 'Install ProxyBridge on Windows, macOS, or Linux.' },
    ],
  },
  {
    category: 'Configuration',
    slug: 'configuration',
    description: 'Configure and use ProxyBridge with InterceptSuite.',
    icon: 'settings',
    color: '#3B82F6',
    items: [
      { title: 'Configuration', slug: 'configuration', description: 'Configure ProxyBridge with flags or a config file.' },
      { title: 'Usage', slug: 'usage', description: 'Common workflows and real-world examples.' },
    ],
  },
]
