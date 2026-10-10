import React from 'react';
import { Layers, AlertTriangle, RefreshCw, Clock } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Layers size={18} className="problem-card-icon" />,
      title: 'Inventory Discrepancies',
      desc: 'Oversell issues occur when stock count updates fail to propagate across channels in real-time.',
      badgeLabel: 'RISK EXPOSURE',
      badgeDesc: 'High oversell risk during peak traffic events.',
    },
    {
      icon: <AlertTriangle size={18} className="problem-card-icon" />,
      title: 'SKU Mismatches',
      desc: 'Variants across platforms have different SKUs, preventing unified inventory tracking.',
      badgeLabel: 'DATA INTEGRITY',
      badgeDesc: '35% of manual errors stem from SKU translation failures.',
    },
    {
      icon: <RefreshCw size={18} className="problem-card-icon" />,
      title: 'Failed Synchronizations',
      desc: 'API rate limits or network hiccups break sync loops, leaving stock status stale for hours.',
      badgeLabel: 'DELAY IMPACT',
      badgeDesc: 'Avg 4.2h delay before exception detection without real-time monitoring.',
    },
    {
      icon: <Clock size={18} className="problem-card-icon" />,
      title: 'Manual Exceptions',
      desc: 'Operations teams spend hours fixing stock counts manually across portals.',
      badgeLabel: 'TOTAL WASTED',
      badgeDesc: '14+ hrs / week spent per ops manager fixing stock counts.',
    },
  ];

  return (
    <section className="exact-problem-section" id="problems">
      <div className="section-container">
        <div className="problem-header-row">
          <div className="header-left-col">
            <span className="pill-badge-light font-mono">NUMBERS & PROBLEMS</span>
            <h2 className="section-exact-heading">
              Inventory complexity grows with every channel.
            </h2>
          </div>
          <div className="header-right-col">
            <p className="section-exact-subtext">
              Disparate systems lead to overselling, delayed orders, manual adjustments, and lost revenue across storefronts.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="problems-grid-4">
          {problems.map((item, idx) => (
            <div key={idx} className="problem-item-card">
              <div className="card-top-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="card-item-title">{item.title}</h3>
              <p className="card-item-desc">{item.desc}</p>

              <div className="card-bottom-pill-box font-mono">
                <span className="pill-tag-red">{item.badgeLabel}</span>
                <span className="pill-tag-desc">{item.badgeDesc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exact-problem-section {
          background-color: #F8F9FA;
          color: #111827;
          padding: 80px 0;
          border-top: 1px solid #E5E7EB;
          border-bottom: 1px solid #E5E7EB;
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .problem-header-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 48px;
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

        .section-exact-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #111827;
        }

        .section-exact-subtext {
          font-size: 15px;
          line-height: 1.55;
          color: #4B5563;
        }

        .problems-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .problem-item-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .problem-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
        }

        .card-top-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: #F3F4F6;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .problem-card-icon {
          color: #374151;
        }

        .card-item-title {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .card-item-desc {
          font-size: 13.5px;
          color: #4B5563;
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .card-bottom-pill-box {
          background-color: #F9FAFB;
          border: 1px solid #F3F4F6;
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .pill-tag-red {
          font-size: 9px;
          font-weight: 800;
          color: #DC2626;
          letter-spacing: 0.05em;
        }

        .pill-tag-desc {
          font-size: 11px;
          color: #374151;
          line-height: 1.35;
        }

        @media (max-width: 1024px) {
          .problems-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .problem-header-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .problems-grid-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;

