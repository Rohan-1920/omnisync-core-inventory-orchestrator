import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { useData } from '../context/DataContext';

export const SyncActivityPage: React.FC = () => {
  const { syncActivities } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [selectedSyncId, setSelectedSyncId] = useState<string | null>(null);
  const [showRawPayload, setShowRawPayload] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [storeFilter, setStoreFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [operationFilter, setOperationFilter] = useState('All');

  const selectedSync = syncActivities.find(s => s.id === selectedSyncId) || null;

  const filteredEvents = useMemo(() => {
    return syncActivities.filter((item) => {
      // Search
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !searchLower ||
        item.id.toLowerCase().includes(searchLower) ||
        item.masterSku.toLowerCase().includes(searchLower) ||
        item.store.toLowerCase().includes(searchLower) ||
        item.channel.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesStore = storeFilter === 'All' || item.store === storeFilter;
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;
      const matchesOperation = operationFilter === 'All' || item.operation === operationFilter;

      return matchesSearch && matchesStatus && matchesStore && matchesChannel && matchesOperation;
    });
  }, [syncActivities, searchTerm, statusFilter, storeFilter, channelFilter, operationFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setStoreFilter('All');
    setChannelFilter('All');
    setOperationFilter('All');
  };

  const isFiltered = searchTerm !== '' || statusFilter !== 'All' || storeFilter !== 'All' || channelFilter !== 'All' || operationFilter !== 'All';

  if (viewState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <TableSkeleton rows={6} cols={7} />
      </div>
    );
  }

  if (viewState === 'error') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <ErrorState 
          title="Unable to load sync activity"
          description="Failed to retrieve execution event log stream from orchestrator node."
          onRetry={() => setViewState('normal')}
        />
      </div>
    );
  }

  if (viewState === 'empty') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <EmptyState 
          title="No synchronization events"
          description="Synchronization activity will appear here as inventory events are processed."
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <StateControls viewState={viewState} setViewState={setViewState} />

      {/* Toolbar Filters */}
      <div className="toolbar-bar">
        <div className="toolbar-filters">
          <div className="input-search-wrapper" style={{ maxWidth: '280px' }}>
            <Search size={16} className="input-search-icon" />
            <input 
              type="text" 
              className="input-field input-search"
              placeholder="Search Event ID, SKU, Store..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Retrying">Retrying</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
            >
              <option value="All">All Stores</option>
              <option value="Main Shopify Store">Main Shopify Store</option>
              <option value="Demo Store">Demo Store</option>
              <option value="Europe Logistics Hub">Europe Logistics Hub</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
            >
              <option value="All">All Channels</option>
              <option value="Shopify">Shopify</option>
              <option value="Amazon">Amazon</option>
              <option value="Etsy">Etsy</option>
              <option value="eBay">eBay</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={operationFilter}
              onChange={(e) => setOperationFilter(e.target.value)}
            >
              <option value="All">All Operations</option>
              <option value="Inventory Update">Inventory Update</option>
              <option value="Stock Reservation">Stock Reservation</option>
              <option value="Inventory Sync">Inventory Sync</option>
              <option value="SKU Mapping Update">SKU Mapping Update</option>
            </select>
          </div>

          {isFiltered && (
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={clearFilters}
            >
              <RotateCcw size={13} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <EmptyState 
          title="No synchronization events found"
          description="The active search and filters returned no matching sync activity logs."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="table-container">
          <table className="omni-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>MASTER SKU</th>
                <th>Store</th>
                <th>Channel</th>
                <th>Operation</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((item) => (
                <tr 
                  key={item.id} 
                  className="clickable"
                  onClick={() => {
                    setSelectedSyncId(item.id);
                    setShowRawPayload(false);
                  }}
                >
                  <td><code className="sku-code">{item.id}</code></td>
                  <td><code className="sku-code">{item.masterSku}</code></td>
                  <td>{item.store}</td>
                  <td>{item.channel}</td>
                  <td style={{ fontWeight: 500 }}>{item.operation}</td>
                  <td><StatusBadge status={item.status as StatusType} /></td>
                  <td className="metadata-text">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Event Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedSync)}
        onClose={() => setSelectedSyncId(null)}
        title={selectedSync ? `Sync Event Details: ${selectedSync.id}` : ''}
        subtitle="Operational History & Observability Inspection"
        footer={
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setSelectedSyncId(null)}
          >
            Close Panel
          </button>
        }
      >
        {selectedSync && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Primary Event Overview Grid */}
            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="metadata-text">EVENT ID</span>
                  <p className="body-text" style={{ marginTop: '2px', fontWeight: 600 }}>
                    <code className="sku-code">{selectedSync.id}</code>
                  </p>
                </div>
                <div>
                  <span className="metadata-text">STATUS</span>
                  <div style={{ marginTop: '2px' }}>
                    <StatusBadge status={selectedSync.status as StatusType} />
                  </div>
                </div>
                <div>
                  <span className="metadata-text">MASTER SKU</span>
                  <p className="body-text" style={{ marginTop: '2px', fontWeight: 600 }}>
                    <code className="sku-code">{selectedSync.masterSku}</code>
                  </p>
                </div>
                <div>
                  <span className="metadata-text">OPERATION</span>
                  <p className="body-text" style={{ marginTop: '2px', fontWeight: 500 }}>{selectedSync.operation}</p>
                </div>
                <div>
                  <span className="metadata-text">STORE</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedSync.store}</p>
                </div>
                <div>
                  <span className="metadata-text">CHANNEL</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedSync.channel}</p>
                </div>
              </div>
            </div>

            {selectedSync.reason && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#B91C1C' }}>
                <span className="metadata-text" style={{ color: '#B91C1C', fontWeight: 600 }}>FAILURE REASON</span>
                <p style={{ fontSize: '13px', marginTop: '2px', fontWeight: 500 }}>{selectedSync.reason}</p>
                {selectedSync.retryCount && (
                  <p className="metadata-text" style={{ color: '#B91C1C', marginTop: '2px' }}>Automated retry count: {selectedSync.retryCount}</p>
                )}
              </div>
            )}

            {/* Event Timeline Visualizer */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 className="card-heading" style={{ marginBottom: '14px' }}>Event Execution Timeline</h4>
              <div className="vertical-timeline">
                {selectedSync.timelineSteps.map((step, idx) => (
                  <div key={idx} className="vertical-timeline-step">
                    <div className={`timeline-dot step-${step.status}`} />
                    <div className="timeline-step-content">
                      <p className="body-text" style={{ fontSize: '13px', fontWeight: 500 }}>{step.title}</p>
                      <span className="metadata-text">{step.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collapsible Technical Detail / JSON Payload */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowRawPayload(!showRawPayload)}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Secondary Technical Detail / Raw Payload</span>
                {showRawPayload ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {showRawPayload && (
                <pre 
                  style={{
                    backgroundColor: '#1E1E1E',
                    color: '#D4D4D4',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    marginTop: '10px',
                    overflowX: 'auto',
                    fontFamily: 'monospace'
                  }}
                >
{JSON.stringify({
  event_id: selectedSync.id,
  master_sku: selectedSync.masterSku,
  store: selectedSync.store,
  channel: selectedSync.channel,
  operation: selectedSync.operation,
  status: selectedSync.status,
  reason: selectedSync.reason || null,
  retry_count: selectedSync.retryCount || 0,
  timestamp: selectedSync.timestamp,
  payload_metadata: {
    origin_webhook: 'webhooks/inventory/update',
    schema_version: '2024.1',
    execution_latency_ms: selectedSync.status === 'Failed' ? 5004 : 142
  }
}, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .vertical-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          padding-left: 20px;
        }

        .vertical-timeline::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 6px;
          bottom: 6px;
          width: 2px;
          background-color: var(--border-color);
        }

        .vertical-timeline-step {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .timeline-dot {
          position: absolute;
          left: -20px;
          top: 3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .timeline-dot.step-info { background-color: var(--text-secondary); }
        .timeline-dot.step-success { background-color: var(--accent-green); }
        .timeline-dot.step-failed { background-color: #EF4444; }
        .timeline-dot.step-warning { background-color: #F59E0B; }

        .timeline-step-content {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

const StateControls: React.FC<{
  viewState: 'normal' | 'loading' | 'empty' | 'error';
  setViewState: (s: 'normal' | 'loading' | 'empty' | 'error') => void;
}> = ({ viewState, setViewState }) => {
  return (
    <div className="state-controls-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="metadata-text" style={{ fontWeight: 600 }}>DEMO UI STATE SIMULATOR:</span>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button 
          type="button" 
          className={`btn btn-sm ${viewState === 'normal' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewState('normal')}
        >
          Normal State
        </button>
        <button 
          type="button" 
          className={`btn btn-sm ${viewState === 'loading' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewState('loading')}
        >
          Loading State
        </button>
        <button 
          type="button" 
          className={`btn btn-sm ${viewState === 'empty' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewState('empty')}
        >
          Empty State
        </button>
        <button 
          type="button" 
          className={`btn btn-sm ${viewState === 'error' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewState('error')}
        >
          Error State
        </button>
      </div>
    </div>
  );
};
