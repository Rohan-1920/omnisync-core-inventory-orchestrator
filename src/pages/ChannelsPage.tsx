import React, { useState } from 'react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { useData } from '../context/DataContext';

export const ChannelsPage: React.FC = () => {
  const { channels } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const selectedChannel = channels.find(c => c.id === selectedChannelId) || null;

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
          title="Unable to load channels"
          description="Failed to communicate with marketplace integration gateway."
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
          title="No channels connected"
          description="No sales channels or marketplace endpoints have been linked."
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
              <th>Channel</th>
              <th>Platform Integration</th>
              <th>Connection State</th>
              <th>Synchronization State</th>
              <th>Last Successful Sync</th>
              <th>Associated Stores</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((chn) => (
              <tr 
                key={chn.id} 
                className="clickable"
                onClick={() => setSelectedChannelId(chn.id)}
              >
                <td style={{ fontWeight: 600 }}>{chn.name}</td>
                <td className="metadata-text">{chn.platform}</td>
                <td>
                  <span className={`badge ${chn.connectionState === 'Connected' ? 'badge-healthy' : chn.connectionState === 'Disconnected' ? 'badge-failed' : 'badge-pending'}`}>
                    <span className="badge-dot" />
                    {chn.connectionState}
                  </span>
                </td>
                <td>
                  <StatusBadge status={chn.syncState as StatusType} />
                </td>
                <td className="metadata-text">{chn.lastSuccessfulSync}</td>
                <td>
                  {chn.associatedStores.length > 0 ? (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {chn.associatedStores.map((str) => (
                        <span key={str} className="store-tag">
                          {str}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="metadata-text">None</span>
                  )}
                </td>
                <td className="metadata-text" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {chn.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Channel Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedChannel)}
        onClose={() => setSelectedChannelId(null)}
        title={selectedChannel?.name || ''}
        subtitle={selectedChannel ? `Channel ID: ${selectedChannel.id} • ${selectedChannel.platform}` : ''}
        footer={
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setSelectedChannelId(null)}
          >
            Close Panel
          </button>
        }
      >
        {selectedChannel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="metadata-text">CONNECTION STATE</span>
                  <p className="body-text" style={{ marginTop: '4px', fontWeight: 600 }}>{selectedChannel.connectionState}</p>
                </div>
                <div>
                  <span className="metadata-text">SYNC STATE</span>
                  <div style={{ marginTop: '4px' }}><StatusBadge status={selectedChannel.syncState as StatusType} /></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="metadata-text">PLATFORM INTEGRATION</span>
                <p className="body-text" style={{ marginTop: '4px', fontWeight: 500 }}>{selectedChannel.platform}</p>
              </div>
              <div>
                <span className="metadata-text">LAST SUCCESSFUL SYNC</span>
                <p className="body-text" style={{ marginTop: '4px' }}>{selectedChannel.lastSuccessfulSync}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span className="metadata-text">LAST ACTIVITY</span>
              <p className="body-text" style={{ marginTop: '4px' }}>{selectedChannel.lastActivity}</p>
            </div>

            {selectedChannel.errorMsg && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <span className="metadata-text" style={{ color: '#B91C1C' }}>RECENT API ERROR / WARNING</span>
                <div style={{ padding: '8px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#B91C1C', fontSize: '13px', marginTop: '6px' }}>
                  {selectedChannel.errorMsg}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span className="metadata-text">ASSOCIATED STORES</span>
              <p className="metadata-text" style={{ marginBottom: '8px' }}>Store locations actively syncing to this channel:</p>
              {selectedChannel.associatedStores.length > 0 ? (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedChannel.associatedStores.map((str) => (
                    <span key={str} className="store-tag lg">
                      {str}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="metadata-text">No store currently assigned to this channel.</p>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .store-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 6px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        .store-tag.lg {
          font-size: 13px;
          padding: 4px 10px;
          background-color: #FAF9F6;
          border-color: var(--border-color-hover);
          color: var(--text-primary);
          font-weight: 500;
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
