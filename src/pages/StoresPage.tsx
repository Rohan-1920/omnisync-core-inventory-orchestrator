import React, { useState } from 'react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { useData } from '../context/DataContext';

export const StoresPage: React.FC = () => {
  const { stores } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const selectedStore = stores.find(s => s.id === selectedStoreId) || null;

  if (viewState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <TableSkeleton rows={4} cols={7} />
      </div>
    );
  }

  if (viewState === 'error') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <ErrorState 
          title="Unable to load stores"
          description="Something went wrong while retrieving connected store endpoints."
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
          title="No stores connected"
          description="No store connections have been configured for this tenant account."
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <StateControls viewState={viewState} setViewState={setViewState} />

      <div className="table-container">
        <table className="omni-table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Platform</th>
              <th>Health</th>
              <th>Connection</th>
              <th style={{ textAlign: 'right' }}>Mapped Products</th>
              <th>Connected Channels</th>
              <th>Last Sync</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr 
                key={store.id} 
                className="clickable"
                onClick={() => setSelectedStoreId(store.id)}
              >
                <td style={{ fontWeight: 600 }}>{store.name}</td>
                <td>{store.platform}</td>
                <td><StatusBadge status={store.health as StatusType} /></td>
                <td>
                  <span className={`badge ${store.connectionStatus === 'Connected' ? 'badge-healthy' : store.connectionStatus === 'Error' ? 'badge-failed' : 'badge-pending'}`}>
                    <span className="badge-dot" />
                    {store.connectionStatus}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{store.productsCount.toLocaleString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {store.connectedChannels.map((chn) => (
                      <span key={chn} className="channel-tag">
                        {chn}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="metadata-text">{store.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Store Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedStore)}
        onClose={() => setSelectedStoreId(null)}
        title={selectedStore?.name || ''}
        subtitle={selectedStore ? `Store ID: ${selectedStore.id} • ${selectedStore.platform}` : ''}
        footer={
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setSelectedStoreId(null)}
          >
            Close Panel
          </button>
        }
      >
        {selectedStore && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="metadata-text">MAPPED PRODUCTS</span>
                  <p className="metric-value" style={{ fontSize: '24px', marginTop: '2px' }}>{selectedStore.productsCount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="metadata-text">SYNC HEALTH</span>
                  <div style={{ marginTop: '6px' }}><StatusBadge status={selectedStore.health as StatusType} /></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="metadata-text">PLATFORM</span>
                <p className="body-text" style={{ marginTop: '4px', fontWeight: 500 }}>{selectedStore.platform}</p>
              </div>
              <div>
                <span className="metadata-text">CONNECTION STATUS</span>
                <p className="body-text" style={{ marginTop: '4px', fontWeight: 500 }}>{selectedStore.connectionStatus}</p>
              </div>
              <div>
                <span className="metadata-text">LAST SUCCESSFUL SYNC</span>
                <p className="body-text" style={{ marginTop: '4px' }}>{selectedStore.lastSync}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span className="metadata-text">CONNECTED CHANNELS</span>
              <p className="metadata-text" style={{ marginBottom: '8px' }}>Channels linked to this store location:</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedStore.connectedChannels.map((chn) => (
                  <span key={chn} className="channel-tag lg">
                    {chn}
                  </span>
                ))}
              </div>
            </div>

            {selectedStore.recentErrors && selectedStore.recentErrors.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <span className="metadata-text" style={{ color: '#B91C1C' }}>RECENT ERRORS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {selectedStore.recentErrors.map((err, i) => (
                    <div key={i} style={{ padding: '8px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#B91C1C', fontSize: '13px' }}>
                      {err}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 className="card-heading" style={{ marginBottom: '10px' }}>Recent Store Sync Activity</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStore.recentActivity.map((act, i) => (
                  <div key={i} style={{ padding: '8px 12px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--text-primary)' }}>
                    {act}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .channel-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 6px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        .channel-tag.lg {
          font-size: 13px;
          padding: 4px 10px;
          background-color: #F0F9EB;
          border-color: #C8ECAE;
          color: #27620E;
          font-weight: 600;
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
