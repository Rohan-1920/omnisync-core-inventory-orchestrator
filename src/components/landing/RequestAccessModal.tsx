import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemo: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ 
  isOpen, 
  onClose, 
  onLaunchDemo 
}) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [channels, setChannels] = useState('Shopify + Amazon');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="modal-eyebrow font-mono">
              <span className="dot-green" />
              <span>14-DAY EVALUATION • OMNISYNC CORE</span>
            </div>

            <h3 className="modal-title">Request Enterprise Access</h3>
            <p className="modal-desc">
              Connect your sales channels and eliminate inventory overselling with sub-second event replication.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label font-mono">WORK EMAIL</label>
                <input 
                  type="email" 
                  required
                  placeholder="director.ops@enterprise.com"
                  className="form-input font-mono"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label font-mono">COMPANY NAME</label>
                <input 
                  type="text" 
                  required
                  placeholder="Acme Retail Global"
                  className="form-input font-mono"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label font-mono">PRIMARY SALES CHANNELS</label>
                <select 
                  className="form-select font-mono"
                  value={channels}
                  onChange={(e) => setChannels(e.target.value)}
                >
                  <option value="Shopify + Amazon">Shopify Plus + Amazon FBA</option>
                  <option value="TikTok Shop + Multi-channel">TikTok Shop + Multi-Storefront</option>
                  <option value="ERP / Manhattan WMS">NetSuite ERP + Manhattan WMS</option>
                  <option value="Omnichannel (5+ channels)">Omnichannel Enterprise (5+ channels)</option>
                </select>
              </div>

              <div className="modal-cta-row">
                <button type="submit" className="btn-submit-access">
                  <span>Submit Access Request</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="modal-footer-note font-mono">
                <Shield size={12} className="shield-icon" />
                <span>SOC-2 Type II Certified • Zero ERP Downtime Required</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="modal-success-state">
            <div className="success-icon-bubble">
              <CheckCircle2 size={36} className="text-green" />
            </div>
            <h3 className="success-title">Access Request Received</h3>
            <p className="success-desc">
              We've reserved an evaluation sandbox for <strong>{company || 'your team'}</strong>. Our architecture engineering team will reach out within 2 hours.
            </p>

            <div className="success-actions">
              <button 
                type="button" 
                className="btn-launch-demo"
                onClick={() => {
                  onClose();
                  onLaunchDemo();
                }}
              >
                <span>Launch Interactive Workspace Demo Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-dialog-card {
          width: 100%;
          max-width: 480px;
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 32px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
          animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .modal-close-btn:hover {
          color: #0F172A;
          background-color: #F1F5F9;
        }

        .modal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #059669;
          background-color: #ECFDF5;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .modal-desc {
          font-size: 13.5px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 22px;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 10px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.04em;
        }

        .form-input, .form-select {
          height: 40px;
          padding: 0 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 13px;
          color: #0F172A;
          background-color: #FFFFFF;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .form-input:focus, .form-select:focus {
          border-color: #0F172A;
        }

        .modal-cta-row {
          margin-top: 6px;
        }

        .btn-submit-access {
          width: 100%;
          height: 44px;
          background-color: #0A0F1D;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .btn-submit-access:hover {
          background-color: #1E293B;
        }

        .modal-footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 10px;
          color: #64748B;
          margin-top: 12px;
        }

        .shield-icon {
          color: #0D9488;
        }

        /* Success state */
        .modal-success-state {
          text-align: center;
          padding: 20px 0 10px;
        }

        .success-icon-bubble {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #ECFDF5;
          margin-bottom: 16px;
        }

        .text-green { color: #10B981; }

        .success-title {
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .success-desc {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .btn-launch-demo {
          width: 100%;
          height: 44px;
          background-color: #10B981;
          color: #022C22;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .btn-launch-demo:hover {
          background-color: #059669;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};
