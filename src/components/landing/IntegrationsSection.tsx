import React from 'react';
import { CheckCircle2, Layers, ArrowRight, RefreshCw } from 'lucide-react';

export const IntegrationsSection: React.FC = () => {
  const channelNodes = [
    { name: 'Shopify Plus', type: 'Storefront', status: 'Active (12ms)' },
    { name: 'Amazon US & EU', type: 'Marketplace', status: 'Active (24ms)' },
    { name: 'TikTok Shop', type: 'Social Commerce', status: 'Active (18ms)' },
    { name: 'WooCommerce', type: 'Custom Cart', status: 'Active (32ms)' },
    { name: 'NetSuite ERP', type: 'Enterprise ERP', status: 'Active (8ms)' },
  ];

  const destinationNodes = [
    { name: 'Primary Warehouse WMS', type: 'Fulfillment Hub' },
    { name: 'POS Retail Terminals', type: 'In-Store Physical' },
    { name: 'Global 3PL Logistics', type: 'Regional Pools' },
  ];

  return (
    <section className="exact-integrations-section" id="integrations">
      <div className="section-container">
        <div className="integrations-grid">
          {/* Left Column: Text & Bullets */}
          <div className="integrations-left-text">
            <span className="pill-badge-light font-mono">CORE ARCHITECTURE</span>
            <h2 className="integrations-exact-heading">
              A control layer for multi-channel inventory operations.
            </h2>
            <p className="integrations-exact-desc">
              Rather than relying on each sales channel's fragmented tools, OmniSync acts as an authoritative, real-time source of truth for your warehouse, ERP systems, and storefront channels.
            </p>

            <div className="check-bullets-list">
              <div className="check-bullet-item">
                <CheckCircle2 size={18} className="icon-green-check" />
                <div>
                  <h4 className="bullet-title">Unified Inventory Ledger</h4>
                  <p className="bullet-desc">Real-time stock counts synced across channels simultaneously.</p>
                </div>
              </div>

              <div className="check-bullet-item">
                <CheckCircle2 size={18} className="icon-green-check" />
                <div>
                  <h4 className="bullet-title">Dynamic Buffer Safeguards</h4>
                  <p className="bullet-desc">Prevent overselling during high-volume promotional spikes.</p>
                </div>
              </div>

              <div className="check-bullet-item">
                <CheckCircle2 size={18} className="icon-green-check" />
                <div>
                  <h4 className="bullet-title">Automated Exception Handling</h4>
                  <p className="bullet-desc">Fallback rules and auto-retry routines for failed syncs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Precision Central Control Diagram */}
          <div className="integrations-diagram-container">
            <div className="diagram-card-frame">
              <div className="diagram-header-bar font-mono">
                <span className="dot-green" />
                <span>REAL-TIME MULTI-TENANT ORCHESTRATOR NODE</span>
              </div>

              <div className="nodes-flow-wrapper">
                {/* Left Inputs */}
                <div className="flow-column left-inputs">
                  <span className="column-label font-mono">INBOUND FEEDS</span>
                  {channelNodes.map((node, i) => (
                    <div key={i} className="node-item-card">
                      <div className="node-title-row">
                        <span className="node-name">{node.name}</span>
                        <span className="dot-green-tiny" />
                      </div>
                      <span className="node-type font-mono">{node.type}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow Connector */}
                <div className="flow-arrow-middle">
                  <ArrowRight size={16} className="arrow-icon" />
                </div>

                {/* Central Engine Box */}
                <div className="flow-column center-engine">
                  <div className="engine-core-box">
                    <div className="engine-icon-ring">
                      <Layers size={22} className="engine-icon" />
                    </div>
                    <span className="engine-brand font-mono">OmniSync Core</span>
                    <span className="engine-sub font-mono">Authoritative Ledger</span>
                    <div className="engine-badge-active font-mono">
                      <RefreshCw size={10} className="spin-slow" />
                      <span>Zero-Drift Engine</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flow-arrow-middle">
                  <ArrowRight size={16} className="arrow-icon" />
                </div>

                {/* Right Destinations */}
                <div className="flow-column right-destinations">
                  <span className="column-label font-mono">DESTINATIONS</span>
                  {destinationNodes.map((node, i) => (
                    <div key={i} className="node-item-card dest">
                      <div className="node-title-row">
                        <span className="node-name">{node.name}</span>
                        <span className="dot-green-tiny" />
                      </div>
                      <span className="node-type font-mono">{node.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .exact-integrations-section {
          background-color: #FFFFFF;
          color: #111827;
          padding: 88px 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .integrations-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 48px;
          align-items: center;
        }

        .pill-badge-light {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #6B7280;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .integrations-exact-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #111827;
          margin-bottom: 16px;
        }

        .integrations-exact-desc {
          font-size: 15.5px;
          line-height: 1.55;
          color: #4B5563;
          margin-bottom: 32px;
        }

        .check-bullets-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .check-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .icon-green-check {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .bullet-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 2px;
        }

        .bullet-desc {
          font-size: 13.5px;
          color: #4B5563;
        }

        /* Diagram Mockup Frame */
        .diagram-card-frame {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }

        .diagram-header-bar {
          background-color: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
          padding: 10px 16px;
          font-size: 10px;
          font-weight: 700;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .nodes-flow-wrapper {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .flow-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .column-label {
          font-size: 9px;
          font-weight: 800;
          color: #9CA3AF;
          margin-bottom: 4px;
        }

        .node-item-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
        }

        .node-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .node-name {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }

        .dot-green-tiny {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .node-type {
          font-size: 9px;
          color: #6B7280;
        }

        .flow-arrow-middle {
          color: #9CA3AF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .center-engine {
          flex: 1.2;
        }

        .engine-core-box {
          background-color: #111827;
          color: #FFFFFF;
          border-radius: 12px;
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          box-shadow: 0 10px 25px rgba(17, 24, 39, 0.2);
        }

        .engine-icon-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #1F2937;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10B981;
          margin-bottom: 4px;
        }

        .engine-brand {
          font-size: 14px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .engine-sub {
          font-size: 10px;
          color: #9CA3AF;
        }

        .engine-badge-active {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          font-weight: 700;
          color: #10B981;
          background-color: rgba(16, 185, 129, 0.15);
          padding: 3px 8px;
          border-radius: 4px;
          margin-top: 6px;
        }

        .spin-slow {
          animation: spin 6s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 960px) {
          .integrations-grid {
            grid-template-columns: 1fr;
          }
          .nodes-flow-wrapper {
            flex-direction: column;
            gap: 16px;
          }
          .flow-arrow-middle {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
};

export default IntegrationsSection;
