import React from 'react';
import { ShoppingBag, Users, Wrench, Warehouse } from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const audiences = [
    {
      icon: <ShoppingBag size={20} />,
      title: 'Ecommerce Brand Operators',
      desc: 'Brands selling across Shopify, Amazon, eBay, and Etsy needing real-time stock orchestration.',
    },
    {
      icon: <Users size={20} />,
      title: 'Inventory Operations Teams',
      desc: 'Specialists responsible for maintaining SKU availability, stock buffers, and channel parity.',
    },
    {
      icon: <Wrench size={20} />,
      title: 'Logistics Operations Managers',
      desc: 'Managers handling synchronization exceptions, API dropouts, and dead-letter queues.',
    },
    {
      icon: <Warehouse size={20} />,
      title: 'Multi-Warehouse & 3PL Brands',
      desc: 'Businesses coordinating inventory updates across internal depots and external fulfillment centers.',
    },
  ];

  return (
    <section className="audience-section" id="audience">
      <div className="audience-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">TARGET AUDIENCE</span>
          <h2 className="section-title">Built for teams managing inventory across channels.</h2>
          <p className="section-subtitle">
            OmniSync Core delivers immediate value to teams facing multi-channel complexity.
          </p>
        </div>

        <div className="audience-grid">
          {audiences.map((item, idx) => (
            <div key={idx} className="audience-card">
              <div className="audience-icon-box">{item.icon}</div>
              <h3 className="audience-card-title">{item.title}</h3>
              <p className="audience-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .audience-section {
          padding: 90px 0;
          background-color: var(--bg-app);
        }

        .audience-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .audience-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .audience-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .audience-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-color-hover);
        }

        .audience-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .audience-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .audience-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .audience-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .audience-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
