import React, { useState } from 'react';
import { StatusBadge, type StatusType } from '../components/common/StatusBadge';
import { TableSkeleton, EmptyState, ErrorState } from '../components/common/States';
import { Drawer } from '../components/common/Drawer';
import { Modal } from '../components/common/Modal';
import { useData } from '../context/DataContext';

interface ExceptionsPageProps {
  onNavigate?: (path: string) => void;
}

export const ExceptionsPage: React.FC<ExceptionsPageProps> = ({ onNavigate }) => {
  const { exceptions, retryException, resolveException, retryingExceptionIds } = useData();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [activeTab, setActiveTab] = useState<'Open' | 'Retrying' | 'Failed' | 'DLQ' | 'Resolved'>('Open');
  
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);
  const [showResolveModal, setShowResolveModal] = useState(false);

  // Selected exception resolved from global store by ID to prevent stale drawer state
  const selectedException = exceptions.find(e => e.id === selectedExceptionId) || null;
  const isRetrying = selectedExceptionId ? retryingExceptionIds.has(selectedExceptionId) : false;

  // Tab Filtering
  const filteredExceptions = exceptions.filter((exc) => {
    if (activeTab === 'Open') return exc.status !== 'Resolved';
    if (activeTab === 'Retrying') return exc.status === 'Retrying';
    if (activeTab === 'Failed') return exc.status === 'Failed';
    if (activeTab === 'DLQ') return exc.status === 'DLQ';
    if (activeTab === 'Resolved') return exc.status === 'Resolved';
    return true;
  });

  // Handle Retry Action
  const handleRetry = () => {
    if (!selectedExceptionId || isRetrying || selectedException?.status === 'Resolved') return;
    retryException(selectedExceptionId);
  };

  // Handle Confirm Resolve Action
  const handleConfirmResolve = () => {
    if (!selectedExceptionId) return;
    resolveException(selectedExceptionId);
    setShowResolveModal(false);
  };

  if (viewState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <TableSkeleton rows={5} cols={8} />
      </div>
    );
  }

  if (viewState === 'error') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StateControls viewState={viewState} setViewState={setViewState} />
        <ErrorState 
          title="Unable to load exceptions"
          description="Could not connect to the Exception Queue worker service."
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
          title="No open exceptions"
          description="All synchronization jobs are currently operating normally."
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <StateControls viewState={viewState} setViewState={setViewState} />

      {/* Exception Status Tabs */}
      <div className="tab-nav">
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'Open' ? 'active' : ''}`}
          onClick={() => setActiveTab('Open')}
        >
          Open ({exceptions.filter(e => e.status !== 'Resolved').length})
        </button>
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'Retrying' ? 'active' : ''}`}
          onClick={() => setActiveTab('Retrying')}
        >
          Retrying ({exceptions.filter(e => e.status === 'Retrying').length})
        </button>
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'Failed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Failed')}
        >
          Failed ({exceptions.filter(e => e.status === 'Failed').length})
        </button>
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'DLQ' ? 'active' : ''}`}
          onClick={() => setActiveTab('DLQ')}
        >
          <span className="dlq-indicator-dot" />
          DLQ ({exceptions.filter(e => e.status === 'DLQ').length})
        </button>
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'Resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('Resolved')}
        >
          Resolved ({exceptions.filter(e => e.status === 'Resolved').length})
        </button>
      </div>

      {filteredExceptions.length === 0 ? (
        <EmptyState 
          title="No open exceptions"
          description="All synchronization jobs in this category are currently operating normally."
        />
      ) : (
        <div className="table-container">
          <table className="omni-table">
            <thead>
              <tr>
                <th>Exception ID</th>
                <th>MASTER SKU</th>
                <th>Product Name</th>
                <th>Store</th>
                <th>Channel</th>
                <th>Severity</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredExceptions.map((exc) => (
                <tr 
                  key={exc.id} 
                  className={`clickable ${exc.status === 'DLQ' ? 'row-dlq' : ''}`}
                  onClick={() => setSelectedExceptionId(exc.id)}
                >
                  <td><code className="sku-code">{exc.id}</code></td>
                  <td><code className="sku-code">{exc.masterSku}</code></td>
                  <td style={{ fontWeight: 500 }}>{exc.productName}</td>
                  <td>{exc.store}</td>
                  <td>{exc.channel}</td>
                  <td>
                    <span className={`severity-tag severity-${exc.severity.toLowerCase()}`}>
                      {exc.severity}
                    </span>
                  </td>
                  <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {exc.reason}
                  </td>
                  <td>
                    {exc.status === 'DLQ' ? (
                      <span className="badge badge-dlq">
                        <span className="badge-dot" />
                        DLQ
                      </span>
                    ) : (
                      <StatusBadge status={exc.status as StatusType} />
                    )}
                  </td>
                  <td className="metadata-text">{exc.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Exception Detail & Resolution Workflow Drawer */}
      <Drawer
        isOpen={Boolean(selectedException)}
        onClose={() => setSelectedExceptionId(null)}
        title={selectedException ? `Exception Detail: ${selectedException.id}` : ''}
        subtitle={selectedException ? `${selectedException.productName} (${selectedException.masterSku})` : ''}
        footer={
          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {onNavigate && (
                <>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedExceptionId(null);
                      onNavigate('/sync-activity');
                    }}
                  >
                    View Event
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedExceptionId(null);
                      onNavigate('/inventory');
                    }}
                  >
                    View SKU
                  </button>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setSelectedExceptionId(null)}
              >
                Close
              </button>

              {selectedException && selectedException.status !== 'Resolved' && (
                <>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowResolveModal(true)}
                    disabled={isRetrying}
                  >
                    Resolve
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleRetry}
                    disabled={isRetrying}
                  >
                    {isRetrying ? 'Retrying...' : 'Retry'}
                  </button>
                </>
              )}
            </div>
          </div>
        }
      >
        {selectedException && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 4 Questions Operational Framework */}
            <div className="card" style={{ backgroundColor: '#FFFDFD', borderColor: 'var(--status-failed-border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span className="metadata-text" style={{ color: '#B91C1C', fontWeight: 600 }}>WHAT HAPPENED?</span>
                  <p className="body-text" style={{ fontWeight: 600, marginTop: '2px' }}>{selectedException.whatHappened}</p>
                </div>
                <div>
                  <span className="metadata-text" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>WHY DID IT HAPPEN?</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedException.whyHappened}</p>
                </div>
                <div>
                  <span className="metadata-text" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>WHAT DID OMNISYNC DO?</span>
                  <p className="body-text" style={{ marginTop: '2px' }}>{selectedException.whatOmniSyncDid}</p>
                </div>
              </div>
            </div>

            {/* Summary Information Card */}
            <div className="card" style={{ backgroundColor: '#FAF9F6' }}>
              <h4 className="card-heading" style={{ marginBottom: '12px' }}>Exception Summary</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span className="metadata-text">EXCEPTION ID</span>
                  <p className="body-text" style={{ fontWeight: 600 }}><code className="sku-code">{selectedException.id}</code></p>
                </div>
                <div>
                  <span className="metadata-text">MASTER SKU</span>
                  <p className="body-text" style={{ fontWeight: 600 }}><code className="sku-code">{selectedException.masterSku}</code></p>
                </div>
                <div>
                  <span className="metadata-text">STORE</span>
                  <p className="body-text">{selectedException.store}</p>
                </div>
                <div>
                  <span className="metadata-text">CHANNEL</span>
                  <p className="body-text">{selectedException.channel}</p>
                </div>
                <div>
                  <span className="metadata-text">SEVERITY</span>
                  <div style={{ marginTop: '2px' }}>
                    <span className={`severity-tag severity-${selectedException.severity.toLowerCase()}`}>
                      {selectedException.severity}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="metadata-text">CURRENT STATUS</span>
                  <div style={{ marginTop: '2px' }}>
                    {selectedException.status === 'DLQ' ? (
                      <span className="badge badge-dlq">
                        <span className="badge-dot" />
                        DLQ
                      </span>
                    ) : (
                      <StatusBadge status={selectedException.status as StatusType} />
                    )}
                  </div>
                </div>
                <div>
                  <span className="metadata-text">RETRY COUNT</span>
                  <p className="body-text" style={{ fontWeight: 600 }}>{selectedException.retryCount}</p>
                </div>
                <div>
                  <span className="metadata-text">CREATED AT</span>
                  <p className="body-text">{selectedException.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Event Timeline Visualizer */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 className="card-heading" style={{ marginBottom: '14px' }}>Exception Lifecycle Timeline</h4>
              <div className="vertical-timeline">
                {selectedException.timelineSteps.map((step, idx) => (
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
          </div>
        )}
      </Drawer>

      {/* Confirmation Modal for Resolve Action */}
      <Modal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        title="Resolve this exception?"
        footer={
          <>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowResolveModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleConfirmResolve}
            >
              Confirm Resolution
            </button>
          </>
        }
      >
        <p className="body-text">
          Marking exception <strong>{selectedException?.id}</strong> for <strong>{selectedException?.masterSku}</strong> as resolved will remove it from the active operational exception queue and log an audit entry.
        </p>
      </Modal>

      <style>{`
        .tab-nav {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0;
        }

        .tab-btn {
          padding: 8px 16px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.12s ease, border-color 0.12s ease;
        }

        .tab-btn:hover {
          color: var(--text-primary);
        }

        .tab-btn.active {
          color: var(--text-primary);
          border-bottom-color: var(--text-primary);
          font-weight: 600;
        }

        .dlq-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #8B5CF6;
        }

        .row-dlq {
          background-color: #FAF5FF;
        }

        .badge-dlq {
          background-color: #F3E8FF;
          color: #6B21A8;
          border: 1px solid #D8B4FE;
        }

        .badge-dlq .badge-dot {
          background-color: #8B5CF6;
        }

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
