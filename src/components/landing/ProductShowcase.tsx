import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GitMerge, 
  AlertTriangle, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProductShowcaseProps {
  onNavigate: (path: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'mapping' | 'dlq'>('overview');
  const [retriedIds, setRetriedIds] = useState<string[]>([]);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const handleRetry = (id: string) => {
    if (retriedIds.includes(id)) return;
    setRetriedIds([...retriedIds, id]);
    setTimeout(() => {
      setResolvedIds([...resolvedIds, id]);
    }, 1500);
  };

  return (
    <section className="interactive-console-section" id="platform">
      <div className="section-container">
        <div className="section-header text-center">
          <div className="pill-badge-dark">
            <span className="pulse-dot-green" />
            <span>INTERACTIVE CONSOLE MODULES</span>
          </div>
          <h2 className="section-title">Authentic Product Workspace Modules</h2>
          <p className="section-subtitle">
            Explore the actual operational views built for multi-channel inventory managers: live overview stats, Master SKU matrix, and Dead-Letter Queue exception logs.
          </p>
        </div>

        {/* 3 Interactive Tab Buttons */}
        <div className="console-module-tabs">
          <button
            type="button"
            className={`module-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={15} />
            <span>Operational Overview</span>
          </button>

          <button
            type="button"
            className={`module-tab ${activeTab === 'mapping' ? 'active' : ''}`}
            onClick={() => setActiveTab('mapping')}
          >
            <GitMerge size={15} />
            <span>Master SKU Mapping Matrix</span>
          </button>

          <button
            type="button"
            className={`module-tab ${activeTab === 'dlq' ? 'active' : ''}`}
            onClick={() => setActiveTab('dlq')}
          >
            <AlertTriangle size={15} className="icon-red" />
            <span>DLQ Exception Logs</span>
            <span className="tab-badge-red">3 Isolated</span>
          </button>
        </div>

        {/* Console Container Frame */}
        <div className="console-window-frame">
          <div className="console-nav-strip">
            <span className="mono-path-text">
              {activeTab === 'overview' && 'omnisync.core/workspace/overview'}
              {activeTab === 'mapping' && 'omnisync.core/workspace/sku-mapping-matrix'}
              {activeTab === 'dlq' && 'omnisync.core/workspace/exceptions/dlq-logs'}
            </span>

            <button
              type="button"
              className="btn-launch-page"
              onClick={() => onNavigate(`/${activeTab === 'overview' ? 'overview' : activeTab === 'mapping' ? 'sku-mapping' : 'exceptions'}`)}
            >
              <span>Launch Live Workspace</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="console-window-body">
            {/* MODULE 1: Operational Overview */}
            {activeTab === 'overview' && (
              <div className="module-view-block">
                <div className="overview-stats-grid">
                  <div className="overview-stat-card">
                    <span className="stat-card-title">TOTAL SYNCED SKUS</span>
                    <span className="stat-card-val mono-val">1,420</span>
                    <span className="stat-card-sub highlight-green">100% Identity Mapped</span>
                  </div>

                  <div className="overview-stat-card">
                    <span className="stat-card-title">CONNECTED STORES</span>
                    <span className="stat-card-val mono-val">4 Active</span>
                    <span className="stat-card-sub">Shopify, Amazon, TikTok, Etsy</span>
                  </div>

                  <div className="overview-stat-card">
                    <span className="stat-card-title">AVERAGE PROPAGATION</span>
                    <span className="stat-card-val mono-val">12.4ms</span>
                    <span className="stat-card-sub highlight-green">Sub-15ms Target Met</span>
                  </div>

                  <div className="overview-stat-card">
                    <span className="stat-card-title">OPEN DLQ EXCEPTIONS</span>
                    <span className="stat-card-val mono-val highlight-red">3</span>
                    <span className="stat-card-sub">Requires Retry Trigger</span>
                  </div>
                </div>

                <div className="recent-activity-panel">
                  <h4 className="panel-title font-mono">LIVE ENGINE ACTIVITY FEED</h4>
                  <div className="feed-rows">
                    <div className="feed-row">
                      <span className="feed-time">[07:41:02]</span>
                      <span className="feed-tag ok">SYNC_OK</span>
                      <span className="feed-msg">MASTER-HOODIE-BLK quantity updated across 4 stores (14 available)</span>
                    </div>
                    <div className="feed-row">
                      <span className="feed-time">[07:40:48]</span>
                      <span className="feed-tag ok">LOCK_ACQUIRED</span>
                      <span className="feed-msg">PostgreSQL advisory lock granted for TX_8891 (1.1ms)</span>
                    </div>
                    <div className="feed-row">
                      <span className="feed-time">[07:40:12]</span>
                      <span className="feed-tag warn">DLQ_ROUTED</span>
                      <span className="feed-msg">EXC-2041: TikTok Shop HTTP 504 Gateway Timeout isolated to DLQ</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: Master SKU Mapping Matrix */}
            {activeTab === 'mapping' && (
              <div className="module-view-block">
                <div className="view-intro-row">
                  <div>
                    <h4 className="v-title">Master SKU Mapping Graph</h4>
                    <p className="v-desc">Central identity mapping linking disparate storefront SKUs to one inventory master.</p>
                  </div>
                  <span className="pill-mono-green">1,420 MAPPED VARIANTS</span>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="console-data-table">
                    <thead>
                      <tr>
                        <th>MASTER SKU</th>
                        <th>PRODUCT TITLE</th>
                        <th>STORE / CHANNEL</th>
                        <th>CHANNEL SKU</th>
                        <th>STOCK ALLOCATION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code className="code-green">MASTER-HOODIE-BLK</code></td>
                        <td>Heavyweight Hoodie (Black / L)</td>
                        <td>Shopify Main Store</td>
                        <td><code className="code-mono">SHOP-BLK-HD</code></td>
                        <td className="mono-val">14 units</td>
                        <td><span className="badge-ok"><ShieldCheck size={11} /> Mapped</span></td>
                      </tr>
                      <tr>
                        <td><code className="code-green">MASTER-HOODIE-BLK</code></td>
                        <td>Heavyweight Hoodie (Black / L)</td>
                        <td>Amazon US Hub</td>
                        <td><code className="code-mono">AMZ-BLK-HD</code></td>
                        <td className="mono-val">14 units</td>
                        <td><span className="badge-ok"><ShieldCheck size={11} /> Mapped</span></td>
                      </tr>
                      <tr>
                        <td><code className="code-green">MASTER-HOODIE-BLK</code></td>
                        <td>Heavyweight Hoodie (Black / L)</td>
                        <td>TikTok Shop US</td>
                        <td><code className="code-mono">TT-BLK-HD</code></td>
                        <td className="mono-val">14 units</td>
                        <td><span className="badge-ok"><ShieldCheck size={11} /> Mapped</span></td>
                      </tr>
                      <tr className="alert-row">
                        <td><code className="code-green">MASTER-TEE-WHT</code></td>
                        <td>Essential White Tee (M)</td>
                        <td>Etsy Europe Store</td>
                        <td><code className="code-mono">ETSY-TEE-WHT-VAR</code></td>
                        <td className="mono-val">48 units</td>
                        <td><span className="badge-warn"><AlertTriangle size={11} /> Unmapped Variant</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 3: DLQ Exception Logs */}
            {activeTab === 'dlq' && (
              <div className="module-view-block">
                <div className="view-intro-row">
                  <div>
                    <h4 className="v-title">Dead-Letter Queue (DLQ) Exception Logs</h4>
                    <p className="v-desc">Failed synchronization attempts caught and isolated for automated backoff retries.</p>
                  </div>
                  <span className="pill-mono-red">3 OPEN EXCEPTIONS</span>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="console-data-table">
                    <thead>
                      <tr>
                        <th>EXCEPTION ID</th>
                        <th>MASTER SKU</th>
                        <th>CHANNEL</th>
                        <th>FAILURE REASON</th>
                        <th>ATTEMPTS</th>
                        <th>ISOLATED AT</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={resolvedIds.includes('EXC-2041') ? 'row-resolved' : ''}>
                        <td><code className="code-mono">EXC-2041</code></td>
                        <td><code className="code-green">MASTER-HOODIE-BLK</code></td>
                        <td>TikTok Shop US</td>
                        <td><span className="reason-tag"><AlertTriangle size={11} /> HTTP 504 Gateway Timeout</span></td>
                        <td className="mono-val">3 / 5</td>
                        <td className="mono-val">12m ago</td>
                        <td>
                          {resolvedIds.includes('EXC-2041') ? (
                            <span className="resolved-text"><CheckCircle2 size={13} /> Resolved & Synced</span>
                          ) : retriedIds.includes('EXC-2041') ? (
                            <span className="retrying-text"><RotateCcw size={13} className="spin-icon" /> Retrying...</span>
                          ) : (
                            <button
                              type="button"
                              className="btn-retry-action"
                              onClick={() => handleRetry('EXC-2041')}
                            >
                              <RotateCcw size={12} /> Retry Event
                            </button>
                          )}
                        </td>
                      </tr>

                      <tr className={resolvedIds.includes('EXC-2042') ? 'row-resolved' : ''}>
                        <td><code className="code-mono">EXC-2042</code></td>
                        <td><code className="code-green">MASTER-TEE-WHT</code></td>
                        <td>Amazon US Hub</td>
                        <td><span className="reason-tag"><AlertTriangle size={11} /> Rate Limit Exceeded (429)</span></td>
                        <td className="mono-val">2 / 5</td>
                        <td className="mono-val">24m ago</td>
                        <td>
                          {resolvedIds.includes('EXC-2042') ? (
                            <span className="resolved-text"><CheckCircle2 size={13} /> Resolved & Synced</span>
                          ) : retriedIds.includes('EXC-2042') ? (
                            <span className="retrying-text"><RotateCcw size={13} className="spin-icon" /> Retrying...</span>
                          ) : (
                            <button
                              type="button"
                              className="btn-retry-action"
                              onClick={() => handleRetry('EXC-2042')}
                            >
                              <RotateCcw size={12} /> Retry Event
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .interactive-console-section {
          background-color: #0A0B0A;
          color: #F5F5F2;
          padding: 90px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .console-module-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 6px;
          background-color: #121412;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          max-width: fit-content;
          margin: 0 auto 32px;
        }

        .module-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          background: transparent;
          color: #727670;
          font-family: var(--font-family);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .module-tab:hover {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .module-tab.active {
          background-color: #1A1D1A;
          color: #FFFFFF;
          border-color: rgba(82, 234, 27, 0.3);
        }

        .tab-badge-red {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          background-color: rgba(239, 68, 68, 0.15);
          color: #FCA5A5;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .console-window-frame {
          background-color: #0E100E;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        .console-nav-strip {
          padding: 12px 20px;
          background-color: #141614;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mono-path-text {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: #52EA1B;
        }

        .btn-launch-page {
          background: transparent;
          border: none;
          color: #A4A7A1;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s ease;
        }

        .btn-launch-page:hover {
          color: #FFFFFF;
        }

        .console-window-body {
          padding: 24px;
        }

        .overview-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .overview-stat-card {
          background-color: #121412;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-card-title {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          color: #727670;
        }

        .stat-card-val {
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .stat-card-sub {
          font-size: 11px;
          color: #A4A7A1;
        }

        .highlight-green { color: #52EA1B; }
        .highlight-red { color: #FCA5A5; }

        .recent-activity-panel {
          background-color: #121412;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 18px;
        }

        .panel-title {
          font-size: 11px;
          font-weight: 700;
          color: #52EA1B;
          margin-bottom: 12px;
        }

        .feed-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feed-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .feed-time { color: #727670; }
        .feed-msg { color: #A4A7A1; }

        .feed-tag {
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 700;
        }

        .feed-tag.ok { background-color: rgba(82, 234, 27, 0.15); color: #52EA1B; }
        .feed-tag.warn { background-color: rgba(239, 68, 68, 0.15); color: #FCA5A5; }

        .view-intro-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .v-title { font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 2px; }
        .v-desc { font-size: 13px; color: #A4A7A1; }

        .table-responsive-wrapper { overflow-x: auto; }

        .console-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 12px;
        }

        .console-data-table th {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #727670;
          padding: 10px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .console-data-table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #F5F5F2;
        }

        .code-green { font-family: var(--font-mono); font-weight: 700; color: #52EA1B; }
        .code-mono { font-family: var(--font-mono); color: #FFFFFF; }
        .mono-val { font-family: var(--font-mono); color: #A4A7A1; }

        .badge-ok {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #52EA1B;
          background-color: rgba(82, 234, 27, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .badge-warn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #FCD34D;
          background-color: rgba(245, 158, 11, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .reason-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #FCA5A5;
          background-color: rgba(239, 68, 68, 0.12);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .btn-retry-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 4px;
          background-color: rgba(82, 234, 27, 0.15);
          color: #52EA1B;
          border: 1px solid rgba(82, 234, 27, 0.3);
          font-family: var(--font-family);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-retry-action:hover {
          background-color: #52EA1B;
          color: #051400;
        }

        .resolved-text { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: #52EA1B; font-weight: 700; }
        .retrying-text { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: #FCD34D; }
        .spin-icon { animation: spin 1s linear infinite; }

        @media (max-width: 900px) {
          .overview-stats-grid { grid-template-columns: 1fr 1fr; }
          .console-module-tabs { flex-direction: column; width: 100%; }
        }
      `}</style>
    </section>
  );
};
