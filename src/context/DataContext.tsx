import React, { createContext, useContext, useState } from 'react';
import { 
  MOCK_INVENTORY, 
  MOCK_STORES, 
  MOCK_CHANNELS, 
  MOCK_SKU_MAPPINGS, 
  MOCK_SYNC_ACTIVITIES, 
  MOCK_EXCEPTIONS, 
  MOCK_RECENT_EVENTS,
  type InventoryItem,
  type StoreItem,
  type ChannelItem,
  type SkuMappingItem,
  type SyncActivityItem,
  type ExceptionItem,
  type EventTimelineItem,
  type SyncTimelineStep
} from '../data/mockData';

export interface TenantSettings {
  organization: string;
  workspace: string;
  environment: 'Production' | 'Staging' | 'Development';
  lowStockThreshold: number;
  inventoryBehavior: string;
  retryAttempts: number;
  retryInterval: string;
  exceptionAlerts: boolean;
  syncFailureAlerts: boolean;
  timezone: string;
  dateFormat: string;
}

const DEFAULT_SETTINGS: TenantSettings = {
  organization: 'OmniCorp Logistics',
  workspace: 'Default Workspace',
  environment: 'Production',
  lowStockThreshold: 10,
  inventoryBehavior: 'Safety Stock Buffer (5%)',
  retryAttempts: 3,
  retryInterval: '5 minutes (Standard)',
  exceptionAlerts: true,
  syncFailureAlerts: true,
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
};

interface DataContextType {
  inventory: InventoryItem[];
  stores: StoreItem[];
  channels: ChannelItem[];
  skuMappings: SkuMappingItem[];
  syncActivities: SyncActivityItem[];
  exceptions: ExceptionItem[];
  recentEvents: EventTimelineItem[];
  settings: TenantSettings;
  retryingExceptionIds: Set<string>;
  
