import React, { useState } from 'react';
import { 
  Package, 
  Store, 
  Share2, 
  RefreshCw, 
  AlertTriangle, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Play
} from 'lucide-react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { useData } from '../context/DataContext';
import { Drawer } from '../components/common/Drawer';
import { type ExceptionItem } from '../data/mockData';

interface OverviewPageProps {
  onNavigate: (path: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const { inventory, stores, channels, syncActivities, exceptions, recentEvents } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [selectedException, setSelectedException] = useState<ExceptionItem | null>(null);

  // Dynamic Metrics
  const totalProducts = inventory.length * 200 + 20; // 1,420
  const openExceptions = exceptions.filter(e => e.status !== 'Resolved');
  const healthyCount = 1280;
  const lowStockCount = 115;
  const outOfStockCount = 25;

  if (viewState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="metric-card">
              <div className="skeleton" style={{ height: '14px', width: '90px' }} />
              <div className="skeleton" style={{ height: '32px', width: '60px', margin: '8px 0' }} />
              <div className="skeleton" style={{ height: '12px', width: '120px' }} />
            </div>
          ))}
        </div>
        <TableSkeleton rows={5} cols={6} />
      </div>
    );
  }

  if (viewState === 'error') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <ErrorState 
          title="Unable to load operational dashboard"
          description="Failed to fetch real-time sync metrics from the core orchestrator."
          onRetry={() => setViewState('normal')}
        />
      </div>
    );
  }

  if (viewState === 'empty') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <EmptyState 
          title="No operational data recorded"
          description="Connect stores and channels to begin tracking inventory synchronization."
          actionLabel="Go to Stores"
          onAction={() => onNavigate('/stores')}
        />
      </div>
    );
  }

  return (
    <div className="overview-page-layout">
      {/* Interactive state controls banner */}
      <StateControls viewState={viewState} setViewState={setViewState} />

      {/* 1. Operational Summary Metrics */}
      <section className="metrics-grid">
        <div className="metric-card clickable" onClick={() => onNavigate('/inventory')}>
          <div className="metric-header">
            <span className="metric-label">Total Products</span>
            <Package size={16} className="metric-icon" />
          </div>
          <span className="metric-value">{totalProducts.toLocaleString()}</span>
          <span className="metric-meta">Across {stores.length} connected stores</span>
        </div>

        <div className="metric-card clickable" onClick={() => onNavigate('/stores')}>
          <div className="metric-header">
            <span className="metric-label">Connected Stores</span>
            <Store size={16} className="metric-icon" />
          </div>
          <span className="metric-value">{stores.length}</span>
          <span className="metric-meta">Shopify, Demo, EU & US Hubs</span>
        </div>

        <div className="metric-card clickable" onClick={() => onNavigate('/channels')}>
          <div className="metric-header">
            <span className="metric-label">Connected Channels</span>
            <Share2 size={16} className="metric-icon" />
          </div>
          <span className="metric-value">{channels.length}</span>
          <span className="metric-meta">Shopify, Amazon, Etsy, eBay, TikTok, AliExpress</span>
        </div>

        <div className="metric-card clickable" onClick={() => onNavigate('/sync-activity')}>
          <div className="metric-header">
            <span className="metric-label">Active Syncs</span>
            <RefreshCw size={16} className="metric-icon" />
          </div>
          <span className="metric-value">18</span>
          <span className="metric-meta">Real-time sync engine active</span>
        </div>

        <div className="metric-card clickable highlight-alert" onClick={() => onNavigate('/exceptions')}>
          <div className="metric-header">
            <span className="metric-label" style={{ color: openExceptions.length > 0 ? '#B91C1C' : 'var(--text-secondary)' }}>Open Exceptions</span>
            <AlertTriangle size={16} style={{ color: openExceptions.length > 0 ? '#B91C1C' : 'var(--text-secondary)' }} />
          </div>
          <span className="metric-value" style={{ color: openExceptions.length > 0 ? '#B91C1C' : 'var(--text-primary)' }}>{openExceptions.length}</span>
          <span className="metric-meta" style={{ color: openExceptions.length > 0 ? '#B91C1C' : 'var(--text-secondary)' }}>
            {openExceptions.length > 0 ? `${openExceptions.filter(e => e.severity === 'High' || e.severity === 'Critical').length} High/Critical` : 'All exceptions resolved'}
          </span>
        </div>
      </section>

      {/* 2. Inventory Health Breakdown */}
      <section className="card inventory-health-card">
        <div className="card-header-flex">
          <div>
            <h2 className="card-heading">Inventory Health</h2>
            <p className="metadata-text">Aggregated SKU stock status across all channels</p>
          </div>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('/inventory')}
          >
            View Inventory <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="health-visual-bar">
          <div className="bar-segment healthy" style={{ width: '90%' }} title="90% Healthy" />
          <div className="bar-segment warning" style={{ width: '8%' }} title="8% Low Stock" />
          <div className="bar-segment failed" style={{ width: '2%' }} title="2% Out of Stock" />
        </div>

        <div className="health-stats-row">
          <div className="health-stat-item" onClick={() => onNavigate('/inventory')}>
            <span className="stat-dot healthy" />
            <div>
              <span className="table-text" style={{ fontWeight: 600 }}>{healthyCount.toLocaleString()}</span>
              <span className="metadata-text" style={{ marginLeft: '6px' }}>Healthy (90%)</span>
            </div>
          </div>
          <div className="health-stat-item" onClick={() => onNavigate('/inventory')}>
            <span className="stat-dot warning" />
            <div>
              <span className="table-text" style={{ fontWeight: 600 }}>{lowStockCount}</span>
              <span className="metadata-text" style={{ marginLeft: '6px' }}>Low Stock (8%)</span>
            </div>
          </div>
          <div className="health-stat-item" onClick={() => onNavigate('/inventory')}>
            <span className="stat-dot failed" />
            <div>
              <span className="table-text" style={{ fontWeight: 600 }}>{outOfStockCount}</span>
              <span className="metadata-text" style={{ marginLeft: '6px' }}>Out of Stock (2%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Grid (Recent Sync Activity & Open Exceptions) */}
      <div className="two-col-grid">
        {/* Recent Sync Activity */}
        <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="card-header-padded">
            <div>
              <h2 className="card-heading">Recent Sync Activity</h2>
              <p className="metadata-text">Latest inventory synchronization events</p>
            </div>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('/sync-activity')}
            >
              View All Log <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="omni-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Master SKU</th>
                  <th>Store</th>
                  <th>Channel</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {syncActivities.slice(0, 5).map((item) => (
                  <tr 
                    key={item.id} 
                    className="clickable"
                    onClick={() => onNavigate('/sync-activity')}
                  >
                    <td style={{ fontWeight: 500 }}>{item.operation}</td>
                    <td><code className="sku-code">{item.masterSku}</code></td>
                    <td>{item.store}</td>
                    <td>{item.channel}</td>
                    <td><StatusBadge status={item.status as StatusType} /></td>
                    <td className="metadata-text">{item.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exceptions & Events Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Exceptions */}
          <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="card-header-padded">
              <div>
                <h2 className="card-heading" style={{ color: openExceptions.length > 0 ? '#B91C1C' : 'var(--text-primary)' }}>Open Exceptions</h2>
                <p className="metadata-text">Issues requiring operator attention</p>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => onNavigate('/exceptions')}
              >
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="exceptions-list">
              {openExceptions.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p className="metadata-text">No open exceptions. All systems operating normally.</p>
                </div>
              ) : (
                openExceptions.map((exc) => (
                  <div 
                    key={exc.id} 
                    className="exception-list-item clickable"
                    onClick={() => setSelectedException(exc)}
                  >
                    <div className="exception-header">
                      <span className="sku-code">{exc.masterSku}</span>
                      <span className={`severity-tag severity-${exc.severity.toLowerCase()}`}>
                        {exc.severity}
                      </span>
                    </div>
                    <p className="exception-desc">{exc.reason}</p>
                    <div className="exception-meta">
                      <span>{exc.channel} • {exc.store}</span>
                      <StatusBadge status={exc.status as StatusType} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Timeline Events */}
          <section className="card">
            <h2 className="card-heading" style={{ marginBottom: '16px' }}>Recent Operational Events</h2>
            <div className="timeline-list">
              {recentEvents.slice(0, 5).map((evt) => (
                <div key={evt.id} className="timeline-item">
                  <div className="timeline-icon">
                    {evt.type === 'sync_failed' && <XCircle size={14} style={{ color: '#B91C1C' }} />}
                    {evt.type === 'sync_complete' && <CheckCircle2 size={14} style={{ color: '#27620E' }} />}
                    {evt.type === 'exception_created' && <AlertCircle size={14} style={{ color: '#B91C1C' }} />}
                    {evt.type === 'retry_started' && <Play size={14} style={{ color: '#92400E' }} />}
                    {evt.type === 'update' && <Clock size={14} style={{ color: 'var(--text-secondary)' }} />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title-row">
                      <span className="table-text" style={{ fontWeight: 600 }}>{evt.title}</span>
                      <span className="metadata-text">{evt.time}</span>
                    </div>
                    <p className="metadata-text">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Exception Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedException)}
        onClose={() => setSelectedException(null)}
        title={selectedException ? `Exception: ${selectedException.id}` : ''}
        subtitle="Operational Exception Analysis"
        footer={
          <>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setSelectedException(null)}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => {
                setSelectedException(null);
                onNavigate('/exceptions');
              }}
            >
              Resolve in Exceptions Workspace
            </button>
          </>
        }
      >
        {selectedException && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="detail-section">
              <span className="metadata-text">MASTER SKU</span>
              <p className="body-text" style={{ fontWeight: 600 }}><code className="sku-code">{selectedException.masterSku}</code></p>
            </div>
            <div className="detail-section">
              <span className="metadata-text">EXCEPTION REASON</span>
              <p className="body-text">{selectedException.reason}</p>
            </div>
            <div className="detail-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span className="metadata-text">CHANNEL</span>
                <p className="body-text" style={{ fontWeight: 500 }}>{selectedException.channel}</p>
              </div>
              <div>
                <span className="metadata-text">STORE</span>
                <p className="body-text" style={{ fontWeight: 500 }}>{selectedException.store}</p>
              </div>
              <div>
                <span className="metadata-text">SEVERITY</span>
                <div>
                  <span className={`severity-tag severity-${selectedException.severity.toLowerCase()}`}>
                    {selectedException.severity}
                  </span>
                </div>
              </div>
              <div>
                <span className="metadata-text">STATUS</span>
                <div><StatusBadge status={selectedException.status as StatusType} /></div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .overview-page-layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .state-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background-color: #FAF9F6;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--space-4);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .metric-icon {
          color: var(--text-secondary);
        }

        .clickable {
          cursor: pointer;
          transition: transform 0.12s ease, border-color 0.12s ease;
        }

        .clickable:hover {
          border-color: var(--border-color-hover);
        }

        .metric-card.highlight-alert {
          border-color: var(--status-failed-border);
          background-color: #FFFDFD;
        }

        /* Health Bar */
        .inventory-health-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .card-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-header-padded {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #FAF9F6;
        }

        .health-visual-bar {
          height: 12px;
          width: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          background-color: var(--bg-muted);
        }

        .bar-segment.healthy { background-color: var(--accent-green); }
        .bar-segment.warning { background-color: #F59E0B; }
        .bar-segment.failed { background-color: #EF4444; }

        .health-stats-row {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .health-stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .stat-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .stat-dot.healthy { background-color: var(--accent-green); }
        .stat-dot.warning { background-color: #F59E0B; }
        .stat-dot.failed { background-color: #EF4444; }

        /* Grid */
        .two-col-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: var(--space-6);
        }

        @media (max-width: 1024px) {
          .two-col-grid {
            grid-template-columns: 1fr;
          }
        }

        .sku-code {
          font-family: monospace;
          background-color: #F0F0ED;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-primary);
        }

        /* Exceptions list */
        .exceptions-list {
          display: flex;
          flex-direction: column;
        }

        .exception-list-item {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .exception-list-item:last-child {
          border-bottom: none;
        }

        .exception-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .severity-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .severity-high, .severity-critical {
          background-color: var(--status-failed-bg);
          color: var(--status-failed-text);
          border: 1px solid var(--status-failed-border);
        }

        .severity-medium {
          background-color: var(--status-warning-bg);
          color: var(--status-warning-text);
          border: 1px solid var(--status-warning-border);
        }

        .severity-low {
          background-color: var(--status-pending-bg);
          color: var(--status-pending-text);
        }

        .exception-desc {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .exception-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Timeline */
        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .timeline-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .timeline-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--bg-app);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .timeline-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
