export interface InventoryItem {
  masterSku: string;
  productName: string;
  available: number;
  reserved: number;
  status: 'Healthy' | 'Low Stock' | 'Out of Stock';
  store: string;
  channel: string;
  channelSku: string;
  lastUpdate: string;
}

export interface StoreItem {
  id: string;
  name: string;
  platform: string;
  health: 'Healthy' | 'Warning' | 'Syncing' | 'Error' | 'Disconnected';
  connectionStatus: 'Connected' | 'Disconnected' | 'Pending' | 'Error';
  productsCount: number;
  lastSync: string;
  connectedChannels: string[];
  recentActivity: string[];
  recentErrors?: string[];
}

export interface ChannelItem {
  id: string;
  name: string;
  platform: string;
  connectionState: 'Connected' | 'Disconnected' | 'Pending' | 'Error';
  syncState: 'Healthy' | 'Syncing' | 'Failed' | 'Retrying' | 'Pending';
  lastSuccessfulSync: string;
  lastActivity: string;
  associatedStores: string[];
  errorMsg?: string;
}

export interface SyncTimelineStep {
  title: string;
  timestamp: string;
  status: 'info' | 'success' | 'failed' | 'warning';
}

export interface SyncActivityItem {
  id: string;
  masterSku: string;
  store: string;
  channel: string;
  operation: 'Inventory Update' | 'Stock Reservation' | 'Inventory Sync' | 'SKU Mapping Update';
  status: 'Success' | 'Failed' | 'Retrying' | 'Pending';
  timestamp: string;
  reason?: string;
  retryCount?: number;
  timelineSteps: SyncTimelineStep[];
}

export interface ExceptionItem {
  id: string;
  masterSku: string;
  productName: string;
  store: string;
  channel: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: 'Channel API timeout' | 'Invalid SKU mapping' | 'Inventory conflict' | 'Rate limit exceeded' | 'Missing channel product' | 'Conflicting inventory state';
  status: 'Open' | 'Retrying' | 'Failed' | 'DLQ' | 'Resolved';
  retryCount: number;
  createdAt: string;
  whatHappened: string;
  whyHappened: string;
  whatOmniSyncDid: string;
  timelineSteps: SyncTimelineStep[];
}

export interface SkuMappingItem {
  id: string;
  masterSku: string;
  productName: string;
  channelSku: string;
  store: string;
  channel: string;
  mappingState: 'Mapped' | 'Unmapped' | 'Conflict' | 'Pending Review';
  lastUpdated: string;
  conflictDetail?: {
    conflictingChannelSku: string;
    affectedChannel: string;
    affectedStore: string;
    explanation: string;
  };
}

export interface EventTimelineItem {
  id: string;
  type: 'update' | 'sync_start' | 'sync_complete' | 'sync_failed' | 'exception_created' | 'retry_started';
  title: string;
  description: string;
  time: string;
  masterSku?: string;
}

// 1. MOCK INVENTORY
export const MOCK_INVENTORY: InventoryItem[] = [
  {
    masterSku: 'MASTER-1042',
    productName: 'Classic Black Hoodie',
    available: 0,
    reserved: 5,
    status: 'Out of Stock',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    channelSku: 'SHOP-1042',
    lastUpdate: '12 mins ago',
  },
  {
    masterSku: 'MASTER-1088',
    productName: 'Essential White Tee',
    available: 48,
    reserved: 2,
    status: 'Healthy',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    channelSku: 'SHPF-WHT-TEE-L',
    lastUpdate: '2 mins ago',
  },
  {
    masterSku: 'MASTER-1121',
    productName: 'Everyday Cargo Pant',
    available: 4,
    reserved: 1,
    status: 'Low Stock',
    store: 'Demo Store',
    channel: 'Amazon',
    channelSku: 'AMZ-CRG-PNT-32',
    lastUpdate: '18 mins ago',
  },
  {
    masterSku: 'MASTER-1005',
    productName: 'Performance Zip Hoodie',
    available: 120,
    reserved: 12,
    status: 'Healthy',
    store: 'Europe Logistics Hub',
    channel: 'eBay',
    channelSku: 'EBY-ZIP-HD-XL',
    lastUpdate: '35 mins ago',
  },
  {
    masterSku: 'MASTER-1090',
    productName: 'Heavyweight Fleece Crew',
    available: 0,
    reserved: 0,
    status: 'Out of Stock',
    store: 'Main Shopify Store',
    channel: 'Etsy',
    channelSku: 'ETSY-FLC-CRW-S',
    lastUpdate: '1 hour ago',
  },
  {
    masterSku: 'MASTER-1145',
    productName: 'Minimalist Canvas Tote',
    available: 8,
    reserved: 0,
    status: 'Low Stock',
    store: 'Demo Store',
    channel: 'Shopify',
    channelSku: 'SHPF-CNV-TOT-OS',
    lastUpdate: '2 hours ago',
  },
  {
    masterSku: 'MASTER-1201',
    productName: 'Seamless Running Socks (3-Pack)',
    available: 310,
    reserved: 15,
    status: 'Healthy',
    store: 'Main Shopify Store',
    channel: 'Amazon',
    channelSku: 'AMZ-RUN-SCK-M',
    lastUpdate: '3 hours ago',
  },
];

