import React, { useState, useEffect } from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingFooter } from '../components/landing/LandingFooter';
import { 
  Zap, 
  ShieldCheck, 
  GitBranch, 
  Sliders, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRight,
  Database,
  Search,
  FileCode
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [simulating, setSimulating] = useState(false);
  const [_simulated, setSimulated] = useState(false);
  const [retried, setRetried] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    document.title = "How It Works — omnisync.core";
  }, []);

  const handleSimulatePipeline = () => {
    setSimulating(true);
    setSimulated(false);
    setTimeout(() => {
      setSimulating(false);
      setSimulated(true);
    }, 1200);
  };

  const handleRetryPayload = () => {
    setRetried(true);
    setTimeout(() => setRetried(false), 3000);
  };

  const pipelineSteps = [
    {
      stageNum: '01',
      stageLabel: 'EVENT RECORD',
      title: 'Inventory Event',
      desc: 'Webhook trigger, REST payload, or scheduled warehouse pull arrives from external source.',
      bottomTag: 'TRIGGER: WMS / Webhook',
      icon: <Zap size={18} />,
    },
    {
      stageNum: '02',
      stageLabel: 'AUTH & VERIFY',
      title: 'Identify Channel',
      desc: 'Decrypt payload header, validate HMAC signature, and resolve target channel credentials.',
      bottomTag: 'AUTH: HMAC Verified',
      icon: <ShieldCheck size={18} />,
    },
    {
      stageNum: '03',
      stageLabel: 'SKU RESOLUTION',
      title: 'Match SKU',
      desc: 'Translate channel-specific item code (SKU-102-RED-M) to universal master identity (Cargo_Black_Hoodie).',
      bottomTag: 'TRANSLATION: Found 1 Match',
      icon: <GitBranch size={18} />,
    },
    {
      stageNum: '04',
      stageLabel: 'ALLOCATION RULES',
      title: 'Validate Update',
      desc: 'Evaluate safety buffer thresholds, enforce reservation limits, and check regional multi-warehouse balances.',
      bottomTag: 'SAFETY RULE: Satisfy >50',
      icon: <Sliders size={18} />,
    },
    {
      stageNum: '05',
      stageLabel: 'BROADCAST',
      title: 'Synchronize',
      desc: 'Stream update to all remaining active channel endpoints simultaneously (Shopify, Amazon, TikTok, POS).',
      bottomTag: 'TARGET: 32 Endpoints',
      icon: <RefreshCw size={18} />,
    },
    {
      stageNum: '06',
      stageLabel: 'STATE MONITOR',
      title: 'Monitor Exceptions',
      desc: 'Catch sync failures, rate limit exhaustion, or schema payload errors, and route to DLQ for automated recovery.',
      bottomTag: 'STATUS: No Exceptions / Logged',
      icon: <AlertTriangle size={18} />,
    },
  ];

  return (
    <div className="how-it-works-root">
      <LandingNavbar onNavigate={onNavigate} />

      <main>
        {/* Hero Section */}
        <section className="hiw-hero-section">
          <div className="hiw-container">
            <div className="hiw-hero-badge font-mono">
              <span className="dot-green-pulse" />
              <span>HOW IT WORKS</span>
              <span className="divider">•</span>
              <span>END-TO-END EVENT FLOW</span>
            </div>

            <h1 className="hiw-main-heading">
              From inventory events to operational clarity.
            </h1>

            <p className="hiw-main-subtitle">
              Follow the path of an inventory update through channel identification, SKU matching, synchronization, and exception monitoring.
            </p>

            <div className="hiw-hero-actions">
              <button 
                type="button" 
                className="btn-dark-primary"
                onClick={() => {
                  const el = document.getElementById('pipeline');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Request Early Access</span>
                <ArrowRight size={14} />
              </button>

              <button 
                type="button" 
                className="btn-light-secondary"
                onClick={() => {
                  const el = document.getElementById('pipeline');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play size={14} />
                <span>Explore 6-Step Feature</span>
              </button>
            </div>

            {/* 4 Stat Badges Row */}
            <div className="hiw-stats-grid font-mono">
              <div className="hiw-stat-card">
                <span className="stat-label">AVERAGE SYNC LATENCY</span>
                <span className="stat-value">116ms</span>
                <span className="stat-sub">Real-Time Engine</span>
              </div>

              <div className="hiw-stat-card">
                <span className="stat-label">EVENT THROUGHPUT</span>
                <span className="stat-value">17,294/min</span>
                <span className="stat-sub">Channels Distributed</span>
              </div>

              <div className="hiw-stat-card">
                <span className="stat-label">PARITY GUARANTEE</span>
                <span className="stat-value">99.99%</span>
                <span className="stat-sub">Zero-Drift Execution</span>
              </div>

              <div className="hiw-stat-card">
                <span className="stat-label">STATE RECOVERY</span>
                <span className="stat-value">&lt;1.2s</span>
                <span className="stat-sub">Auto-Retry Loop</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The 6-Step Invariant Pipeline */}
        <section className="hiw-pipeline-section" id="pipeline">
          <div className="hiw-container">
            <div className="section-header-flex">
              <div>
                <span className="pill-badge-light font-mono">ISOLATED PIPELINE</span>
                <h2 className="section-heading-exact">The 6-Step Invariant Pipeline</h2>
              </div>
              <div className="header-actions font-mono">
                <span className="trace-code-tag">Trace Oversold: #TRC-1029-87590</span>
                <button 
                  type="button" 
                  className={`btn-simulate-flow ${simulating ? 'loading' : ''}`}
                  onClick={handleSimulatePipeline}
                >
                  <Play size={12} />
                  <span>{simulating ? 'Executing Pipeline...' : 'Simulate Flow'}</span>
                </button>
              </div>
            </div>

            {/* 6 Step Pipeline Cards */}
            <div className="pipeline-grid-6">
              {pipelineSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`pipeline-stage-card ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="card-stage-header">
                    <span className="stage-number font-mono">STAGE {step.stageNum}</span>
                    <div className="stage-icon-box">{step.icon}</div>
                  </div>

                  <span className="stage-label-tag font-mono">{step.stageLabel}</span>
                  <h3 className="stage-title">{step.title}</h3>
                  <p className="stage-desc">{step.desc}</p>

                  <div className="stage-bottom-tag font-mono">
                    <span className="dot-tiny" />
                    <span>{step.bottomTag}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Simulation Console Bar */}
            <div className="simulated-bar-console font-mono">
              <div className="sim-left font-mono">
                <CheckCircle2 size={16} className="icon-green-check" />
                <span>Simulated Pipeline Execution</span>
                <span className="sim-sub">Events processed seamlessly across 32 active channel endpoints in 116ms.</span>
              </div>
              <div className="sim-right">
                <span className="sim-sku">SKU-88291-HOOD</span>
                <span className="sim-time">LAST SYNC: 12ms ago</span>
                <span className="sim-status green">100% Parity</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Every step has a clear place (State Inspection) */}
        <section className="hiw-inspection-section">
          <div className="hiw-container">
            <div className="inspection-grid">
              {/* Left Column */}
              <div className="inspection-left-col">
                <span className="pill-badge-light font-mono">STATE INSPECTION</span>
                <h2 className="section-heading-exact">Every step has a clear place.</h2>
                <p className="section-desc-exact">
                  In high-velocity multi-channel selling, single-threaded sync loops cause customer friction, overselling, and erroneous cancellations. OmniSync Core isolates state mutations into discrete, inspectable steps.
                </p>

                <div className="check-bullets-group">
                  <div className="check-item-row">
                    <CheckCircle2 size={18} className="icon-green-check" />
                    <div>
                      <h4 className="check-title">State Mutation Traces</h4>
                      <p className="check-desc">Every stage creates an immutable event log trace detailing exactly when and why inventory mutated.</p>
                    </div>
                  </div>

                  <div className="check-item-row">
                    <CheckCircle2 size={18} className="icon-green-check" />
                    <div>
                      <h4 className="check-title">Polymorphic SKU Translation</h4>
                      <p className="check-desc">Canonical mappings accommodate legacy SKUs, reseller codes, and 3PL supplier equivalents without manual edits.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live State Logger Window */}
              <div className="inspection-right-col">
                <div className="logger-card-frame">
                  <div className="logger-header-bar font-mono">
                    <div className="logger-title-row">
                      <span className="dot-green" />
                      <span>STATE LOGGER • COMMERCIAL MARKET</span>
                    </div>
                    <span className="logger-meta">SHOW LOGS [12/12]</span>
                  </div>

                  <div className="logger-rows-list font-mono">
                    <div className="logger-row">
                      <span className="log-sku">SKU-88291</span>
                      <span className="log-channel">Shopify Warehouse Availability</span>
                      <span className="log-status ok">Active • 0 errors • Pushed: 2s ago</span>
                    </div>

                    <div className="logger-row">
                      <span className="log-sku">SKU-88291</span>
                      <span className="log-channel">Amazon US - Buy Box - Master SKU</span>
                      <span className="log-status ok">Sync Success • 14ms • Pushed: 2s ago</span>
                    </div>

                    <div className="logger-row">
                      <span className="log-sku">SKU-88291</span>
                      <span className="log-channel">TikTok Shop US</span>
                      <span className="log-status ok">Sync Success • Pushed: 2s ago</span>
                    </div>
                  </div>

                  <div className="logger-footer-card">
                    <div className="footer-stock-info">
                      <span className="stock-label font-mono">TOTAL GLOBAL AVAILABLE STOCK COUNT</span>
                      <span className="stock-val">1,372 Units</span>
                    </div>
                    <div className="sparkline-bar-visual font-mono">
                      <span className="spark-line-fill" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Failure Isolation & Exceptions */}
        <section className="hiw-fault-section">
          <div className="hiw-container">
            <div className="fault-header-row">
              <div>
                <span className="pill-badge-red font-mono">FAULT ISOLATION ENGINE</span>
                <h2 className="section-heading-exact">When something fails, make it visible.</h2>
                <p className="section-desc-exact">
                  Silent desynchronization causes massive stockouts. OmniSync isolates failing endpoints instantly, guarantees that safe buffers lock into holding states, and provides granular manual or autonomous remediations.
                </p>
              </div>
              <div className="fault-meta-badge font-mono">
                <span className="dot-red-pulse" />
                <span>FAILSAFE ACTIVE: BUFFER LOCKED</span>
              </div>
            </div>

            {/* Deep Exception Inspector Card */}
            <div className="deep-exception-card">
              <div className="exception-card-topbar font-mono">
                <div className="topbar-left">
                  <span className="dot-red" />
                  <span className="bold">DEVENT TRACE #9941</span>
                  <span className="divider">|</span>
                  <span className="exc-code">EXCEPTION EXC-2041</span>
                </div>
                <div className="topbar-right">
                  <span className="action-tag red">ACTION REQUIRED: RETRY/RESOLVE</span>
                  <span className="timestamp font-mono">12:44:02 PM • UTC-05</span>
                </div>
              </div>

              <div className="exception-card-body">
                {/* Left Breakdown */}
                <div className="exc-detail-col">
                  <span className="exc-eyebrow font-mono">REF: EXC-2041 / TIMEOUT</span>
                  <h3 className="exc-title">API Timeout on channel endpoint during Flash Sale spike</h3>
                  <p className="exc-desc">
                    Shopify US endpoint connection timed out after 3000ms latency window. The endpoint was placed on quarantine backoff to protect physical buffer integrity.
                  </p>

                  <div className="exc-grid-metrics font-mono">
                    <div className="metric-box">
                      <span className="m-lbl">Target SKU</span>
                      <span className="m-val">MASTER-1042</span>
                      <span className="m-sub">Cotton Hoodie Black</span>
                    </div>

                    <div className="metric-box">
                      <span className="m-lbl">PHYSICAL BUFFER</span>
                      <span className="m-val red">2,420 (50 Locked)</span>
                      <span className="m-sub">Reserved sub-pool: 50 units</span>
                    </div>

                    <div className="metric-box">
                      <span className="m-lbl">ERROR CODE</span>
                      <span className="m-val">HTTP 504 (Timeout)</span>
                      <span className="m-sub">Request timed out after 3 retries</span>
                    </div>
                  </div>

                  {/* Raw Event Log Code Snippet */}
                  <div className="raw-log-codeblock font-mono">
                    <p className="log-code-line">[12:44:02.102] POST /v1/channels/shopify/inventory -&gt; TIMEOUT (3000ms)</p>
                    <p className="log-code-line">[12:44:02.105] Retry 1/3 failed... Retry 2/3 failed...</p>
                    <p className="log-code-line highlight-red">[12:44:02.110] FATAL: Buffer Safety Lock activated. Exception EXC-2041 quarantined.</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="exc-action-buttons">
                    <button 
                      type="button" 
                      className="btn-retry-sync"
                      onClick={handleRetryPayload}
                    >
                      <RotateCcw size={13} />
                      <span>{retried ? 'Payload Retried Successfully!' : 'Retry Sync Payload'}</span>
                    </button>
                    <button type="button" className="btn-resync-all">
                      Re-Sync All Endpoints
                    </button>
                    <button type="button" className="btn-release-buffer">
                      Release Safety Buffer
                    </button>
                  </div>
                </div>

                {/* Right Visual Frame */}
                <div className="exc-visual-col">
                  <div className="dark-terminal-mockup font-mono">
                    <div className="term-header">
                      <span className="term-dot red" />
                      <span className="term-dot yellow" />
                      <span className="term-dot green" />
                      <span className="term-title">ENDPOINT DIAGNOSTICS</span>
                    </div>
                    <div className="term-body font-mono">
                      <p className="t-green">&gt; omni-cli exception trace EXC-2041</p>
                      <p className="t-gray">Fetching payload diagnostics for channel node shopify_us_primary...</p>
                      <p className="t-yellow">STATUS: QUARANTINED (504_TIMEOUT)</p>
                      <p className="t-gray">Buffer state: LOCKED (50 units held)</p>
                      <p className="t-green">&gt; Retry policy: EXPONENTIAL_BACKOFF [60s, 120s, 300s]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Enterprise Traceability & Controls */}
        <section className="hiw-enterprise-section">
          <div className="hiw-container">
            <div className="section-header text-center">
              <span className="pill-badge-light font-mono">ENTERPRISE RELIABILITY</span>
              <h2 className="section-heading-exact">Designed for operational control.</h2>
              <p className="section-desc-exact center">
                OmniSync Core equips enterprise inventory teams with uncompromising traceability and deterministic tools to audit every single SKU balance across dozens of sales channels.
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="enterprise-cards-grid-4">
              <div className="ent-card">
                <div className="ent-card-icon-box"><FileCode size={18} /></div>
                <h3 className="ent-card-title">Immutable Audit Logs</h3>
                <p className="ent-card-desc">Full record of every transaction, API payload, and user action with timestamps for accountability.</p>
              </div>

              <div className="ent-card">
                <div className="ent-card-icon-box"><Database size={18} /></div>
                <h3 className="ent-card-title">Deterministic State Parity</h3>
                <p className="ent-card-desc">Constant verification between warehouse physical count and channel available count to ensure zero drift.</p>
              </div>

              <div className="ent-card">
                <div className="ent-card-icon-box"><RefreshCw size={18} /></div>
                <h3 className="ent-card-title">Automated Recovery Options</h3>
                <p className="ent-card-desc">Fallback policies automatically trigger retries or route failed sync payloads to dead-letter queues.</p>
              </div>

              <div className="ent-card">
                <div className="ent-card-icon-box"><Search size={18} /></div>
                <h3 className="ent-card-title">Deep Traceability</h3>
                <p className="ent-card-desc">Inspect event traces down to raw payload JSON payloads from channel webhooks to WMS API calls.</p>
              </div>
            </div>

            {/* Zero-Time Recovery Banner with Logistics Image */}
            <div className="zero-time-recovery-banner">
              <div className="banner-image-col">
                <img 
                  src="/logistics_ops_team.png" 
                  alt="Logistics Operations Team" 
                  className="banner-ops-img"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if file loading fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="banner-text-col">
                <span className="pill-badge-light font-mono">ZERO-TIME RECOVERY</span>
                <h3 className="banner-heading">Every channel delta can be replayed from genesis.</h3>
                <p className="banner-desc">
                  When reconnecting a disconnected store or setting up a new API integration, you can trigger historical transaction replays to sync state instantly across all storefronts.
                </p>
                <div className="banner-check-row font-mono">
                  <span className="b-check">✓ 100% Deterministic Event Stream</span>
                  <span className="b-check">✓ CDC + System Replays</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Final CTA Banner */}
        <section className="hiw-final-cta-section" id="early-access">
          <div className="hiw-container text-center">
            <span className="pill-badge-light font-mono">START USING OMNISYNC</span>
            <h2 className="cta-heading-exact">
              Make complex inventory workflows easier to understand.
            </h2>
            <p className="cta-subtitle-exact">
              Stop guessing which channel failed. Give your operations team deterministic visibility across every stock point.
            </p>

            <div className="cta-buttons-row">
              <button 
                type="button" 
                className="btn-dark-primary lg"
                onClick={() => onNavigate('/overview')}
              >
                <span>Request Early Access</span>
                <ArrowRight size={15} />
              </button>
              <button 
                type="button" 
                className="btn-light-secondary lg"
                onClick={() => onNavigate('/overview')}
              >
                <Play size={15} />
                <span>Launch Demonstration System</span>
              </button>
            </div>

            <div className="cta-checkmarks-row font-mono">
              <span>✓ 14-Day Free Trial</span>
              <span>✓ 5-Minute Installation</span>
              <span>✓ Zero Maintenance Required</span>
              <span>✓ No Credit Card Required</span>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .how-it-works-root {
          min-height: 100vh;
          background-color: #F8F9FA;
          color: #111827;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
        }

        .hiw-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section */
        .hiw-hero-section {
          padding: 72px 0 60px;
          background-color: #F8F9FA;
          border-bottom: 1px solid #E5E7EB;
        }

        .hiw-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          color: #4B5563;
          background-color: #E5E7EB;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .dot-green-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .hiw-main-heading {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.12;
          color: #111827;
          max-width: 780px;
          margin-bottom: 16px;
        }

        .hiw-main-subtitle {
          font-size: 16.5px;
          line-height: 1.55;
          color: #4B5563;
          max-width: 680px;
          margin-bottom: 32px;
        }

        .hiw-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 48px;
        }

        .btn-dark-primary {
          height: 42px;
          padding: 0 20px;
          background-color: #000000;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-size: 13.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .btn-dark-primary:hover { background-color: #1F2937; }

        .btn-dark-primary.lg { height: 46px; padding: 0 24px; font-size: 14px; }

        .btn-light-secondary {
          height: 42px;
          padding: 0 20px;
          background-color: #FFFFFF;
          color: #374151;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 13.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-light-secondary:hover { background-color: #F3F4F6; border-color: #D1D5DB; }

        .btn-light-secondary.lg { height: 46px; padding: 0 24px; font-size: 14px; }

        .hiw-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .hiw-stat-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .stat-label { font-size: 9px; font-weight: 800; color: #6B7280; letter-spacing: 0.05em; }
        .stat-value { font-size: 22px; font-weight: 800; color: #111827; }
        .stat-sub { font-size: 10px; color: #059669; font-weight: 600; }

        /* Pipeline Section */
        .hiw-pipeline-section {
          padding: 80px 0;
          background-color: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
        }

        .section-header-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .pill-badge-light {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #6B7280;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .section-heading-exact {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trace-code-tag {
          font-size: 11px;
          color: #6B7280;
          background-color: #F3F4F6;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .btn-simulate-flow {
          height: 34px;
          padding: 0 14px;
          background-color: #111827;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .pipeline-grid-6 {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }

        .pipeline-stage-card {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pipeline-stage-card:hover, .pipeline-stage-card.active {
          background-color: #FFFFFF;
          border-color: #111827;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }

        .card-stage-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stage-number { font-size: 9px; font-weight: 800; color: #9CA3AF; }

        .stage-icon-box {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
        }

        .stage-label-tag {
          font-size: 9px;
          font-weight: 800;
          color: #059669;
          margin-bottom: 4px;
        }

        .stage-title {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
        }

        .stage-desc {
          font-size: 11.5px;
          color: #4B5563;
          line-height: 1.45;
          margin-bottom: 14px;
          flex-grow: 1;
        }

        .stage-bottom-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          color: #6B7280;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .dot-tiny {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .simulated-bar-console {
          background-color: #F8F9FA;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }

        .sim-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: #111827;
        }

        .sim-sub { font-weight: 400; color: #6B7280; margin-left: 8px; }

        .sim-right { display: flex; align-items: center; gap: 16px; font-size: 11px; }
        .sim-sku { color: #374151; font-weight: 700; }
        .sim-time { color: #6B7280; }
        .sim-status.green { color: #059669; font-weight: 800; }

        /* Inspection Section */
        .hiw-inspection-section {
          padding: 80px 0;
          background-color: #F8F9FA;
          border-bottom: 1px solid #E5E7EB;
        }

        .inspection-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
        }

        .section-desc-exact {
          font-size: 15.5px;
          line-height: 1.55;
          color: #4B5563;
          margin-bottom: 32px;
        }

        .check-bullets-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .check-item-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .icon-green-check { color: #10B981; flex-shrink: 0; margin-top: 2px; }

        .check-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 2px; }
        .check-desc { font-size: 13.5px; color: #4B5563; line-height: 1.45; }

        .logger-card-frame {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }

        .logger-header-bar {
          background-color: #F9FAFB;
          border-bottom: 1px solid #E5E7EB;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 700;
        }

        .logger-title-row { display: flex; align-items: center; gap: 8px; color: #111827; }
        .dot-green { width: 7px; height: 7px; border-radius: 50%; background-color: #10B981; }
        .logger-meta { color: #6B7280; }

        .logger-rows-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .logger-row {
          background-color: #F8F9FA;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }

        .log-sku { font-weight: 700; color: #111827; }
        .log-channel { color: #4B5563; }
        .log-status.ok { color: #059669; font-weight: 600; }

        .logger-footer-card {
          padding: 16px 18px;
          background-color: #F9FAFB;
          border-top: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stock-label { font-size: 9px; font-weight: 800; color: #6B7280; }
        .stock-val { font-size: 24px; font-weight: 800; color: #111827; }

        .sparkline-bar-visual {
          height: 6px;
          background-color: #E5E7EB;
          border-radius: 9999px;
          overflow: hidden;
        }

        .spark-line-fill {
          display: block;
          height: 100%;
          width: 82%;
          background-color: #10B981;
        }

        /* Fault Isolation Section */
        .hiw-fault-section {
          padding: 80px 0;
          background-color: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
        }

        .fault-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
        }

        .pill-badge-red {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          color: #DC2626;
          background-color: #FEE2E2;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .fault-meta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 800;
          color: #DC2626;
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .dot-red-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #EF4444;
          box-shadow: 0 0 8px #EF4444;
        }

        .deep-exception-card {
          background-color: #FFFFFF;
          border: 1px solid #FCA5A5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.06);
        }

        .exception-card-topbar {
          background-color: #FEF2F2;
          border-bottom: 1px solid #FCA5A5;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }

        .topbar-left { display: flex; align-items: center; gap: 8px; color: #991B1B; }
        .dot-red { width: 7px; height: 7px; border-radius: 50%; background-color: #EF4444; }
        .topbar-right { display: flex; align-items: center; gap: 14px; }
        .action-tag.red { font-weight: 800; color: #DC2626; }
        .timestamp { color: #6B7280; }

        .exception-card-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 24px;
        }

        .exc-eyebrow { font-size: 9px; font-weight: 800; color: #DC2626; margin-bottom: 4px; display: block; }
        .exc-title { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 8px; }
        .exc-desc { font-size: 14px; color: #4B5563; line-height: 1.5; margin-bottom: 20px; }

        .exc-grid-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .metric-box {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }

        .m-lbl { font-size: 9px; font-weight: 800; color: #6B7280; }
        .m-val { font-size: 13px; font-weight: 800; color: #111827; }
        .m-val.red { color: #DC2626; }
        .m-sub { font-size: 10px; color: #6B7280; }

        .raw-log-codeblock {
          background-color: #111827;
          border-radius: 8px;
          padding: 14px;
          font-size: 11px;
          color: #D1D5DB;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 20px;
        }

        .log-code-line.highlight-red { color: #FCA5A5; font-weight: 700; }

        .exc-action-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-retry-sync {
          height: 36px;
          padding: 0 16px;
          background-color: #111827;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn-resync-all {
          height: 36px;
          padding: 0 14px;
          background-color: #FFFFFF;
          color: #374151;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-release-buffer {
          height: 36px;
          padding: 0 14px;
          background-color: #FEF2F2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .dark-terminal-mockup {
          background-color: #0F172A;
          border: 1px solid #1E293B;
          border-radius: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .term-header {
          background-color: #1E293B;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .term-dot { width: 8px; height: 8px; border-radius: 50%; }
        .term-dot.red { background-color: #EF4444; }
        .term-dot.yellow { background-color: #F59E0B; }
        .term-dot.green { background-color: #10B981; }
        .term-title { font-size: 10px; font-weight: 800; color: #94A3B8; margin-left: 6px; }

        .term-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 11px;
        }

        .t-green { color: #34D399; }
        .t-gray { color: #94A3B8; }
        .t-yellow { color: #FBBF24; font-weight: 700; }

        /* Enterprise Section */
        .hiw-enterprise-section {
          padding: 80px 0;
          background-color: #F8F9FA;
          border-bottom: 1px solid #E5E7EB;
        }

        .section-desc-exact.center { text-align: center; max-width: 640px; margin: 0 auto 48px; }

        .enterprise-cards-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .ent-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .ent-card-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: #F3F4F6;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
          margin-bottom: 14px;
        }

        .ent-card-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 6px; }
        .ent-card-desc { font-size: 13px; color: #4B5563; line-height: 1.45; }

        .zero-time-recovery-banner {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }

        .banner-image-col { background-color: #111827; overflow: hidden; min-height: 280px; }
        .banner-ops-img { width: 100%; height: 100%; object-fit: cover; }

        .banner-text-col {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .banner-heading { font-size: 26px; font-weight: 800; color: #111827; margin-bottom: 12px; }
        .banner-desc { font-size: 14.5px; color: #4B5563; line-height: 1.55; margin-bottom: 20px; }
        .banner-check-row { display: flex; gap: 20px; font-size: 12px; color: #059669; font-weight: 700; }

        /* Final CTA Section */
        .hiw-final-cta-section {
          padding: 90px 0;
          background-color: #FFFFFF;
        }

        .cta-heading-exact {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 12px;
        }

        .cta-subtitle-exact {
          font-size: 16px;
          color: #4B5563;
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .cta-buttons-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .cta-checkmarks-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          font-size: 12px;
          color: #6B7280;
        }

        @media (max-width: 1024px) {
          .pipeline-grid-6 { grid-template-columns: repeat(3, 1fr); }
          .hiw-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .inspection-grid { grid-template-columns: 1fr; }
          .exception-card-body { grid-template-columns: 1fr; }
          .enterprise-cards-grid-4 { grid-template-columns: repeat(2, 1fr); }
          .zero-time-recovery-banner { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .pipeline-grid-6 { grid-template-columns: 1fr; }
          .hiw-stats-grid { grid-template-columns: 1fr; }
          .enterprise-cards-grid-4 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default HowItWorksPage;
