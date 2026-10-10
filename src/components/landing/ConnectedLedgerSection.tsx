import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  Zap, 
  Building2, 
  Warehouse, 
  ShoppingCart, 
  Tag, 
  CreditCard, 
  Truck, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  Activity
} from 'lucide-react';

interface ConnectedLedgerSectionProps {
  onNavigate?: (path: string) => void;
}

export const ConnectedLedgerSection: React.FC<ConnectedLedgerSectionProps> = ({ onNavigate }) => {
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);

  const integrations = [
    { id: 'shopify', name: 'Shopify Plus', desc: 'Instant Webhook', icon: ShoppingBag },
    { id: 'amazon', name: 'Amazon FBA', desc: 'SP-API Sync', icon: Package },
    { id: 'tiktok', name: 'TikTok Shop', desc: 'Flash Engine', icon: Zap },
    { id: 'netsuite', name: 'NetSuite ERP', desc: 'Bi-directional', icon: Building2 },
    { id: 'manhattan', name: 'Manhattan WMS', desc: 'Inventory Stream', icon: Warehouse },
    { id: 'woocommerce', name: 'WooCommerce', desc: 'REST V3', icon: ShoppingCart },
    { id: 'ebay', name: 'eBay', desc: 'Catalog Sync', icon: Tag },
    { id: 'pos', name: 'POS Terminals', desc: 'Storefront Sync', icon: CreditCard },
    { id: 'threepl', name: '3PL Feeds', desc: 'EDI 846/940', icon: Truck },
    { id: 'api', name: 'Custom Core API', desc: 'gRPC / Webhooks', icon: Code2 },
  ];

  const operationalBenefits = [
    {
      title: 'Zero duplicate sales during promotion spikes',
      desc: 'Atomic multi-cart reservation prevents overselling down to 0 units even during flash drops.',
    },
    {
      title: 'Unified stock availability across global continents',
      desc: 'Single authoritative truth maintained across North America, Europe, and Asia-Pacific channels.',
    },
    {
      title: 'Eliminates manual CSV reconciliations',
      desc: 'Auto-reconciles stock anomalies in sub-second background routines without spreadsheet audits.',
    },
    {
      title: 'Sub-20ms atomic locking across multiple carts',
      desc: 'High-velocity reservations simultaneously across Shopify Plus, TikTok, and wholesale portals.',
    },
    {
      title: 'Deterministic rollback on failed payment webhooks',
      desc: 'Expired or abandoned transactions release and restore inventory instantly without manual tickets.',
    },
    {
      title: 'One centralized audit trace for every stock decrement',
      desc: 'Full cryptographic ledger records immutable log traces for enterprise compliance and accounting.',
    },
  ];

  return (
    <section className="connected-ledger-section" id="integrations">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-group">
          <div className="section-eyebrow-pill">
            <span className="dot-blue-gem" />
            <span className="eyebrow-text font-mono">ANY CONNECTED LEDGER</span>
          </div>

          <h2 className="section-main-heading">
            Everything your commerce stack needs, connected.
          </h2>

          <p className="section-subtext">
            OmniSync replaces fragmented custom webhooks with a single unified core ledger that coordinates real-time state across every point of checkout and fulfillment.
          </p>
        </div>

        {/* Two-Column Grid: 10 Integration Cards on Left, Benefit Panel on Right */}
        <div className="ledger-content-grid">
          {/* Left: 10 Integrations Grid */}
          <div className="integrations-cards-grid">
            {integrations.map((item) => {
              const IconComp = item.icon;
              const isActive = activeIntegration === item.id;
              return (
                <div 
                  key={item.id} 
                  className={`integration-node-card ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIntegration(item.id)}
                  onMouseLeave={() => setActiveIntegration(null)}
                >
                  <div className="integration-left-details">
                    <div className="integration-icon-container">
                      <IconComp size={16} className="integration-icon" />
                    </div>
                    <div className="integration-text-group">
                      <span className="integration-title">{item.name}</span>
                      <span className="integration-desc">{item.desc}</span>
                    </div>
                  </div>
                  <span className="integration-status-dot" title="Active Connection" />
                </div>
              );
            })}
          </div>

          {/* Right: WHAT IT MEANS FOR YOUR OPERATIONS Card */}
          <div className="operations-benefit-panel">
            <div className="panel-header-row font-mono">
              <span className="panel-header-title">WHAT IT MEANS FOR YOUR OPERATIONS</span>
              <span className="status-dot-green" />
            </div>

            <div className="benefits-checklist-group">
              {operationalBenefits.map((benefit, idx) => (
                <div key={idx} className="benefit-row-item">
                  <div className="check-icon-wrapper">
                    <CheckCircle2 size={16} className="icon-green-check" />
                  </div>
                  <div className="benefit-content">
                    <h4 className="benefit-heading">{benefit.title}</h4>
                    <p className="benefit-explanation">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Footer Info Strip */}
            <div className="panel-footer-row font-mono">
              <div className="telemetry-info">
                <Activity size={12} className="telemetry-icon" />
                <span>TELEMETRY LATENCY: 3.4MS 50K/SEC</span>
              </div>

              <button 
                type="button" 
                className="link-explore-stack"
                onClick={() => onNavigate && onNavigate('/channels')}
              >
                <span>Explore Integration Stack</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .connected-ledger-section {
          background-color: #FFFFFF;
          padding: 84px 0 92px;
          border-bottom: 1px solid #E2E8F0;
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .section-header-group {
          margin-bottom: 44px;
        }

        .section-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          background-color: #EFF6FF;
          border: 1px solid #DBEAFE;
          border-radius: 9999px;
          margin-bottom: 14px;
        }

        .dot-blue-gem {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2563EB;
          box-shadow: 0 0 6px rgba(37, 99, 235, 0.6);
        }

        .eyebrow-text {
          font-size: 11px;
          font-weight: 700;
          color: #1D4ED8;
          letter-spacing: 0.05em;
        }

        .section-main-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #0F172A;
          margin-bottom: 12px;
        }

        .section-subtext {
          font-size: 15.5px;
          line-height: 1.55;
          color: #475569;
          max-width: 720px;
        }

        /* Two-Column Grid */
        .ledger-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }

        /* Left: 10 Integrations Grid */
        .integrations-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .integration-node-card {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .integration-node-card:hover, .integration-node-card.active {
          border-color: #CBD5E1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
          background-color: #F8FAFC;
        }

        .integration-left-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .integration-icon-container {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background-color: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          flex-shrink: 0;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .integration-node-card:hover .integration-icon-container {
          background-color: #0F172A;
          color: #FFFFFF;
        }

        .integration-text-group {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .integration-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
        }

        .integration-desc {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #64748B;
        }

        .integration-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 5px #10B981;
          flex-shrink: 0;
        }

        /* Right: WHAT IT MEANS FOR YOUR OPERATIONS Card */
        .operations-benefit-panel {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 20px -8px rgba(15, 23, 42, 0.05);
        }

        .panel-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #E2E8F0;
        }

        .panel-header-title {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.06em;
        }

        .status-dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .benefits-checklist-group {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 24px;
        }

        .benefit-row-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .check-icon-wrapper {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .icon-green-check {
          color: #10B981;
        }

        .benefit-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .benefit-heading {
          font-size: 13.5px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
        }

        .benefit-explanation {
          font-size: 12.5px;
          line-height: 1.5;
          color: #475569;
        }

        /* Panel Footer */
        .panel-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid #E2E8F0;
        }

        .telemetry-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #64748B;
          font-weight: 600;
        }

        .telemetry-icon {
          color: #0D9488;
        }

        .link-explore-stack {
          background: transparent;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: inherit;
          font-size: 11.5px;
          font-weight: 600;
          color: #0D9488;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0;
        }

        .link-explore-stack:hover {
          color: #0F766E;
          transform: translateX(2px);
        }

        @media (max-width: 960px) {
          .ledger-content-grid {
            grid-template-columns: 1fr;
          }
          .section-main-heading {
            font-size: 32px;
          }
        }

        @media (max-width: 640px) {
          .integrations-cards-grid {
            grid-template-columns: 1fr;
          }
          .panel-footer-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default ConnectedLedgerSection;
