import React from 'react';
import { ShieldCheck, RotateCcw, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ReliabilitySection: React.FC = () => {
  return (
    <section className="reliability-section">
      <div className="reliability-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">RELIABILITY & OPERATIONAL CONTROL</span>
          <h2 className="section-title">When synchronization fails, <br />the failure should never be invisible.</h2>
          <p className="section-subtitle">
            Operational workflows need more than a simple success message. They need visibility into what happened, where it failed, and what should happen next.
          </p>
        </div>

        {/* 2-Column Section: Reliability Narrative & Real Exception Timeline Visual */}
        <div className="reliability-grid">
          <div className="reliability-pillars">
            <div className="pillar-item">
              <div className="pillar-icon"><ShieldCheck size={20} /></div>
              <div>
                <h4 className="pillar-title">Structured Exception Review</h4>
                <p className="pillar-desc">
                  Failures are automatically grouped with diagnostic context, pinpointing exact HTTP status codes, missing mapping fields, or rate limit thresholds.
                </p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon"><RotateCcw size={20} /></div>
              <div>
                <h4 className="pillar-title">Deterministic Retry Engine</h4>
                <p className="pillar-desc">
                  Transient errors automatically trigger configurable backoff retries. Operators retain one-click manual retry overrides for urgent updates.
                </p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon"><FileText size={20} /></div>
              <div>
                <h4 className="pillar-title">Complete Event Audit Trail</h4>
                <p className="pillar-desc">
                  Every inventory update, channel webhook payload, and state mutation is logged with timestamped timeline steps for full operational governance.
                </p>
              </div>
            </div>
          </div>

          {/* Real Timeline Card */}
          <div className="timeline-proof-card">
            <div className="proof-card-header">
              <div className="proof-title-row">
                <span className="sku-code">SYNC-9941</span>
                <span className="badge badge-failed">Failed</span>
              </div>
              <h4 style={{ fontSize: '15px', marginTop: '6px' }}>Shopify Inventory Push Timeline</h4>
            </div>

            <div className="proof-timeline-body">
              <div className="timeline-step-row success">
                <CheckCircle2 size={15} />
                <div>
                  <p className="step-t">Inventory change detected on Master SKU</p>
                  <span className="metadata-text">12m ago • Quantity: 0 available</span>
                </div>
              </div>

              <div className="timeline-step-row success">
                <CheckCircle2 size={15} />
                <div>
                  <p className="step-t">SKU resolved to SHOP-1042 on Main Shopify Store</p>
                  <span className="metadata-text">12m ago • Mapping status: Verified</span>
                </div>
              </div>

              <div className="timeline-step-row warning">
                <RotateCcw size={15} />
                <div>
                  <p className="step-t">Automated Retry #1 initiated (Backoff: 60s)</p>
                  <span className="metadata-text">10m ago • HTTP 504 Timeout</span>
                </div>
              </div>

              <div className="timeline-step-row failed">
                <AlertTriangle size={15} />
                <div>
                  <p className="step-t">Exception EXC-2041 logged to operational workspace</p>
                  <span className="metadata-text">8m ago • Routed to operator review queue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reliability-section {
          padding: 90px 0;
          background-color: var(--bg-app);
        }

        .reliability-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .reliability-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-top: 48px;
        }

        .reliability-pillars {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-green-text);
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .pillar-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .timeline-proof-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .proof-card-header {
          padding: 20px;
          background-color: var(--bg-subtle);
          border-bottom: 1px solid var(--border-color);
        }

        .proof-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .proof-timeline-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .timeline-step-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px dashed var(--border-color);
        }

        .timeline-step-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .step-t {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .timeline-step-row.success svg { color: var(--accent-green-text); }
        .timeline-step-row.warning svg { color: var(--status-warning-text); }
        .timeline-step-row.failed svg { color: var(--status-failed-text); }

        @media (max-width: 900px) {
          .reliability-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
