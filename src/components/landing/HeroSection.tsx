import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  Lock, 
  Info,
  Sliders,
  TrendingUp,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  onRequestAccess?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onRequestAccess }) => {
  const [selectedSku, setSelectedSku] = useState<string>('DSK-7841-BLK');
  const [livePulsing, setLivePulsing] = useState<boolean>(true);

  const inventoryRows = [
    { sku: 'DSK-7841-BLK', warehouse: '4,820', buffer: '+340', available: '4,478', status: 'SYNCHRONIZED' },
    { sku: 'SBL-8004-GRY', warehouse: '1,290', buffer: '+94', available: '1,194', status: 'SYNCHRONIZED' },
    { sku: 'WID-4581-WHT', warehouse: '8,455', buffer: '+310', available: '8,145', status: 'SYNCHRONIZED' },
    { sku: 'TBL-9921-BRN', warehouse: '420', buffer: '+26', available: '394', status: 'SYNCHRONIZED' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestAccess = () => {
    if (onRequestAccess) {
      onRequestAccess();
    } else {
      scrollTo('cta-section');
    }
  };

  return (
    <section className="hero-landing-section" id="platform">
      <div className="hero-grid-container">
        {/* Left Column: Copy & Actions */}
        <div className="hero-left-column">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow-pill">
            <span className="dot-green-glow" />
            <span className="eyebrow-label">Enterprise Multi-Channel Inventory</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline-title">
            Coordinate your inventory, sales channels, and fulfillment from{' '}
            <span className="word-highlight-blue">one</span>{' '}
            <span className="word-underline-engine">engine.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description-text">
            Manage stock buffers, catch oversell exceptions, sync real-time sales channels, and automate WMS updates from one centralized ledger.
          </p>

          {/* Evaluation Form / Pill Card */}
          <div className="evaluation-card-pill" onClick={handleRequestAccess}>
            <div className="evaluation-left-info">
              <span className="eval-heading">Start Your 14-Day Free Evaluation</span>
              <span className="eval-subtext">Explore OmniSync live. No ERP downtime required.</span>
            </div>
            <div className="evaluation-soc2-badge">
              <span className="soc-text">SOC-2 Type II</span>
              <Sliders size={13} className="soc-icon" />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="hero-action-buttons">
            <button 
              type="button" 
              className="btn-hero-primary"
              onClick={handleRequestAccess}
            >
              Request Access
            </button>

            <button 
              type="button" 
              className="btn-hero-secondary"
              onClick={() => scrollTo('pipeline')}
            >
              <span>View Architecture</span>
              <ArrowRight size={14} className="arrow-icon" />
            </button>
          </div>

          {/* Trust Checklist Row */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <ShieldCheck size={14} className="trust-icon" />
              <span>Zero overselling guarantee</span>
            </div>
            <span className="trust-dot">•</span>
            <div className="trust-item">
              <Zap size={14} className="trust-icon" />
              <span>Sub-second event sync</span>
            </div>
            <span className="trust-dot">•</span>
            <div className="trust-item">
              <RotateCcw size={14} className="trust-icon" />
              <span>Full ledger replay</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Browser Window Mockup */}
        <div className="hero-right-column">
          <div className="mockup-window-frame">
            {/* Window Title Bar */}
            <div className="window-header-bar">
              <div className="mac-dots-trio">
                <span className="mac-dot red" />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>

              <div 
                className="window-url-capsule"
                onClick={() => onNavigate('/overview')}
                title="Launch Live Workspace"
                style={{ cursor: 'pointer' }}
              >
                <Lock size={11} className="url-lock-icon" />
                <span className="url-address-text font-mono">app.omnisync.inline/ledger</span>
              </div>

              <button 
                type="button" 
                className="live-demo-pill-btn"
                onClick={() => {
                  setLivePulsing(!livePulsing);
                  onNavigate('/overview');
                }}
                title="Launch Live Demo Workspace"
              >
                <span className={`live-dot ${livePulsing ? 'active' : ''}`} />
                <span>Live demo - sample</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="window-metrics-strip font-mono">
              <div className="metric-cell">
                <span className="metric-tag">ACTIVE CHANNELS</span>
                <div className="metric-value-row">
                  <span className="metric-num">5 Live</span>
                  <span className="metric-badge-teal">+2</span>
                </div>
              </div>

              <div className="metric-cell">
                <span className="metric-tag">SYNC DRIFT</span>
                <div className="metric-value-row">
                  <span className="metric-num text-green">0.00ms</span>
                  <TrendingUp size={12} className="text-green" />
                </div>
              </div>

              <div className="metric-cell">
                <span className="metric-tag">SKU CONFLICTS</span>
                <div className="metric-value-row">
                  <span className="metric-num">0 Resolved</span>
                </div>
              </div>

              <div className="metric-cell">
                <span className="metric-tag">LEDGER INDEX</span>
                <div className="metric-value-row">
                  <span className="metric-num text-blue">99.999%</span>
                </div>
              </div>
            </div>

            {/* Main Window Body: Split View */}
            <div className="window-split-body">
              {/* Left Dark Sidebar */}
              <aside className="window-left-sidebar">
                <div className="sidebar-brand-top">
                  <div className="sidebar-brand-circle">
                    <Layers size={13} />
                  </div>
                  <span className="sidebar-brand-title font-mono">OMNISYNC 1-A</span>
                </div>

                <nav className="sidebar-nav-list font-mono">
                  <button type="button" className="side-nav-btn">
                    Overview
                  </button>
                  <button type="button" className="side-nav-btn active">
                    <span className="active-glow-bar" />
                    Master Ledger
                  </button>
                  <button type="button" className="side-nav-btn">
                    Channel Feeds
                  </button>
                  <button type="button" className="side-nav-btn">
                    Demand Buffer
                  </button>
                  <button type="button" className="side-nav-btn">
                    Exception Queue
                  </button>
                </nav>

                <div className="sidebar-bottom-status font-mono">
                  <span className="status-dot-green" />
                  <span>Cluster: us-east-1 - OK</span>
                </div>
              </aside>

              {/* Right Table View */}
              <main className="window-main-table-view">
                <table className="ledger-preview-table font-mono">
                  <thead>
                    <tr>
                      <th>SKU ID</th>
                      <th>WAREHOUSE</th>
                      <th>BUFFER</th>
                      <th>AVAILABLE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryRows.map((row) => (
                      <tr 
                        key={row.sku}
                        className={selectedSku === row.sku ? 'selected-row' : ''}
                        onClick={() => setSelectedSku(row.sku)}
                      >
                        <td className="sku-id-cell">{row.sku}</td>
                        <td className="num-cell">{row.warehouse}</td>
                        <td className="buffer-cell text-blue">{row.buffer}</td>
                        <td className="num-cell bold">{row.available}</td>
                        <td>
                          <span className="badge-synchronized-pill">
                            SYNCHRONIZED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bottom Alert Banner inside window */}
                <div className="window-alert-banner">
                  <div className="alert-content-row">
                    <Info size={14} className="alert-info-icon" />
                    <span className="alert-message-text">
                      <strong>Auto-Balanced:</strong> TikTok Flash sale order concurrency lock engaged! Without overselling.
                    </span>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-landing-section {
          background-color: #F8FAFC;
          background-image: 
            radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(204, 251, 241, 0.35) 0px, transparent 50%);
          padding: 64px 0 76px;
          border-bottom: 1px solid #E2E8F0;
        }

        .hero-grid-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: 44px;
          align-items: center;
        }

        /* Left Column */
        .hero-left-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 13px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          margin-bottom: 22px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .dot-green-glow {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .eyebrow-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          color: #334155;
          letter-spacing: 0.02em;
        }

        .hero-headline-title {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 52px;
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #0F172A;
          margin-bottom: 18px;
        }

        .word-highlight-blue {
          color: #2563EB;
          font-weight: 800;
        }

        .word-underline-engine {
          text-decoration: underline;
          text-decoration-color: #2563EB;
          text-decoration-thickness: 3px;
          text-underline-offset: 6px;
        }

        .hero-description-text {
          font-size: 15.5px;
          line-height: 1.6;
          color: #475569;
          max-width: 500px;
          margin-bottom: 26px;
        }

        /* Evaluation Card Pill */
        .evaluation-card-pill {
          width: 100%;
          max-width: 480px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 22px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .evaluation-card-pill:hover {
          border-color: #CBD5E1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }

        .evaluation-left-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .eval-heading {
          font-size: 13.5px;
          font-weight: 700;
          color: #0F172A;
        }

        .eval-subtext {
          font-size: 11.5px;
          color: #64748B;
        }

        .evaluation-soc2-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 4px 10px;
          border-radius: 9999px;
        }

        .soc-text {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          color: #334155;
        }

        .soc-icon {
          color: #64748B;
        }

        /* Action Buttons */
        .hero-action-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .btn-hero-primary {
          height: 44px;
          padding: 0 24px;
          background-color: #0A0F1D;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .btn-hero-primary:hover {
          background-color: #1E293B;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(10, 15, 29, 0.2);
        }

        .btn-hero-secondary {
          height: 44px;
          padding: 0 20px;
          background-color: #FFFFFF;
          color: #334155;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-hero-secondary:hover {
          background-color: #F8FAFC;
          border-color: #CBD5E1;
          color: #0F172A;
        }

        .arrow-icon {
          transition: transform 0.15s ease;
        }

        .btn-hero-secondary:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Trust Row */
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #475569;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .trust-icon {
          color: #0D9488;
        }

        .trust-dot {
          color: #CBD5E1;
        }

        /* Right Column Mockup */
        .hero-right-column {
          display: flex;
          justify-content: center;
        }

        .mockup-window-frame {
          width: 100%;
          max-width: 610px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04);
        }

        .window-header-bar {
          background-color: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .mac-dots-trio {
          display: flex;
          gap: 6px;
        }

        .mac-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .mac-dot.red { background-color: #EF4444; }
        .mac-dot.yellow { background-color: #F59E0B; }
        .mac-dot.green { background-color: #10B981; }

        .window-url-capsule {
          flex: 1;
          max-width: 250px;
          margin: 0 auto;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          padding: 3px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .url-lock-icon {
          color: #64748B;
        }

        .url-address-text {
          font-size: 11px;
          color: #475569;
        }

        .live-demo-pill-btn {
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 9999px;
          padding: 3px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 11px;
          font-weight: 600;
          color: #047857;
          cursor: pointer;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .live-dot.active {
          box-shadow: 0 0 6px #10B981;
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* Metrics Strip */
        .window-metrics-strip {
          background-color: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          padding: 12px 18px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .metric-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-tag {
          font-size: 9px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.04em;
        }

        .metric-value-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .metric-num {
          font-size: 13.5px;
          font-weight: 700;
          color: #0F172A;
        }

        .metric-num.text-green { color: #059669; }
        .metric-num.text-blue { color: #2563EB; }

        .metric-badge-teal {
          font-size: 9px;
          font-weight: 700;
          background-color: #CCFBF1;
          color: #0F766E;
          padding: 1px 4px;
          border-radius: 3px;
        }

        /* Window Split Body */
        .window-split-body {
          display: grid;
          grid-template-columns: 140px 1fr;
          min-height: 250px;
        }

        /* Dark Sidebar */
        .window-left-sidebar {
          background-color: #0B1329;
          padding: 14px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #1E293B;
        }

        .sidebar-brand-top {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          padding-left: 4px;
        }

        .sidebar-brand-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #0D9488;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-brand-title {
          font-size: 10px;
          font-weight: 700;
          color: #E2E8F0;
          letter-spacing: 0.03em;
        }

        .sidebar-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .side-nav-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          font-family: inherit;
          font-size: 10px;
          font-weight: 500;
          text-align: left;
          padding: 6px 8px;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.15s ease;
        }

        .side-nav-btn:hover {
          color: #F8FAFC;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .side-nav-btn.active {
          color: #38BDF8;
          background-color: rgba(56, 189, 248, 0.12);
          font-weight: 600;
        }

        .active-glow-bar {
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 2px;
          background-color: #38BDF8;
          border-radius: 2px;
        }

        .sidebar-bottom-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          color: #94A3B8;
          padding-left: 4px;
          border-top: 1px solid #1E293B;
          padding-top: 10px;
        }

        .status-dot-green {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #10B981;
        }

        /* Right Table View */
        .window-main-table-view {
          background-color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ledger-preview-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10.5px;
        }

        .ledger-preview-table thead th {
          background-color: #FAFAFA;
          color: #64748B;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-align: left;
          padding: 8px 12px;
          border-bottom: 1px solid #F1F5F9;
        }

        .ledger-preview-table tbody tr {
          border-bottom: 1px solid #F8FAFC;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .ledger-preview-table tbody tr:hover {
          background-color: #F8FAFC;
        }

        .ledger-preview-table tbody tr.selected-row {
          background-color: #F0FDF4;
        }

        .ledger-preview-table td {
          padding: 8px 12px;
          color: #334155;
        }

        .sku-id-cell {
          font-weight: 600;
          color: #0F172A;
        }

        .num-cell {
          color: #475569;
        }

        .num-cell.bold {
          font-weight: 700;
          color: #0F172A;
        }

        .buffer-cell {
          font-weight: 600;
        }

        .buffer-cell.text-blue { color: #2563EB; }

        .badge-synchronized-pill {
          display: inline-block;
          font-size: 8.5px;
          font-weight: 700;
          color: #059669;
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        /* Bottom Alert Banner inside window */
        .window-alert-banner {
          background-color: #ECFDF5;
          border-top: 1px solid #A7F3D0;
          padding: 9px 14px;
        }

        .alert-content-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-info-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .alert-message-text {
          font-size: 10px;
          color: #065F46;
          line-height: 1.4;
        }

        @media (max-width: 960px) {
          .hero-grid-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-headline-title {
            font-size: 40px;
          }
          .hero-right-column {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .window-split-body {
            grid-template-columns: 1fr;
          }
          .window-left-sidebar {
            display: none;
          }
          .window-metrics-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
