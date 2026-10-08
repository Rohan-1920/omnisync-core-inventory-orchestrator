import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { type SkuMappingItem } from '../data/mockData';
import { useData } from '../context/DataContext';

export const SkuMappingPage: React.FC = () => {
  const { skuMappings, syncActivities, resolveSkuConflict } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [selectedMappingId, setSelectedMappingId] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [storeFilter, setStoreFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'masterSku' | 'productName' | 'mappingState'>('masterSku');

  // Resolution Feedback State
  const [resolutionSuccessMsg, setResolutionSuccessMsg] = useState<string | null>(null);

  const selectedMapping = skuMappings.find(m => m.id === selectedMappingId) || null;

  const filteredMappings = useMemo(() => {
    return skuMappings.filter((item) => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !searchLower ||
        item.masterSku.toLowerCase().includes(searchLower) ||
        item.productName.toLowerCase().includes(searchLower) ||
        item.channelSku.toLowerCase().includes(searchLower);

      const matchesState = stateFilter === 'All' || item.mappingState === stateFilter;
      const matchesStore = storeFilter === 'All' || item.store === storeFilter;
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;

      return matchesSearch && matchesState && matchesStore && matchesChannel;
    }).sort((a, b) => {
      if (sortBy === 'productName') return a.productName.localeCompare(b.productName);
      if (sortBy === 'mappingState') return a.mappingState.localeCompare(b.mappingState);
      return a.masterSku.localeCompare(b.masterSku);
    });
  }, [skuMappings, searchTerm, stateFilter, storeFilter, channelFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setStateFilter('All');
    setStoreFilter('All');
    setChannelFilter('All');
    setSortBy('masterSku');
  };

  const isFiltered = searchTerm !== '' || stateFilter !== 'All' || storeFilter !== 'All' || channelFilter !== 'All';

  // Conflict resolution handler
  const handleResolveConflict = (mappingId: string) => {
    const sku = selectedMapping?.masterSku;
    resolveSkuConflict(mappingId);

    setResolutionSuccessMsg(`Conflict successfully resolved for ${sku || 'SKU'}. SKU mapping updated to Mapped.`);
    setTimeout(() => {
      setResolutionSuccessMsg(null);
    }, 4000);
  };

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
          title="Unable to load SKU mappings"
          description="Failed to fetch mapping database rules from orchestrator node."
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
          title="No SKU mappings found"
          description="No SKU cross-reference rules have been registered in this workspace."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <StateControls viewState={viewState} setViewState={setViewState} />

      {resolutionSuccessMsg && (
        <div style={{ padding: '10px 16px', backgroundColor: '#F0F9EB', border: '1px solid #C8ECAE', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', color: '#27620E', fontSize: '13px', fontWeight: 500 }}>
          <CheckCircle2 size={16} />
          {resolutionSuccessMsg}
        </div>
      )}

      {/* Toolbar */}
      <div className="toolbar-bar">
        <div className="toolbar-filters">
          <div className="input-search-wrapper" style={{ maxWidth: '280px' }}>
            <Search size={16} className="input-search-icon" />
            <input 
              type="text" 
              className="input-field input-search"
              placeholder="Search Master SKU, Product, Channel SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select-wrapper">
            <select 
              className="select-field"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="All">All Mapping States</option>
              <option value="Mapped">Mapped</option>
              <option value="Unmapped">Unmapped</option>
              <option value="Conflict">Conflict</option>
              <option value="Pending Review">Pending Review</option>
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="masterSku">Sort: MASTER SKU</option>
              <option value="productName">Sort: Product Name</option>
              <option value="mappingState">Sort: Mapping State</option>
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

      {filteredMappings.length === 0 ? (
        <EmptyState 
          title="No SKU mappings found"
          description="The active search and filters returned no matching SKU mapping records."
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
                <th>Channel SKU</th>
                <th>Store</th>
                <th>Channel</th>
                <th>Mapping State</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredMappings.map((item) => (
                <tr 
                  key={item.id} 
                  className={`clickable ${item.mappingState === 'Conflict' ? 'row-conflict' : ''}`}
                  onClick={() => setSelectedMappingId(item.id)}
                >
                  <td><code className="sku-code">{item.masterSku}</code></td>
                  <td style={{ fontWeight: 500 }}>{item.productName}</td>
                  <td><code className="sku-code">{item.channelSku}</code></td>
                  <td>{item.store}</td>
                  <td>{item.channel}</td>
                  <td>
                    <MappingStateBadge state={item.mappingState} />
                  </td>
                  <td className="metadata-text">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mapping Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedMapping)}
        onClose={() => setSelectedMappingId(null)}
        title={selectedMapping ? `SKU Mapping: ${selectedMapping.masterSku}` : ''}
        subtitle={selectedMapping?.productName || ''}
        footer={
          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setSelectedMappingId(null)}
            >
              Close
            </button>
            {selectedMapping && selectedMapping.mappingState === 'Conflict' && (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleResolveConflict(selectedMapping.id)}
              >
                Resolve Conflict
              </button>
            )}
          </div>
        }
      >
        {selectedMapping && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Conflict Detection Alert Section */}
            {selectedMapping.mappingState === 'Conflict' && selectedMapping.conflictDetail && (
              <div style={{ padding: '14px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', color: '#B91C1C' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <AlertTriangle size={16} />
                  <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Conflict detected</h4>
                </div>
                <p style={{ fontSize: '13px', marginBottom: '10px', lineHeight: 1.4 }}>
                  {selectedMapping.conflictDetail.explanation}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', backgroundColor: 'white', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #FECACA' }}>
                  <div>
                    <span className="metadata-text" style={{ color: '#B91C1C' }}>MASTER SKU</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0 0' }}>{selectedMapping.masterSku}</p>
                  </div>
                  <div>
                    <span className="metadata-text" style={{ color: '#B91C1C' }}>CURRENT MAPPED SKU</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0 0' }}>{selectedMapping.channelSku}</p>
                  </div>
                  <div>
                    <span className="metadata-text" style={{ color: '#B91C1C' }}>CONFLICTING SKU VALUE</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0 0' }}>{selectedMapping.conflictDetail.conflictingChannelSku}</p>
                  </div>
                  <div>
                    <span className="metadata-text" style={{ color: '#B91C1C' }}>AFFECTED STORE / CHANNEL</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0 0' }}>{selectedMapping.store} ({selectedMapping.channel})</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mapping Properties Grid */}
            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="metadata-text">MASTER SKU</span>
                  <p className="body-text" style={{ marginTop: '2px', fontWeight: 600 }}>
                    <code className="sku-code">{selectedMapping.masterSku}</code>
                  </p>
                </div>
                <div>
                  <span className="metadata-text">MAPPING STATE</span>
                  <div style={{ marginTop: '4px' }}>
                    <MappingStateBadge state={selectedMapping.mappingState} />
                  </div>
                </div>
                <div>
                  <span className="metadata-text">CHANNEL SKU</span>
                  <p className="body-text" style={{ marginTop: '2px', fontWeight: 600 }}>
                    <code className="sku-code">{selectedMapping.channelSku}</code>
                  </p>
                </div>
                <div>
                  <span className="metadata-text">STORE</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedMapping.store}</p>
                </div>
                <div>
                  <span className="metadata-text">CHANNEL</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedMapping.channel}</p>
                </div>
                <div>
                  <span className="metadata-text">LAST UPDATED</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedMapping.lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Related Synchronization Information */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 className="card-heading" style={{ marginBottom: '10px' }}>Related Synchronization Info</h4>
              {syncActivities.filter(s => s.masterSku === selectedMapping.masterSku).length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {syncActivities.filter(s => s.masterSku === selectedMapping.masterSku).map(sync => (
                    <div key={sync.id} style={{ padding: '10px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 500, margin: 0 }}>{sync.operation}</p>
                        <p className="metadata-text" style={{ margin: 0 }}>{sync.channel} • {sync.timestamp}</p>
                      </div>
                      <StatusBadge status={sync.status as StatusType} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="metadata-text">No active synchronization errors associated with this SKU mapping.</p>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .row-conflict {
          background-color: #FFFDFD;
        }
      `}</style>
    </div>
  );
};

const MappingStateBadge: React.FC<{ state: SkuMappingItem['mappingState'] }> = ({ state }) => {
  if (state === 'Mapped') {
    return <StatusBadge status="Healthy" showDot />;
  }
  if (state === 'Conflict') {
    return <StatusBadge status="Failed" showDot />;
  }
  if (state === 'Pending Review') {
    return <StatusBadge status="Pending" showDot />;
  }
  return (
    <span className="badge badge-pending">
      <span className="badge-dot" />
      Unmapped
    </span>
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
