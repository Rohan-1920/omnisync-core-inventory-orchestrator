import React from 'react';
import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data found',
  description = 'The current filters returned no matching results.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Inbox size={22} />
      </div>
      <h4 className="card-heading">{title}</h4>
      <p className="metadata-text" style={{ maxWidth: '360px' }}>{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-secondary btn-sm" onClick={onAction} style={{ marginTop: '8px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load inventory',
  description = 'Something went wrong while retrieving inventory data.',
  onRetry,
}) => {
  return (
    <div className="error-state">
      <div className="empty-state-icon" style={{ backgroundColor: '#FEF2F2', color: '#B91C1C' }}>
        <AlertCircle size={22} />
      </div>
      <h4 className="card-heading">{title}</h4>
      <p className="metadata-text" style={{ maxWidth: '360px' }}>{description}</p>
      {onRetry && (
        <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry} style={{ marginTop: '4px' }}>
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 7 }) => {
  return (
    <div className="table-container">
      <table className="omni-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton" style={{ height: '14px', width: i === 0 ? '80px' : '60px' }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <div 
                    className="skeleton" 
                    style={{ 
                      height: '16px', 
                      width: c === 0 ? '110px' : c === 1 ? '160px' : '70px' 
                    }} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
