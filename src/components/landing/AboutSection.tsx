import React from 'react';
import { Database, ShieldCheck, Server, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-architecture-section" id="about">
      <div className="section-container">
        <div className="architecture-box">
          <div className="about-header text-center">
            <div className="pill-badge-dark">
              <Cpu size={13} className="icon-green" />
              <span>THE XORA ENGINEERING BACKBONE</span>
            </div>
            <h2 className="section-title">Why XORA Engineered OmniSync Core</h2>
            <p className="section-subtitle">
              We built OmniSync Core because standard SaaS integrations break when high-volume merchants hit sudden sales surges. OmniSync was engineered from day one on database-level ACID transactions.
            </p>
          </div>

          <div className="arch-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Database size={22} />
              </div>
              <h3 className="pillar-title">Transactional PostgreSQL Integrity</h3>
              <p className="pillar-desc">
                Every quantity modification is processed inside ACID-compliant PostgreSQL database transactions with row-level locks, guaranteeing zero race conditions or phantom stock deductions.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Server size={22} />
              </div>
              <h3 className="pillar-title">Resilient Event Pipelines</h3>
              <p className="pillar-desc">
                Webhooks are consumed asynchronously into an event queue. If a channel endpoint fails or times out, the event is isolated to a DLQ and retried automatically.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={22} />
              </div>
              <h3 className="pillar-title">Strict Multi-Tenant Isolation</h3>
              <p className="pillar-desc">
                Tenant data boundaries are enforced at the database policy layer. Your channel keys, SKU mappings, and inventory logs are completely isolated and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-architecture-section {
          background-color: #0A0B0A;
          color: #F5F5F2;
          padding: 90px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .architecture-box {
          background-color: #121412;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-2xl);
          padding: 56px 40px;
        }

        .icon-green { color: #52EA1B; }

        .arch-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .pillar-card {
          background-color: #0A0B0A;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xl);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: rgba(82, 234, 27, 0.1);
          border: 1px solid rgba(82, 234, 27, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #52EA1B;
        }

        .pillar-title {
          font-size: 18px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .pillar-desc {
          font-size: 14px;
          color: #A4A7A1;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .arch-pillars-grid {
            grid-template-columns: 1fr;
          }
          .architecture-box {
            padding: 32px 20px;
          }
        }
      `}</style>
    </section>
  );
};
