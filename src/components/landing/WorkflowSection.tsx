import React from 'react';
import { 
  Zap, 
  Store, 
  GitBranch, 
  Calculator, 
  RefreshCw, 
  AlertOctagon 
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Inventory Event',
      icon: <Zap size={16} className="step-exact-icon" />,
      desc: 'Real-time webhook or polling triggers from channel/WMS.',
    },
    {
      num: '02',
      title: 'Identify Channel',
      icon: <Store size={16} className="step-exact-icon" />,
      desc: 'Match incoming event to channel credentials and store routing.',
    },
    {
      num: '03',
      title: 'Match SKU',
      icon: <GitBranch size={16} className="step-exact-icon" />,
      desc: 'Canonical map translates channel SKU to Master Inventory Record.',
    },
    {
      num: '04',
      title: 'Recalculate Ledger',
      icon: <Calculator size={16} className="step-exact-icon" />,
      desc: 'Subtract order quantity, check buffer policy & safety thresholds.',
    },
    {
      num: '05',
      title: 'Sync Delta',
      icon: <RefreshCw size={16} className="step-exact-icon" />,
      desc: 'Broadcast new available stock level to all remaining connected channels.',
    },
    {
      num: '06',
      title: 'Monitor Exceptions',
      icon: <AlertOctagon size={16} className="step-exact-icon" />,
      desc: 'Track acknowledgement responses; auto-retry on API errors.',
    },
  ];

  return (
    <section className="exact-workflow-section" id="how-it-works">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="pill-badge-light font-mono">HOW THE ENGINE WORKS</span>
          <h2 className="workflow-exact-heading">
            How OmniSync processes every inventory delta.
          </h2>
          <p className="workflow-exact-subtitle">
            Six automated steps transform stock changes into real-time multi-channel inventory state.
          </p>
        </div>

        {/* 6 Steps Grid (3x2 layout) */}
        <div className="workflow-exact-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="exact-step-card">
              <div className="step-card-header">
                <span className="step-num-badge font-mono">{step.num}</span>
                <div className="step-icon-bubble">
                  {step.icon}
                </div>
              </div>
              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exact-workflow-section {
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

        .workflow-exact-heading {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 10px;
        }

        .workflow-exact-subtitle {
          font-size: 15.5px;
          color: #4B5563;
          max-width: 620px;
          margin: 0 auto 48px;
        }

        .workflow-exact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .exact-step-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .exact-step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .step-num-badge {
          font-size: 11px;
          font-weight: 800;
          color: #6B7280;
          background-color: #F3F4F6;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .step-icon-bubble {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-exact-icon {
          color: #111827;
        }

        .step-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .step-card-desc {
          font-size: 13.5px;
          color: #4B5563;
          line-height: 1.5;
        }

        @media (max-width: 960px) {
          .workflow-exact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .workflow-exact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkflowSection;