// 2. MOCK STORES
export const MOCK_STORES: StoreItem[] = [
  {
    id: 'STR-01',
    name: 'Main Shopify Store',
    platform: 'Shopify',
    health: 'Healthy',
    connectionStatus: 'Connected',
    productsCount: 1248,
    lastSync: '2 minutes ago',
    connectedChannels: ['Shopify', 'Amazon', 'Etsy'],
    recentActivity: [
      'Inventory rebalance completed for 48 SKUs (2m ago)',
      'Sync failure logged for MASTER-1042 on Shopify (12m ago)',
      'Webhook received: Order #9840 placed (30m ago)',
    ],
    recentErrors: [
      'Shopify API Timeout on MASTER-1042 sync attempt',
    ],
  },
  {
    id: 'STR-02',
    name: 'Demo Store',
    platform: 'Shopify Custom',
    health: 'Healthy',
    connectionStatus: 'Connected',
    productsCount: 320,
    lastSync: '18 minutes ago',
    connectedChannels: ['Shopify', 'Amazon'],
    recentActivity: [
      'Delta sync completed (18m ago)',
      'SKU mapping audit passed (2h ago)',
    ],
  },
  {
    id: 'STR-03',
    name: 'Europe Logistics Hub',
    platform: 'ERP / Warehouse API',
    health: 'Warning',
    connectionStatus: 'Connected',
    productsCount: 190,
    lastSync: '35 minutes ago',
    connectedChannels: ['eBay'],
    recentActivity: [
      'Batch quantity audit completed (35m ago)',
      'Rate limit alert generated for eBay connector (45m ago)',
    ],
    recentErrors: [
      'Approaching hourly API quota limit (88%)',
    ],
  },
  {
    id: 'STR-04',
    name: 'US West Coast Depot',
    platform: '3PL Integration',
    health: 'Error',
    connectionStatus: 'Error',
    productsCount: 70,
    lastSync: '1 hour ago',
    connectedChannels: ['Walmart'],
    recentActivity: [
      'Connection ping failed (1h ago)',
      'Automated reconnect scheduled (in 5m)',
    ],
    recentErrors: [
      '3PL Gateway returned 503 Service Unavailable',
    ],
  },
];

