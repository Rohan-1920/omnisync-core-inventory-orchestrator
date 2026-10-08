import React from 'react';

export type StatusType = 
  | 'Healthy' 
  | 'Success' 
  | 'Warning' 
  | 'Failed' 
  | 'Pending' 
  | 'Retrying' 
  | 'Resolved'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Open'
  | 'DLQ';

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showDot = true }) => {
  let badgeClass = 'badge-pending';
  let label: string = status;

  switch (status) {
    case 'Healthy':
    case 'Success':
    case 'Resolved':
      badgeClass = 'badge-healthy';
      break;
    case 'Warning':
    case 'Low Stock':
      badgeClass = 'badge-warning';
      break;
    case 'Failed':
    case 'Out of Stock':
    case 'Open':
      badgeClass = 'badge-failed';
      break;
    case 'DLQ':
      badgeClass = 'badge-dlq';
      break;
    case 'Retrying':
      badgeClass = 'badge-retrying';
      break;
    case 'Pending':
    default:
      badgeClass = 'badge-pending';
      break;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {showDot && <span className="badge-dot" />}
      {label}
    </span>
  );
};
