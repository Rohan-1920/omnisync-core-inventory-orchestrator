import React from 'react';
import { Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface FeatureShowcaseProps {
  onNavigate: (path: string) => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onNavigate }) => {
  return (
    <section className="feature-showcase-section">
      <div className="feature-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">DEEP-DIVE CAPABILITIES</span>
          <h2 className="section-title">Designed for operational precision.</h2>
          <p className="section-subtitle">
            Every workspace screen provides actionable controls designed to inspect stock levels, diagnose sync dropouts, and remediate mapping conflicts.
          </p>
        </div>

        {/* Feature Item 1: Inventory Workspace */}
        <div className="feature-row">
          <div className="feature-info">
            <div className="feature-icon-badge"><Package size={18} /></div>
            <h3 className="feature-title">Master Inventory Workspace</h3>
            <p className="feature-desc">
              Inspect availability across warehouses, track safety stock buffers, and instantly filter SKUs by channel status.
            </p>
            <ul className="feature-list">
              <li>Real-time quantity calculations & reserved stock tracking</li>
              <li>Filter by Healthy, Low Stock, and Out of Stock states</li>
              <li>Inspect channel SKU mappings directly from row actions</li>
            </ul>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => onNavigate('/inventory')}>
              Explore Inventory Workspace <ArrowRight size={12} />
            </button>
          </div>

          <div className="feature-visual-box">
            <div className="visual-header-bar">
              <span className="sku-code">MASTER CATALOG</span>
              <span className="metadata-text">Filtered: Main Shopify Store</span>
            </div>
            <div className="table-container" style={{ border: 'none' }}>
              <table className="omni-table">
                <thead>
                  <tr>
                    <th>Master SKU</th>
                    <th>Product</th>
                    <th>Available</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code className="sku-code">MASTER-1042</code></td>
                    <td>Classic Black Hoodie</td>
                    <td>0</td>
                    <td><StatusBadge status="Out of Stock" /></td>
                  </tr>
                  <tr>
                    <td><code className="sku-code">MASTER-1088</code></td>
                    <td>Essential White Tee</td>
                    <td>48</td>
                    <td><StatusBadge status="Healthy" /></td>
                  </tr>
                  <tr>
                    <td><code className="sku-code">MASTER-1121</code></td>
                    <td>Everyday Cargo Pant</td>
                    <td>4</td>
                    <td><StatusBadge status="Low Stock" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feature Item 2: Exceptions Workspace */}
        <div className="feature-row reverse">
          <div className="feature-info">
            <div className="feature-icon-badge alert"><AlertTriangle size={18} /></div>
            <h3 className="feature-title">Structured Exception Management</h3>
            <p className="feature-desc">
              When synchronization encounters an API timeout, rate limit, or payload rejection, OmniSync Core logs a structured exception.
            </p>
            <ul className="feature-list">
              <li>Explicit root-cause explanations (What, Why, Action taken)</li>
              <li>Manual retry execution with exponential backoff support</li>
              <li>Dead-Letter Queue (DLQ) routing for non-recoverable payloads</li>
            </ul>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => onNavigate('/exceptions')}>
              Explore Exceptions Workspace <ArrowRight size={12} />
            </button>
          </div>

          <div className="feature-visual-box alert-border">
            <div className="visual-header-bar alert-bg">
              <span className="sku-code">EXCEPTION EXC-2041</span>
              <span className="severity-tag severity-high">HIGH SEVERITY</span>
            </div>
            <div className="feature-card-content">
              <p className="table-text" style={{ fontWeight: 600 }}>Channel API Timeout on MASTER-1042</p>
              <p className="metadata-text">The Shopify API request timed out after 3 automated retries.</p>
              <div className="action-row-mock">
                <button type="button" className="btn btn-primary btn-sm">Retry Sync Now</button>
                <button type="button" className="btn btn-secondary btn-sm">Resolve Exception</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feature-showcase-section {
          padding: 90px 0;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .feature-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .feature-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
          margin-top: 60px;
        }

        .feature-row.reverse {
          grid-template-columns: 1.2fr 1fr;
        }

        .feature-row.reverse .feature-info {
          grid-column: 2;
        }

        .feature-row.reverse .feature-visual-box {
          grid-column: 1;
          grid-row: 1;
        }

        .feature-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .feature-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .feature-icon-badge.alert {
          background-color: var(--status-failed-bg);
          color: var(--status-failed-text);
          border-color: var(--status-failed-border);
        }

        .feature-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feature-list li {
          font-size: 14px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-list li::before {
          content: '✓';
          color: var(--accent-green-text);
          font-weight: 700;
        }

        .feature-visual-box {
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .feature-visual-box.alert-border {
          border-color: var(--status-failed-border);
        }

        .visual-header-bar {
          padding: 12px 18px;
          background-color: var(--bg-subtle);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .visual-header-bar.alert-bg {
          background-color: var(--status-failed-bg);
        }

        .feature-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-row-mock {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        @media (max-width: 900px) {
          .feature-row, .feature-row.reverse {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .feature-row.reverse .feature-info,
          .feature-row.reverse .feature-visual-box {
            grid-column: 1;
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  );
};
