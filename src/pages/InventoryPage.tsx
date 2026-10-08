import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, CheckCircle2 } from 'lucide-react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { useData } from '../context/DataContext';

export const InventoryPage: React.FC = () => {
  const { inventory, syncActivities, triggerManualSync } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [storeFilter, setStoreFilter] = useState<string>('All');
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'available_desc' | 'available_asc' | 'reserved_desc' | 'sku'>('available_desc');

  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const selectedItem = inventory.find(i => i.masterSku === selectedSku) || null;

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      // Search
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !searchLower ||
        item.masterSku.toLowerCase().includes(searchLower) ||
        item.productName.toLowerCase().includes(searchLower) ||
        item.channelSku.toLowerCase().includes(searchLower);

      // Status
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      // Store
      const matchesStore = storeFilter === 'All' || item.store === storeFilter;

      // Channel
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;

      return matchesSearch && matchesStatus && matchesStore && matchesChannel;
    }).sort((a, b) => {
      if (sortBy === 'available_desc') return b.available - a.available;
      if (sortBy === 'available_asc') return a.available - b.available;
      if (sortBy === 'reserved_desc') return b.reserved - a.reserved;
      if (sortBy === 'sku') return a.masterSku.localeCompare(b.masterSku);
      return 0;
    });
  }, [inventory, searchTerm, statusFilter, storeFilter, channelFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setStoreFilter('All');
    setChannelFilter('All');
    setSortBy('available_desc');
  };

  const isFiltered = searchTerm !== '' || statusFilter !== 'All' || storeFilter !== 'All' || channelFilter !== 'All';

  // Find sync activity related to selected item
  const relatedSyncs = useMemo(() => {
    if (!selectedItem) return [];
    return syncActivities.filter((s) => s.masterSku === selectedItem.masterSku);
  }, [syncActivities, selectedItem]);

  const handleTriggerManualSync = () => {
    if (!selectedItem || isSyncing) return;
    setIsSyncing(true);
    triggerManualSync(selectedItem.masterSku);
    setSyncFeedback(`Manual sync triggered for ${selectedItem.masterSku}. Task queued.`);

    setTimeout(() => {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 3500);
    }, 400);
  };

  return (
    <div className="inventory-page-layout">
      {/* Demo UI State Simulator */}
      <div className="state-controls-bar" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="metadata-text" style={{ fontWeight: 600 }}>DEMO UI STATE SIMULATOR:</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            type="button" 
            className={`btn btn-sm ${viewState === 'normal' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewState('normal')}
          >
            Normal View
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${viewState === 'loading' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewState('loading')}
          >
            Skeleton Loading
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

      {/* Toolbar */}
      <div className="toolbar-bar">
        <div className="toolbar-filters">
          {/* Search */}
          <div className="input-search-wrapper" style={{ maxWidth: '300px' }}>
            <Search size={16} className="input-search-icon" />
            <input 
              type="text" 
              className="input-field input-search"
              placeholder="Search SKU, Product, or Channel SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Store Filter */}
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

          {/* Channel Filter */}
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

          {/* Sort Selector */}
          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="available_desc">Sort: Available (High to Low)</option>
              <option value="available_asc">Sort: Available (Low to High)</option>
              <option value="reserved_desc">Sort: Reserved (High to Low)</option>
              <option value="sku">Sort: MASTER SKU</option>
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

      {/* Main Content Area based on simulated State */}
      {viewState === 'loading' && (
        <TableSkeleton rows={7} cols={8} />
      )}

      {viewState === 'error' && (
        <ErrorState 
          title="Unable to load inventory"
          description="Something went wrong while retrieving inventory data."
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'empty' && (
        <EmptyState 
          title="No inventory found"
          description="The current filters returned no matching inventory records."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      )}

      {viewState === 'normal' && (
        <>
          {filteredItems.length === 0 ? (
            <EmptyState 
              title="No inventory found"
              description="The current search and filters returned no matching inventory items."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            <div className="table-container">
              <table className="omni-table">
                <thead>
                  <tr>
                    <th>MASTER SKU</th>
                    <th>Product</th>
                    <th style={{ textAlign: 'right' }}>Available</th>
                    <th style={{ textAlign: 'right' }}>Reserved</th>
                    <th>Status</th>
                    <th>Store</th>
                    <th>Channel</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.masterSku} 
                      className="clickable"
                      onClick={() => {
                        setSelectedSku(item.masterSku);
                        setSyncFeedback(null);
                      }}
                    >
                      <td><code className="sku-code">{item.masterSku}</code></td>
                      <td style={{ fontWeight: 500 }}>{item.productName}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.available}</td>
                      <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{item.reserved}</td>
                      <td><StatusBadge status={item.status as StatusType} /></td>
                      <td>{item.store}</td>
                      <td>{item.channel}</td>
                      <td className="metadata-text">{item.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Inventory Item Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedSku(null)}
        title={selectedItem?.productName || ''}
        subtitle={selectedItem ? `MASTER SKU: ${selectedItem.masterSku}` : ''}
        footer={
          <>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setSelectedSku(null)}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleTriggerManualSync}
              disabled={isSyncing}
            >
              {isSyncing ? 'Queuing...' : 'Trigger Manual Sync'}
            </button>
          </>
        }
      >
        {selectedItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {syncFeedback && (
              <div style={{ padding: '10px 14px', backgroundColor: '#F0F9EB', border: '1px solid #C8ECAE', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', color: '#27620E', fontSize: '13px', fontWeight: 500 }}>
                <CheckCircle2 size={16} />
                {syncFeedback}
              </div>
            )}

            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="metadata-text">AVAILABLE UNITS</span>
                  <p className="metric-value" style={{ fontSize: '24px', marginTop: '2px' }}>{selectedItem.available}</p>
                </div>
                <div>
                  <span className="metadata-text">RESERVED UNITS</span>
                  <p className="metric-value" style={{ fontSize: '24px', marginTop: '2px', color: 'var(--text-secondary)' }}>{selectedItem.reserved}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="metadata-text">STATUS</span>
                <div style={{ marginTop: '4px' }}><StatusBadge status={selectedItem.status as StatusType} /></div>
              </div>
              <div>
                <span className="metadata-text">CHANNEL SKU</span>
                <p className="body-text" style={{ marginTop: '4px', fontWeight: 500 }}><code className="sku-code">{selectedItem.channelSku}</code></p>
              </div>
              <div>
                <span className="metadata-text">STORE</span>
                <p className="body-text" style={{ marginTop: '4px' }}>{selectedItem.store}</p>
              </div>
              <div>
                <span className="metadata-text">CHANNEL</span>
                <p className="body-text" style={{ marginTop: '4px' }}>{selectedItem.channel}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span className="metadata-text">LAST UPDATED</span>
              <p className="body-text" style={{ marginTop: '4px' }}>{selectedItem.lastUpdate}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 className="card-heading" style={{ marginBottom: '12px' }}>Recent Related Sync Activity</h4>
              {relatedSyncs.length === 0 ? (
                <p className="metadata-text">No recent sync issues logged for this item.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {relatedSyncs.map((sync) => (
                    <div 
                      key={sync.id}
                      className="related-sync-box"
                    >
                      <div>
                        <p className="table-text" style={{ fontWeight: 500 }}>{sync.operation}</p>
                        <p className="metadata-text">{sync.channel} • {sync.timestamp}</p>
                      </div>
                      <StatusBadge status={sync.status as StatusType} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .related-sync-box {
          padding: 10px;
          background-color: var(--bg-app);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};