// 3. MOCK CHANNELS
export const MOCK_CHANNELS: ChannelItem[] = [
  {
    id: 'CHN-SHPF',
    name: 'Shopify',
    platform: 'Shopify GraphQL v2024-01',
    connectionState: 'Connected',
    syncState: 'Healthy',
    lastSuccessfulSync: '2 minutes ago',
    lastActivity: 'Pushed inventory update for MASTER-1088',
    associatedStores: ['Main Shopify Store', 'Demo Store'],
  },
  {
    id: 'CHN-AMZN',
    name: 'Amazon',
    platform: 'Amazon SP-API v2021-06-30',
    connectionState: 'Connected',
    syncState: 'Healthy',
    lastSuccessfulSync: '18 minutes ago',
    lastActivity: 'Rate-limited retry in progress for MASTER-1121',
    associatedStores: ['Main Shopify Store', 'Demo Store'],
    errorMsg: 'Rate limit warning: 88/100 req/min',
  },
  {
    id: 'CHN-ETSY',
    name: 'Etsy',
    platform: 'Etsy Open API v3',
    connectionState: 'Connected',
    syncState: 'Healthy',
    lastSuccessfulSync: '1 hour ago',
    lastActivity: 'Listing status check completed',
    associatedStores: ['Main Shopify Store'],
  },
  {
    id: 'CHN-EBAY',
    name: 'eBay',
    platform: 'eBay Inventory API v1',
    connectionState: 'Connected',
    syncState: 'Healthy',
    lastSuccessfulSync: '35 minutes ago',
    lastActivity: 'Batch feed update confirmed',
    associatedStores: ['Europe Logistics Hub'],
  },
  {
    id: 'CHN-TKYS',
    name: 'TikTok Shop',
    platform: 'TikTok Shop API v202309',
    connectionState: 'Pending',
    syncState: 'Pending',
    lastSuccessfulSync: 'Never',
    lastActivity: 'OAuth integration pending merchant approval',
    associatedStores: ['Main Shopify Store'],
  },
  {
    id: 'CHN-ALIEX',
    name: 'AliExpress',
    platform: 'AliExpress Open Platform',
    connectionState: 'Disconnected',
    syncState: 'Failed',
    lastSuccessfulSync: '2 days ago',
    lastActivity: 'API token expired',
    associatedStores: [],
    errorMsg: 'Authentication token expired on 2026-10-06',
  },
];

// 4. MOCK SKU MAPPINGS
export const MOCK_SKU_MAPPINGS: SkuMappingItem[] = [
  {
    id: 'MAP-101',
    masterSku: 'MASTER-1042',
    productName: 'Classic Black Hoodie',
    channelSku: 'SHOP-1042',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    mappingState: 'Mapped',
    lastUpdated: '12 mins ago',
  },
  {
    id: 'MAP-102',
    masterSku: 'MASTER-1088',
    productName: 'Essential White Tee',
    channelSku: 'AMZ-WHT-TEE-PRIMARY',
    store: 'Main Shopify Store',
    channel: 'Amazon',
    mappingState: 'Conflict',
    lastUpdated: '5 mins ago',
    conflictDetail: {
      conflictingChannelSku: 'AMZ-WHT-TEE-ALT',
      affectedChannel: 'Amazon',
      affectedStore: 'Main Shopify Store',
      explanation: 'Two possible channel SKU mappings exist for MASTER-1088 on Amazon Seller Central (AMZ-WHT-TEE-PRIMARY vs AMZ-WHT-TEE-ALT).'
    }
  },
  {
    id: 'MAP-103',
    masterSku: 'MASTER-1121',
    productName: 'Everyday Cargo Pant',
    channelSku: 'AMZ-CRG-PNT-32',
    store: 'Demo Store',
    channel: 'Amazon',
    mappingState: 'Mapped',
    lastUpdated: '18 mins ago',
  },
  {
    id: 'MAP-104',
    masterSku: 'MASTER-1005',
    productName: 'Performance Zip Hoodie',
    channelSku: 'EBY-ZIP-HD-XL',
    store: 'Europe Logistics Hub',
    channel: 'eBay',
    mappingState: 'Mapped',
    lastUpdated: '35 mins ago',
  },
  {
    id: 'MAP-105',
    masterSku: 'MASTER-1090',
    productName: 'Heavyweight Fleece Crew',
    channelSku: 'UNMAPPED',
    store: 'Main Shopify Store',
    channel: 'Etsy',
    mappingState: 'Unmapped',
    lastUpdated: '1 hour ago',
  },
  {
    id: 'MAP-106',
    masterSku: 'MASTER-1145',
    productName: 'Minimalist Canvas Tote',
    channelSku: 'SHPF-CNV-TOT-OS',
    store: 'Demo Store',
    channel: 'Shopify',
    mappingState: 'Pending Review',
    lastUpdated: '2 hours ago',
  },
];

