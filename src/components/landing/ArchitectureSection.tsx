import React from 'react';
import { ShieldCheck, Activity, Terminal, GitMerge } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="exact-architecture-section" id="architecture">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="pill-badge-light font-mono">ENGINEERED FOR SCALE</span>
          <h2 className="arch-exact-heading">
            Engineered for mission-critical operations.
          </h2>
          <p className="arch-exact-subtitle">
            Designed from the ground up for high-throughput e-commerce brands and multi-location logistics.
          </p>
        </div>

        {/* 2x2 Architectural Grid Cards */}
        <div className="arch-cards-grid-2x2">
          {/* Card 1: Physical vs. Buffered Stock Ledger */}
          <div className="arch-block-card">
            <div className="block-card-header">
              <div className="title-with-icon">
                <ShieldCheck size={18} className="card-header-icon" />
                <h3 className="block-title">Physical vs. Buffered Stock Ledger</h3>
              </div>
              <span className="pill-mono-tag font-mono">SOLVES OVERSELLING</span>
            </div>
            <p className="block-desc">
              Distinguishes between actual warehouse inventory and dynamic safety buffers to guarantee checkout safety during traffic spikes.
            </p>

            <div className="mini-table-box font-mono">
              <table className="mini-ledger-table">
                <thead>
                  <tr>
                    <th>STOCK CATEGORY</th>
                    <th>PHYSICAL</th>
                    <th>RESERVED</th>
                    <th>AVAILABLE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Master Pool</td>
                    <td>1,500 units</td>
                    <td>80 units</td>
                    <td className="avail-green">1,420 units</td>
                  </tr>
                  <tr>
                    <td>Buffer Threshold</td>
                    <td>50 units</td>
                    <td>0 units</td>
                    <td>50 units safe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Store & Rate-Limit Gauges */}
          <div className="arch-block-card">
            <div className="block-card-header">
              <div className="title-with-icon">
                <Activity size={18} className="card-header-icon" />
                <h3 className="block-title">Store & Rate-Limit Gauges</h3>
              </div>
              <span className="pill-mono-tag font-mono">AUTONOMOUS BACKOFF</span>
            </div>
            <p className="block-desc">
              Real-time rate-limit budget tracking across channel APIs prevents gateway blocks and throttled updates.
            </p>

            <div className="gauges-list font-mono">
              <div className="gauge-row">
                <div className="gauge-label-group">
                  <span className="g-name">Shopify Admin API</span>
                  <span className="g-val">34 / 40 req/s (85%)</span>
                </div>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill green" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="gauge-row">
                <div className="gauge-label-group">
                  <span className="g-name">Amazon SP-API</span>
                  <span className="g-val">12 / 30 req/s (40%)</span>
                </div>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill green" style={{ width: '40%' }} />
                </div>
              </div>

              <div className="gauge-row">
                <div className="gauge-label-group">
                  <span className="g-name">TikTok Shop Open API</span>
                  <span className="g-val">28 / 30 req/s (93%)</span>
                </div>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill amber" style={{ width: '93%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Live Stream Activity */}
          <div className="arch-block-card" id="documentation">
            <div className="block-card-header">
              <div className="title-with-icon">
                <Terminal size={18} className="card-header-icon" />
                <h3 className="block-title">Live Stream Activity</h3>
              </div>
              <span className="pill-mono-tag font-mono">REAL-TIME TRACE</span>
            </div>
            <p className="block-desc">
              Inspect live delta events, payload execution durations, and acknowledgement timestamps across all channel workers.
            </p>

            <div className="terminal-log-box font-mono">
              <div className="log-line">
                <span className="t-stamp">[08:34:12]</span>
                <span className="t-evt ok">DELTA_EXEC</span>
                <span className="t-txt">SKU-88291 quantity updated to 1,420</span>
              </div>
              <div className="log-line">
                <span className="t-stamp">[08:34:10]</span>
                <span className="t-evt ok">ACK_RECV</span>
                <span className="t-txt">Shopify US acknowledged payload (12ms)</span>
              </div>
              <div className="log-line">
                <span className="t-stamp">[08:34:08]</span>
                <span className="t-evt warn">REBAL_TRIG</span>
                <span className="t-txt">Buffer adjusted +20 units on TikTok</span>
              </div>
            </div>
          </div>

          {/* Card 4: Canonical SKU Mapping & Resolver */}
          <div className="arch-block-card">
            <div className="block-card-header">
              <div className="title-with-icon">
                <GitMerge size={18} className="card-header-icon" />
                <h3 className="block-title">Canonical SKU Mapping & Fast-Resolver</h3>
              </div>
              <span className="pill-mono-tag font-mono">FAST-RESOLVER</span>
            </div>
            <p className="block-desc">
              Map complex marketplace variant IDs back to single Master SKUs with automated exception fast-resolution.
            </p>

            <div className="mapping-mini-box font-mono">
              <div className="map-item-line">
                <span className="m-left">MASTER-88291-HOOD</span>
                <span className="m-arrow">→</span>
                <span className="m-right">SHP-HOOD-BLK-L (Shopify)</span>
              </div>
              <div className="map-item-line">
                <span className="m-left">MASTER-88291-HOOD</span>
                <span className="m-arrow">→</span>
                <span className="m-right">AMZ-B08912X4 (Amazon)</span>
              </div>
              <div className="map-item-line">
                <span className="m-left">MASTER-88291-HOOD</span>
                <span className="m-arrow">→</span>
                <span className="m-right">TT-VARIATION-991 (TikTok)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .exact-architecture-section {
          background-color: #FFFFFF;
          color: #111827;
          padding: 88px 0;
          border-bottom: 1px solid #E5E7EB;
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

        .arch-exact-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 10px;
        }

        .arch-exact-subtitle {
          font-size: 15.5px;
          color: #4B5563;
          max-width: 640px;
          margin: 0 auto 48px;
        }

        .arch-cards-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .arch-block-card {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .block-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header-icon {
          color: #111827;
        }

        .block-title {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
        }

        .pill-mono-tag {
          font-size: 9px;
          font-weight: 800;
          color: #4B5563;
          background-color: #E5E7EB;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .block-desc {
          font-size: 13.5px;
          color: #4B5563;
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .mini-table-box {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px;
        }

        .mini-ledger-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .mini-ledger-table th {
          text-align: left;
          color: #6B7280;
          padding-bottom: 6px;
          border-bottom: 1px solid #F3F4F6;
        }

        .mini-ledger-table td {
          padding: 6px 0;
          color: #111827;
        }

        .avail-green {
          color: #059669;
          font-weight: 700;
        }

        .gauges-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px;
        }

        .gauge-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gauge-label-group {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
        }

        .g-name { color: #111827; font-weight: 600; }
        .g-val { color: #6B7280; }

        .gauge-bar-track {
          height: 6px;
          background-color: #F3F4F6;
          border-radius: 9999px;
          overflow: hidden;
        }

        .gauge-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }

        .gauge-bar-fill.green { background-color: #10B981; }
        .gauge-bar-fill.amber { background-color: #F59E0B; }

        .terminal-log-box {
          background-color: #111827;
          border-radius: 8px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 11px;
        }

        .log-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .t-stamp { color: #6B7280; }
        .t-evt { font-weight: 700; padding: 1px 4px; border-radius: 3px; font-size: 9px; }
        .t-evt.ok { background-color: rgba(16, 185, 129, 0.2); color: #10B981; }
        .t-evt.warn { background-color: rgba(245, 158, 11, 0.2); color: #F59E0B; }
        .t-txt { color: #E5E7EB; }

        .mapping-mini-box {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 11px;
        }

        .map-item-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .m-left { color: #059669; font-weight: 700; }
        .m-arrow { color: #9CA3AF; }
        .m-right { color: #374151; }

        @media (max-width: 960px) {
          .arch-cards-grid-2x2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ArchitectureSection;
