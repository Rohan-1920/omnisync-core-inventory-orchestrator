import React, { useState } from 'react';

export const EventArchitectureSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Cart Event',
      desc: 'Inbound webhook reservation timestamp key.',
      pill: 'EVENT ID: 3,294',
    },
    {
      num: '02',
      title: 'Deduplicate',
      desc: 'Verify transaction state and eliminate repeat requests.',
      pill: 'HASH VERIFIED',
    },
    {
      num: '03',
      title: 'Lock SKU',
      desc: 'Temporarily distributed atomic reservation locks inventory.',
      pill: 'REDIS LOCK: <4MS',
    },
    {
      num: '04',
      title: 'Verify Payment',
      desc: 'Order confirmed and captured across payment gateway.',
      pill: '$98.00 CAPTURED',
    },
    {
      num: '05',
      title: 'Commit Ledger',
      desc: 'Authoritative decrement recorded in ACID master ledger.',
      pill: 'ACID STATE: SYNC',
    },
    {
      num: '06',
      title: 'Fan-out Sync',
      desc: 'Broadcast stock delta to Amazon, TikTok, and POS channels.',
      pill: '5 CHANNELS: FAST',
    },
    {
      num: '07',
      title: 'Route to WMS',
      desc: 'Hand-off fulfilled order payload to 3PL logistics & WMS.',
      pill: 'ROUTED WMS',
    },
  ];

  return (
    <section className="event-architecture-section" id="pipeline">
      <div className="section-container">
        {/* Header */}
        <div className="section-header-group">
          <div className="section-eyebrow-pill">
            <span className="dot-blue-gem" />
            <span className="eyebrow-text font-mono">EVENT-DRIVEN ARCHITECTURE</span>
          </div>

          <h2 className="section-main-heading">
            One event from customer cart to warehouse dispatch.
          </h2>

          <p className="section-subtext">
            A single deterministic transaction pipeline guarantees zero inventory drift across your entire ecosystem.
          </p>
        </div>

        {/* 7-Step Pipeline Grid */}
        <div className="pipeline-steps-grid">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div 
                key={step.num}
                className={`pipeline-step-card ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Card Top: Number pill + Green status dot */}
                <div className="card-top-row">
                  <span className="step-num-pill font-mono">{step.num}</span>
                  <span className="status-dot-green" />
                </div>

                {/* Card Title & Desc */}
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                {/* Bottom Pill Badge */}
                <div className="step-pill-wrapper font-mono">
                  <span className="step-pill-badge">{step.pill}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .event-architecture-section {
          background-color: #F8FAFC;
          padding: 84px 0 92px;
          border-bottom: 1px solid #E2E8F0;
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .section-header-group {
          margin-bottom: 40px;
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
          font-size: 38px;
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

        /* 7 Steps Grid */
        .pipeline-steps-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
        }

        .pipeline-step-card {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          cursor: pointer;
        }

        .pipeline-step-card:hover, .pipeline-step-card.active {
          border-color: #93C5FD;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.08);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .step-num-pill {
          background-color: #2563EB;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          line-height: 1;
        }

        .status-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 5px #10B981;
        }

        .step-title {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .step-desc {
          font-size: 11.5px;
          line-height: 1.45;
          color: #64748B;
          flex-grow: 1;
          margin-bottom: 14px;
        }

        .step-pill-wrapper {
          display: flex;
        }

        .step-pill-badge {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 9.5px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pipeline-step-card:hover .step-pill-badge {
          background-color: #EFF6FF;
          border-color: #BFDBFE;
          color: #1D4ED8;
        }

        @media (max-width: 1100px) {
          .pipeline-steps-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pipeline-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section-main-heading {
            font-size: 30px;
          }
        }

        @media (max-width: 480px) {
          .pipeline-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default EventArchitectureSection;