// 5. MOCK SYNC ACTIVITIES
export const MOCK_SYNC_ACTIVITIES: SyncActivityItem[] = [
  {
    id: 'SYNC-9941',
    masterSku: 'MASTER-1042',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    operation: 'Inventory Update',
    status: 'Failed',
    timestamp: '12 mins ago',
    reason: 'Channel API timeout',
    retryCount: 2,
    timelineSteps: [
      { title: 'Inventory change detected', timestamp: '12m ago', status: 'info' },
      { title: 'Event SYNC-9941 created', timestamp: '12m ago', status: 'info' },
      { title: 'Shopify API request initiated', timestamp: '12m ago', status: 'info' },
      { title: 'Shopify API response timed out (HTTP 504)', timestamp: '12m ago', status: 'failed' },
      { title: 'Synchronization failed', timestamp: '12m ago', status: 'failed' },
      { title: 'Exception EXC-2041 created', timestamp: '12m ago', status: 'failed' },
    ],
  },
  {
    id: 'SYNC-9940',
    masterSku: 'MASTER-1088',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    operation: 'Inventory Update',
    status: 'Success',
    timestamp: '2 mins ago',
    timelineSteps: [
      { title: 'Inventory change detected', timestamp: '2m ago', status: 'info' },
      { title: 'Event SYNC-9940 created', timestamp: '2m ago', status: 'info' },
      { title: 'Shopify API request initiated', timestamp: '2m ago', status: 'info' },
      { title: 'Shopify API response 200 OK', timestamp: '2m ago', status: 'success' },
      { title: 'Synchronization completed successfully', timestamp: '2m ago', status: 'success' },
    ],
  },
  {
    id: 'SYNC-9939',
    masterSku: 'MASTER-1121',
    store: 'Demo Store',
    channel: 'Amazon',
    operation: 'Stock Reservation',
    status: 'Retrying',
    timestamp: '18 mins ago',
    reason: 'Rate limit exceeded',
    retryCount: 1,
    timelineSteps: [
      { title: 'Stock reservation requested', timestamp: '18m ago', status: 'info' },
      { title: 'Amazon SP-API returned HTTP 429 Rate Limit', timestamp: '18m ago', status: 'warning' },
      { title: 'Backoff timer scheduled (120s)', timestamp: '18m ago', status: 'info' },
      { title: 'Retry #1 initiated', timestamp: '16m ago', status: 'info' },
    ],
  },
  {
    id: 'SYNC-9938',
    masterSku: 'MASTER-1005',
    store: 'Europe Logistics Hub',
    channel: 'eBay',
    operation: 'Inventory Sync',
    status: 'Success',
    timestamp: '35 mins ago',
    timelineSteps: [
      { title: 'Batch sync job started', timestamp: '35m ago', status: 'info' },
      { title: 'eBay Inventory API response 200 OK', timestamp: '35m ago', status: 'success' },
    ],
  },
  {
    id: 'SYNC-9937',
    masterSku: 'MASTER-1090',
    store: 'Main Shopify Store',
    channel: 'Etsy',
    operation: 'SKU Mapping Update',
    status: 'Pending',
    timestamp: '1 hour ago',
    timelineSteps: [
      { title: 'Mapping change queued', timestamp: '1h ago', status: 'info' },
      { title: 'Awaiting channel worker lock', timestamp: '1h ago', status: 'info' },
    ],
  },
];