  // Operational Actions
  retryException: (exceptionId: string, onComplete?: () => void) => void;
  resolveException: (exceptionId: string) => void;
  resolveSkuConflict: (mappingId: string) => void;
  triggerManualSync: (masterSku: string) => void;
  updateSettings: (newSettings: TenantSettings) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => JSON.parse(JSON.stringify(MOCK_INVENTORY)));
  const [stores, setStores] = useState<StoreItem[]>(() => JSON.parse(JSON.stringify(MOCK_STORES)));
  const [channels, setChannels] = useState<ChannelItem[]>(() => JSON.parse(JSON.stringify(MOCK_CHANNELS)));
  const [skuMappings, setSkuMappings] = useState<SkuMappingItem[]>(() => JSON.parse(JSON.stringify(MOCK_SKU_MAPPINGS)));
  const [syncActivities, setSyncActivities] = useState<SyncActivityItem[]>(() => JSON.parse(JSON.stringify(MOCK_SYNC_ACTIVITIES)));
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(() => JSON.parse(JSON.stringify(MOCK_EXCEPTIONS)));
  const [recentEvents, setRecentEvents] = useState<EventTimelineItem[]>(() => JSON.parse(JSON.stringify(MOCK_RECENT_EVENTS)));
  const [settings, setSettings] = useState<TenantSettings>(() => JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));

  const [retryingExceptionIds, setRetryingExceptionIds] = useState<Set<string>>(new Set());

  // Action 1: Retry Exception
  const retryException = (exceptionId: string, onComplete?: () => void) => {
    // Guard against race conditions & duplicate calls
    if (retryingExceptionIds.has(exceptionId)) return;

    const targetException = exceptions.find(e => e.id === exceptionId);
    if (!targetException || targetException.status === 'Resolved') return;

    // Mark in-flight
    setRetryingExceptionIds(prev => new Set(prev).add(exceptionId));

    // Phase 1: Update exception & sync activity to Retrying
    setExceptions(prev => prev.map(item => {
      if (item.id === exceptionId) {
        return {
          ...item,
          status: 'Retrying',
          timelineSteps: [
            ...item.timelineSteps,
            { title: 'Manual retry initiated by operator', timestamp: 'Just now', status: 'info' as const }
          ]
        };
      }
      return item;
    }));

    setSyncActivities(prev => prev.map(item => {
      if (item.masterSku === targetException.masterSku && item.status === 'Failed') {
        return {
          ...item,
          status: 'Retrying',
          reason: undefined,
          timelineSteps: [
            ...item.timelineSteps,
            { title: 'Manual retry initiated by operator', timestamp: 'Just now', status: 'info' as const }
          ]
        };
      }
      return item;
    }));

    // Phase 2: Complete retry after 1.2 seconds
    setTimeout(() => {
      setExceptions(prev => prev.map(item => {
        if (item.id === exceptionId) {
          const updatedSteps: SyncTimelineStep[] = [
            ...item.timelineSteps,
            { title: 'Channel API request returned 200 OK', timestamp: 'Just now', status: 'success' },
            { title: 'Inventory synchronized successfully', timestamp: 'Just now', status: 'success' }
          ];
          return {
            ...item,
            status: 'Resolved',
            retryCount: item.retryCount + 1,
            timelineSteps: updatedSteps
          };
        }
        return item;
      }));

      setSyncActivities(prev => prev.map(item => {
        if (item.masterSku === targetException.masterSku) {
          return {
            ...item,
            status: 'Success',
            timelineSteps: [
              ...item.timelineSteps,
              { title: 'Channel API request returned 200 OK', timestamp: 'Just now', status: 'success' },
              { title: 'Synchronization completed successfully', timestamp: 'Just now', status: 'success' }
            ]
          };
        }
        return item;
      }));

      // Prepend event log
      setRecentEvents(prev => [
        {
          id: `EVT-${Date.now().toString().slice(-4)}`,
          type: 'sync_complete',
          title: 'Synchronization Completed',
          description: `Manual retry succeeded for ${targetException.masterSku} on ${targetException.channel}.`,
          time: 'Just now',
          masterSku: targetException.masterSku,
        },
        ...prev
      ]);

      // Clear in-flight
      setRetryingExceptionIds(prev => {
        const next = new Set(prev);
        next.delete(exceptionId);
        return next;
      });

      if (onComplete) onComplete();
    }, 1200);
  };

  // Action 2: Resolve Exception
  const resolveException = (exceptionId: string) => {
    const targetException = exceptions.find(e => e.id === exceptionId);
    if (!targetException || targetException.status === 'Resolved') return;

    setExceptions(prev => prev.map(item => {
      if (item.id === exceptionId) {
        return {
          ...item,
          status: 'Resolved',
          timelineSteps: [
            ...item.timelineSteps,
            { title: 'Exception manually resolved by operator', timestamp: 'Just now', status: 'success' as const }
          ]
        };
      }
      return item;
    }));

    setSyncActivities(prev => prev.map(item => {
      if (item.masterSku === targetException.masterSku && item.status !== 'Success') {
        return {
          ...item,
          status: 'Success',
          timelineSteps: [
            ...item.timelineSteps,
            { title: 'Exception manually resolved by operator', timestamp: 'Just now', status: 'success' as const }
          ]
        };
      }
      return item;
    }));

    setRecentEvents(prev => [
      {
        id: `EVT-${Date.now().toString().slice(-4)}`,
        type: 'update',
        title: 'Exception Resolved',
        description: `Operator manually resolved exception ${exceptionId} for ${targetException.masterSku}.`,
        time: 'Just now',
        masterSku: targetException.masterSku,
      },
      ...prev
    ]);
  };

  // Action 3: Resolve SKU Mapping Conflict
  const resolveSkuConflict = (mappingId: string) => {
    const targetMapping = skuMappings.find(m => m.id === mappingId);
    if (!targetMapping || targetMapping.mappingState === 'Mapped') return;

    setSkuMappings(prev => prev.map(item => {
      if (item.id === mappingId) {
        return {
          ...item,
          mappingState: 'Mapped' as const,
          channelSku: 'AMZ-WHT-TEE-PRIMARY',
          lastUpdated: 'Just now',
          conflictDetail: undefined
        };
      }
      return item;
    }));

    setRecentEvents(prev => [
      {
        id: `EVT-${Date.now().toString().slice(-4)}`,
        type: 'update',
        title: 'SKU Mapping Conflict Resolved',
        description: `Conflict resolved for ${targetMapping.masterSku}. Mapped to AMZ-WHT-TEE-PRIMARY.`,
        time: 'Just now',
        masterSku: targetMapping.masterSku,
      },
      ...prev
    ]);
  };

  // Action 4: Trigger Manual Sync
  const triggerManualSync = (masterSku: string) => {
    setInventory(prev => prev.map(item => {
      if (item.masterSku === masterSku) {
        return {
          ...item,
          lastUpdate: 'Just now'
        };
      }
      return item;
    }));

    const newSyncId = `SYNC-${Math.floor(1000 + Math.random() * 9000)}`;

    setSyncActivities(prev => [
      {
        id: newSyncId,
        masterSku,
        store: 'Main Shopify Store',
        channel: 'Shopify',
        operation: 'Inventory Sync',
        status: 'Success',
        timestamp: 'Just now',
        timelineSteps: [
          { title: 'Manual sync triggered by operator', timestamp: 'Just now', status: 'info' },
          { title: 'Channel payload validated', timestamp: 'Just now', status: 'success' },
          { title: 'Inventory updated successfully', timestamp: 'Just now', status: 'success' }
        ]
      },
      ...prev
    ]);

    setRecentEvents(prev => [
      {
        id: `EVT-${Date.now().toString().slice(-4)}`,
        type: 'sync_complete',
        title: 'Manual Sync Triggered',
        description: `Manual inventory synchronization executed for ${masterSku}.`,
        time: 'Just now',
        masterSku,
      },
      ...prev
    ]);
  };

  // Action 5: Update Settings
  const updateSettings = (newSettings: TenantSettings) => {
    setSettings(newSettings);
  };

  // Action 6: Reset Demo Data (Deterministic Deep Clone)
  const resetDemoData = () => {
    setInventory(JSON.parse(JSON.stringify(MOCK_INVENTORY)));
    setStores(JSON.parse(JSON.stringify(MOCK_STORES)));
    setChannels(JSON.parse(JSON.stringify(MOCK_CHANNELS)));
    setSkuMappings(JSON.parse(JSON.stringify(MOCK_SKU_MAPPINGS)));
    setSyncActivities(JSON.parse(JSON.stringify(MOCK_SYNC_ACTIVITIES)));
    setExceptions(JSON.parse(JSON.stringify(MOCK_EXCEPTIONS)));
    setRecentEvents(JSON.parse(JSON.stringify(MOCK_RECENT_EVENTS)));
    setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)));
    setRetryingExceptionIds(new Set());
  };

  return (
    <DataContext.Provider
      value={{
        inventory,
        stores,
        channels,
        skuMappings,
        syncActivities,
        exceptions,
        recentEvents,
        settings,
        retryingExceptionIds,
        retryException,
        resolveException,
        resolveSkuConflict,
        triggerManualSync,
        updateSettings,
        resetDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
