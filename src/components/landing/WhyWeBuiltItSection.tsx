import React from 'react';
import { LayoutDashboard, BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react';

export const WhyWeBuiltItSection: React.FC = () => {
  const points = [
    {
      num: '01',
      title: 'Unified Operational Flow',
      icon: <LayoutDashboard size={18} className="why-icon" />,
      desc: 'Single authoritative dashboard replacing separate channel admin panels.',
    },
    {
      num: '02',
      title: 'Clear Synchronization Metrics',
      icon: <BarChart3 size={18} className="why-icon" />,
      desc: 'Real-time latency tracking, state parity gauges, and audit logs.',
    },
    {
      num: '03',
      title: 'Visible Exceptions',
      icon: <AlertTriangle size={18} className="why-icon" />,
      desc: 'Catch desyncs in real-time before customer checkouts fail.',
    },
    {
      num: '04',
      title: 'Structural Recovery',
      icon: <ShieldCheck size={18} className="why-icon" />,
      desc: 'One-click resolution and automatic fallback queues.',
    },
  ];

  return (
    <section className="exact-why-section" id="why-omnisync">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="pill-badge-light font-mono">PROVEN RESULTS</span>
          <h2 className="why-exact-heading">
            Why operations teams choose OmniSync Core.
          </h2>
          <p className="why-exact-subtitle">
            Engineered to remove friction and guarantee total inventory reliability.
          </p>
        </div>

        <div className="why-cards-grid-4">
          {points.map((item, idx) => (
            <div key={idx} className="why-card-item">
              <div className="why-card-top">
                <span className="why-num font-mono">{item.num}</span>
                <div className="why-icon-bubble">{item.icon}</div>
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exact-why-section {
          background-color: #F8F9FA;
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

        .why-exact-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 10px;
        }

        .why-exact-subtitle {
          font-size: 15.5px;
          color: #4B5563;
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .why-cards-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .why-card-item {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .why-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .why-num {
          font-size: 11px;
          font-weight: 800;
          color: #6B7280;
          background-color: #F3F4F6;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .why-icon-bubble {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why-icon {
          color: #111827;
        }

        .why-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .why-card-desc {
          font-size: 13.5px;
          color: #4B5563;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .why-cards-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .why-cards-grid-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyWeBuiltItSection;

