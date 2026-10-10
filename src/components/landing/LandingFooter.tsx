import React from 'react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="omnisync-footer">
      <div className="footer-inner-container">
        {/* Left: Copyright & System Status */}
        <div className="footer-left-group">
          <span className="copyright-text">
            © 2025 OmniSync Inc. All rights reserved.
          </span>
          <span className="footer-divider">•</span>
          <div className="system-status-indicator">
            <span className="status-dot-green" />
            <span className="status-text">All Systems Operational (99.99%)</span>
          </div>
        </div>

        {/* Right: Policy Links */}
        <div className="footer-right-links">
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
          <a href="#security" className="footer-link">Security</a>
          <a href="#soc2" className="footer-link">SOC2 Type II</a>
        </div>
      </div>

      <style>{`
        .omnisync-footer {
          background-color: #FFFFFF;
          border-top: 1px solid #E2E8F0;
          padding: 24px 0;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 12.5px;
          color: #64748B;
        }

        .footer-inner-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-left-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .copyright-text {
          color: #475569;
        }

        .footer-divider {
          color: #CBD5E1;
        }

        .system-status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #059669;
          font-weight: 500;
        }

        .status-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .footer-right-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-link {
          color: #64748B;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-link:hover {
          color: #0F172A;
        }

        @media (max-width: 768px) {
          .footer-inner-container {
            flex-direction: column;
            gap: 14px;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default LandingFooter;
