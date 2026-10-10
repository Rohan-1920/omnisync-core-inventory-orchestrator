import { 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  Package, 
  ArrowRight
} from 'lucide-react';

export const FeatureDualSection: React.FC = () => {
  return (
    <section className="feature-dual-section" id="operations">
      <div className="section-container">
        <div className="dual-cards-grid">
          {/* Card 1: Self-Healing Infrastructure */}
          <div className="feature-card">
            {/* Header info */}
            <div className="feature-card-header">
              <div className="feature-eyebrow-pill">
                <span className="dot-green-glow" />
                <span className="eyebrow-text font-mono">SELF-HEALING INFRASTRUCTURE</span>
              </div>

              <h3 className="feature-title">
                Automate edge recovery without human intervention
              </h3>

              <p className="feature-desc">
                Self-healing dead-letter queues, smart retry backoffs, and automated reconciliation whenever downstream APIs throttle or experience timeouts.
              </p>
            </div>

            {/* Inner Interactive Visual Frame: Recovery Workflow */}
            <div className="inner-visual-frame font-mono">
              <div className="visual-frame-header">
                <span className="frame-title">RECOVERY WORKFLOW EXECUTION</span>
                <div className="frame-status-tag green">
                  <span className="status-dot-green" />
                  <span>STATUS: RESILIENT</span>
                </div>
              </div>

              {/* 3 Step Flow */}
              <div className="recovery-flow-row">
                {/* Step 1 */}
                <div className="flow-step-box">
                  <span className="step-tag-lbl">CATCH 429XX</span>
                  <div className="step-val-row text-amber">
                    <Zap size={13} className="text-amber" />
                    <span>HTTP 429 Throttle</span>
                  </div>
                </div>

                <div className="flow-arrow-separator">
                  <ArrowRight size={14} />
                </div>

                {/* Step 2 */}
                <div className="flow-step-box">
                  <span className="step-tag-lbl">BACKOFF LOGIC</span>
                  <div className="step-val-row text-blue">
                    <RotateCw size={13} className="text-blue" />
                    <span>Exponential (300ms)</span>
                  </div>
                </div>

                <div className="flow-arrow-separator">
                  <ArrowRight size={14} />
                </div>

                {/* Step 3 */}
                <div className="flow-step-box highlight-green">
                  <span className="step-tag-lbl">FINAL RETRY</span>
                  <div className="step-val-row text-green">
                    <CheckCircle2 size={13} className="text-green" />
                    <span>Re-synchronized</span>
                  </div>
                </div>
              </div>

              {/* Bottom Frame Details */}
              <div className="visual-frame-footer">
                <div className="footer-detail-item">
                  <span className="detail-key">Automatic Circuit Break:</span>
                  <span className="detail-val">Enabled</span>
                </div>
                <div className="footer-detail-item">
                  <span className="detail-key">Retries:</span>
                  <span className="detail-val">2/3 (Completed)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Customer Journey Integrity */}
          <div className="feature-card">
            {/* Header info */}
            <div className="feature-card-header">
              <div className="feature-eyebrow-pill">
                <span className="dot-green-glow" />
                <span className="eyebrow-text font-mono">CUSTOMER JOURNEY INTEGRITY</span>
              </div>

              <h3 className="feature-title">
                Single source of truth for every customer order
              </h3>

              <p className="feature-desc">
                Real-time visibility into customer journey, multi-channel basket allocations, ATP reservations, and warehouse fulfillment dispatch receipts.
              </p>
            </div>

            {/* Inner Visual Frame: Order Receipt Box */}
            <div className="inner-visual-frame font-mono">
              <div className="visual-frame-header">
                <div className="order-header-left">
                  <span className="order-number-title">Order #OS-8021</span>
                  <span className="order-channel-badge">Shopify Plus</span>
                </div>
                <span className="order-time-ago">2s ago</span>
              </div>

              {/* Product Item Row */}
              <div className="order-product-card">
                <div className="product-left-details">
                  <div className="product-icon-box">
                    <Package size={16} />
                  </div>
                  <div className="product-name-info">
                    <span className="product-title-text font-sans">Core Tech Shell / L</span>
                    <span className="product-sku-id font-mono">SKU-7841-BLK</span>
                  </div>
                </div>

                <div className="product-right-details">
                  <span className="product-qty-tag">1 unit</span>
                  <span className="product-atp-badge">ATP Ledger Confirmed</span>
                </div>
              </div>

              {/* Bottom Frame Details */}
              <div className="visual-frame-footer">
                <div className="footer-detail-item">
                  <span className="detail-key">Via:</span>
                  <span className="detail-val font-sans">Manhattan WMS + Denver Zone 3</span>
                </div>
                <div className="footer-detail-item">
                  <span className="dispatch-queue-pill">DISPATCH QUEUE: READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feature-dual-section {
          background-color: #FFFFFF;
          padding: 84px 0 92px;
          border-bottom: 1px solid #E2E8F0;
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .dual-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .feature-card {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .feature-card:hover {
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }

        .feature-card-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .feature-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          margin-bottom: 14px;
        }

        .dot-green-glow {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .eyebrow-text {
          font-size: 10.5px;
          font-weight: 700;
          color: #334155;
          letter-spacing: 0.04em;
        }

        .feature-title {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.25;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .feature-desc {
          font-size: 14px;
          line-height: 1.55;
          color: #475569;
        }

        /* Inner Visual Frame */
        .inner-visual-frame {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .visual-frame-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid #F1F5F9;
        }

        .frame-title {
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.05em;
        }

        .frame-status-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .frame-status-tag.green {
          color: #059669;
        }

        .status-dot-green {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 5px #10B981;
        }

        /* Recovery 3 Step Row */
        .recovery-flow-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 8px;
        }

        .flow-step-box {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .flow-step-box.highlight-green {
          background-color: #ECFDF5;
          border-color: #A7F3D0;
        }

        .step-tag-lbl {
          font-size: 8.5px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.05em;
        }

        .step-val-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
        }

        .text-amber { color: #D97706; }
        .text-blue { color: #2563EB; }
        .text-green { color: #059669; }

        .flow-arrow-separator {
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Visual Frame Footer */
        .visual-frame-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #F1F5F9;
          font-size: 10.5px;
        }

        .footer-detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .detail-key {
          color: #64748B;
        }

        .detail-val {
          color: #0F172A;
          font-weight: 600;
        }

        /* Order Details */
        .order-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-number-title {
          font-size: 12px;
          font-weight: 700;
          color: #0F172A;
        }

        .order-channel-badge {
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #047857;
          font-size: 9.5px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .order-time-ago {
          font-size: 10px;
          color: #94A3B8;
        }

        .order-product-card {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .product-left-details {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .product-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
        }

        .product-name-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .product-title-text {
          font-size: 12.5px;
          font-weight: 700;
          color: #0F172A;
        }

        .font-sans {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
        }

        .product-sku-id {
          font-size: 9.5px;
          color: #64748B;
        }

        .product-right-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .product-qty-tag {
          font-size: 11px;
          font-weight: 700;
          color: #0F172A;
        }

        .product-atp-badge {
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #047857;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 3px;
        }

        .dispatch-queue-pill {
          background-color: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #1D4ED8;
          font-size: 9px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.03em;
        }

        @media (max-width: 960px) {
          .dual-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .recovery-flow-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .flow-arrow-separator {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureDualSection;