// 6. MOCK EXCEPTIONS
export const MOCK_EXCEPTIONS: ExceptionItem[] = [
  {
    id: 'EXC-2041',
    masterSku: 'MASTER-1042',
    productName: 'Classic Black Hoodie',
    store: 'Main Shopify Store',
    channel: 'Shopify',
    severity: 'High',
    reason: 'Channel API timeout',
    status: 'Failed',
    retryCount: 2,
    createdAt: '12 mins ago',
    whatHappened: 'Inventory update failed while syncing MASTER-1042 to Shopify.',
    whyHappened: 'The Shopify channel API timed out during the inventory update request.',
    whatOmniSyncDid: 'The event was automatically retried twice before being moved into the exception workflow.',
    timelineSteps: [
      { title: 'Inventory change detected', timestamp: '12m ago', status: 'info' },
      { title: 'Sync event SYNC-9941 created', timestamp: '12m ago', status: 'info' },
      { title: 'Shopify request initiated', timestamp: '12m ago', status: 'info' },
      { title: 'Request timed out (HTTP 504)', timestamp: '12m ago', status: 'failed' },
      { title: 'Automated Retry #1 initiated', timestamp: '10m ago', status: 'warning' },
      { title: 'Automated Retry #2 initiated', timestamp: '8m ago', status: 'warning' },
      { title: 'Exception EXC-2041 logged', timestamp: '12m ago', status: 'failed' },
    ],
  },
  {
    id: 'EXC-2039',
    masterSku: 'MASTER-1121',
    productName: 'Everyday Cargo Pant',
    store: 'Demo Store',
    channel: 'Amazon',
    severity: 'Medium',
    reason: 'Rate limit exceeded',
    status: 'Retrying',
    retryCount: 1,
    createdAt: '18 mins ago',
    whatHappened: 'Amazon SP-API rejected request due to rate throttling.',
    whyHappened: 'Current request frequency exceeded Amazon seller rate quota.',
    whatOmniSyncDid: 'OmniSync scheduled exponential backoff retries.',
    timelineSteps: [
      { title: 'Inventory sync initiated', timestamp: '18m ago', status: 'info' },
      { title: 'HTTP 429 Rate Limit Exceeded', timestamp: '18m ago', status: 'warning' },
      { title: 'Automated Retry #1 in progress', timestamp: '16m ago', status: 'info' },
    ],
  },
  {
    id: 'EXC-2035',
    masterSku: 'MASTER-1090',
    productName: 'Heavyweight Fleece Crew',
    store: 'Main Shopify Store',
    channel: 'Etsy',
    severity: 'Low',
    reason: 'Invalid SKU mapping',
    status: 'DLQ',
    retryCount: 3,
    createdAt: '1 hour ago',
    whatHappened: 'Etsy listing #40921 failed SKU mapping verification.',
    whyHappened: 'The Etsy listing ID is not mapped to any valid Master SKU.',
    whatOmniSyncDid: 'Automated retry failed 3 times. Moved to Dead-Letter Queue (DLQ).',
    timelineSteps: [
      { title: 'Sync attempt 1 failed', timestamp: '1h ago', status: 'failed' },
      { title: 'Automated Retry #1 failed', timestamp: '55m ago', status: 'failed' },
      { title: 'Automated Retry #2 failed', timestamp: '50m ago', status: 'failed' },
      { title: 'Automated Retry #3 failed', timestamp: '45m ago', status: 'failed' },
      { title: 'Moved to Dead-Letter Queue (DLQ)', timestamp: '40m ago', status: 'failed' },
    ],
  },
  {
    id: 'EXC-2022',
    masterSku: 'MASTER-1005',
    productName: 'Performance Zip Hoodie',
    store: 'Europe Logistics Hub',
    channel: 'eBay',
    severity: 'Low',
    reason: 'Inventory conflict',
    status: 'Resolved',
    retryCount: 1,
    createdAt: '3 hours ago',
    whatHappened: 'Quantity mismatch detected during batch sync.',
    whyHappened: 'Warehouse reported 120 units, eBay recorded 118 units.',
    whatOmniSyncDid: 'Operator manually resolved exception by syncing master quantity.',
    timelineSteps: [
      { title: 'Conflict flagged', timestamp: '3h ago', status: 'warning' },
      { title: 'Exception manually resolved', timestamp: '2h ago', status: 'success' },
    ],
  },
];

// 7. MOCK RECENT EVENTS
export const MOCK_RECENT_EVENTS: EventTimelineItem[] = [
  {
    id: 'EVT-501',
    type: 'sync_failed',
    title: 'Synchronization Failed',
    description: 'Stock push for MASTER-1042 failed on Shopify due to API timeout.',
    time: '12 mins ago',
    masterSku: 'MASTER-1042',
  },
  {
    id: 'EVT-502',
    type: 'exception_created',
    title: 'Exception Created',
    description: 'High-severity exception EXC-2041 logged for MASTER-1042.',
    time: '12 mins ago',
    masterSku: 'MASTER-1042',
  },
  {
    id: 'EVT-503',
    type: 'retry_started',
    title: 'Retry Scheduled',
    description: 'Automated retry started for MASTER-1121 on Amazon channel.',
    time: '18 mins ago',
    masterSku: 'MASTER-1121',
  },
  {
    id: 'EVT-504',
    type: 'sync_complete',
    title: 'Synchronization Completed',
    description: '48 units synced successfully for MASTER-1088.',
    time: '2 mins ago',
    masterSku: 'MASTER-1088',
  },
  {
    id: 'EVT-505',
    type: 'update',
    title: 'Inventory Update Detected',
    description: 'Webhooks received update from Main Shopify Store.',
    time: '2 mins ago',
  },
];
