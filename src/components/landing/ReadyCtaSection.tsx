import React from 'react';

interface ReadyCtaSectionProps {
  onNavigate?: (path: string) => void;
  onRequestAccess?: () => void;
}

export const ReadyCtaSection: React.FC<ReadyCtaSectionProps> = ({ onNavigate, onRequestAccess }) => {
  const handleScheduleClick = () => {
    if (onNavigate) {
      onNavigate('/overview');
    }
  };

  const handleRequestClick = () => {
    if (onRequestAccess) {
      onRequestAccess();
    } else if (onNavigate) {
      onNavigate('/overview');
    }
  };

  return (
    <section className="ready-cta-section" id="cta-section">
      <div className="section-container">
        <div className="dark-cta-card-box">
          {/* Eyebrow Pill */}
          <div className="cta-eyebrow-pill">
            <span className="dot-green-glow" />
            <span className="eyebrow-text font-mono">MISSION CRITICAL PERFORMANCE</span>
          </div>

          {/* Main Heading */}
          <h2 className="cta-headline">
            Ready to coordinate your commerce operations?
          </h2>

          {/* Subtitle */}
          <p className="cta-subtext">
            Eliminate stock discrepancies, prevent flash-sale overselling, and give your engineering team an unshakeable, deterministic inventory core.
          </p>

          {/* Action Buttons */}
          <div className="cta-buttons-row">
            <button 
              type="button" 
              className="btn-emerald-review"
              onClick={handleScheduleClick}
            >
              Schedule Architecture Review
            </button>

            <button 
              type="button" 
              className="btn-dark-request"
              onClick={handleRequestClick}
            >
              Request Access
            </button>
          </div>

          {/* Proof Points Strip */}
          <div className="cta-proof-points font-mono">
            <div className="proof-item">
              <span className="dot-indicator" />
              <span>Up to 50,000 writes/sec</span>
            </div>
            <div className="proof-item">
              <span className="dot-indicator" />
              <span>99.999% SLA availability</span>
            </div>
            <div className="proof-item">
              <span className="dot-indicator" />
              <span>Full SOC2 Type II report available</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ready-cta-section {
          background-color: #FFFFFF;
          padding: 80px 0 88px;
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .dark-cta-card-box {
          background: linear-gradient(180deg, #090E1D 0%, #0D162A 100%);
          border: 1px solid #1E293B;
          border-radius: 24px;
          padding: 68px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(10, 15, 29, 0.4);
          position: relative;
          overflow: hidden;
        }

        .dark-cta-card-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 150px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 9999px;
          margin-bottom: 22px;
        }

        .dot-green-glow {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .eyebrow-text {
          font-size: 11px;
          font-weight: 700;
          color: #34D399;
          letter-spacing: 0.05em;
        }

        .cta-headline {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          max-width: 720px;
          line-height: 1.18;
          margin-bottom: 14px;
        }

        .cta-subtext {
          font-size: 15.5px;
          line-height: 1.55;
          color: #94A3B8;
          max-width: 620px;
          margin-bottom: 34px;
        }

        .cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 40px;
        }

        .btn-emerald-review {
          height: 44px;
          padding: 0 24px;
          background-color: #10B981;
          color: #022C22;
          border: none;
          border-radius: 8px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .btn-emerald-review:hover {
          background-color: #059669;
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.45);
        }

        .btn-dark-request {
          height: 44px;
          padding: 0 22px;
          background-color: #1E293B;
          color: #F8FAFC;
          border: 1px solid #334155;
          border-radius: 8px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-dark-request:hover {
          background-color: #334155;
          border-color: #475569;
          transform: translateY(-1px);
        }

        .cta-proof-points {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 12px;
          color: #94A3B8;
        }

        .proof-item {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .dot-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #38BDF8;
        }

        @media (max-width: 768px) {
          .cta-headline {
            font-size: 30px;
          }
          .cta-buttons-row {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }
          .btn-emerald-review, .btn-dark-request {
            width: 100%;
          }
          .cta-proof-points {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default ReadyCtaSection;
