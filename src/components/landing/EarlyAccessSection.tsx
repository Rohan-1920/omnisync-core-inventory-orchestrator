import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send, Star } from 'lucide-react';

interface EarlyAccessFormState {
  email: string;
  role: string;
  channelCount: string;
  challenge: string;
}

const STORAGE_KEY = 'omnisync_early_access_submissions';

export const EarlyAccessSection: React.FC = () => {
  const [formData, setFormData] = useState<EarlyAccessFormState>({
    email: '',
    role: '',
    channelCount: '3-5 channels',
    challenge: '',
  });

  const [errors, setErrors] = useState<{ email?: string; role?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const testimonials = [
    {
      quote: "Before OmniSync Core, flash drops on TikTok Shop meant 20-30 cancelled orders every drop. We haven't had a single oversell event in 6 months.",
      author: "Marcus Vance",
      role: "VP of Supply Chain",
      company: "Aether Apparel (4 Connected Stores)",
    },
    {
      quote: "The Dead-Letter Queue exception isolation saved us during Shopify Black Friday rate limits. It caught 140 API timeouts and retried them all seamlessly.",
      author: "Elena Rostova",
      role: "Ecommerce Technology Lead",
      company: "Nordic Goods Co.",
    },
  ];

  const validateForm = () => {
    const newErrors: { email?: string; role?: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role or primary responsibility.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const newSubmission = {
        ...formData,
        id: `REQ-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      existing.push(newSubmission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError('Failed to record submission. Please try again.');
    }
  };

  return (
    <section className="socialproof-earlyaccess-section" id="early-access">
      <div className="section-container">
        {/* Operator Reviews Section */}
        <div className="socialproof-block">
          <div className="section-header text-center">
            <div className="pill-badge-dark">
              <Star size={13} className="badge-icon-yellow" />
              <span>OPERATOR TESTIMONIALS</span>
            </div>
            <h2 className="section-title">Trusted by Scaling Multi-Channel Brands</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="star-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="author-info">
                  <span className="author-name">{t.author}</span>
                  <span className="author-role">{t.role} • {t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Conversion Banner Box & Early Access Form */}
        <div className="conversion-banner-card">
          <div className="form-header-group text-center">
            <div className="early-program-banner">
              <Sparkles size={14} className="icon-green" />
              <span>LIMITED EARLY REVIEWER PROGRAM</span>
            </div>
            <h2 className="form-title">1-Month Free Access for the First 10 Early Reviewers</h2>
            <p className="form-subtitle">
              Get immediate 10-day sandbox trial credentials to test Master SKU mapping, deadlock isolation, and DLQ retries across your stores.
            </p>
          </div>

          {isSuccess ? (
            <div className="form-success-box">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={36} className="success-icon" />
              </div>
              <h3 className="success-title">Sandbox Request Approved & Issued!</h3>
              <p className="success-message">
                Thank you for applying for <strong>{formData.email}</strong>. Our engineering team will review your channel setup and issue sandbox credentials via email within 2 hours.
              </p>
              <div className="success-meta-box">
                <span className="metadata-text">REQUEST ID: REQ-{Date.now().toString().slice(-6)}</span>
                <span className="metadata-text">STATUS: SANDBOX QUEUED</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="early-access-form" noValidate>
              {submitError && (
                <div className="form-alert error">
                  <AlertCircle size={16} />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="early-email" className="input-label">
                    Work Email <span className="required-star">*</span>
                  </label>
                  <input
                    id="early-email"
                    type="email"
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                    placeholder="alex.vance@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="field-error-text">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="early-role" className="input-label">
                    Role / Responsibility <span className="required-star">*</span>
                  </label>
                  <select
                    id="early-role"
                    className={`select-field ${errors.role ? 'input-error' : ''}`}
                    value={formData.role}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, role: e.target.value }));
                      if (errors.role) setErrors(prev => ({ ...prev, role: undefined }));
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="">Select your role...</option>
                    <option value="Operations Lead / Manager">Operations Lead / Manager</option>
                    <option value="Ecommerce Director">Ecommerce Director</option>
                    <option value="Inventory / Warehouse Manager">Inventory / Warehouse Manager</option>
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="Software / Systems Engineer">Software / Systems Engineer</option>
                  </select>
                  {errors.role && <span className="field-error-text">{errors.role}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="early-channels" className="input-label">
                    Connected Stores / Channels (Optional)
                  </label>
                  <select
                    id="early-channels"
                    className="select-field"
                    value={formData.channelCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, channelCount: e.target.value }))}
                    disabled={isSubmitting}
                  >
                    <option value="1-2 channels">1-2 sales channels</option>
                    <option value="3-5 channels">3-5 sales channels</option>
                    <option value="6-10 channels">6-10 sales channels</option>
                    <option value="10+ channels">10+ sales channels / multi-hub</option>
                  </select>
                </div>

                <div className="input-group full-width">
                  <label htmlFor="early-challenge" className="input-label">
                    Biggest Inventory Challenge (Optional)
                  </label>
                  <textarea
                    id="early-challenge"
                    className="input-field textarea-field"
                    placeholder="Tell us about API timeouts, SKU mismatches, or overselling issues..."
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-hybrid form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" />
                    <span>Issuing Sandbox Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Request Sandbox Access</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .socialproof-earlyaccess-section {
          background-color: #070807;
          color: #F5F5F2;
          padding: 90px 0;
        }

        .socialproof-block {
          margin-bottom: 60px;
        }

        .badge-icon-yellow { color: #F59E0B; }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 32px;
        }

        .testimonial-card {
          background-color: #121412;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-xl);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .star-row {
          display: flex;
          gap: 4px;
        }

        .star-filled {
          color: #F59E0B;
          fill: #F59E0B;
        }

        .testimonial-quote {
          font-size: 15px;
          color: #F5F5F2;
          line-height: 1.5;
          font-style: italic;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 700;
          color: #FFFFFF;
          font-size: 14px;
        }

        .author-role {
          font-size: 12px;
          color: #727670;
        }

        /* Conversion Banner Card */
        .conversion-banner-card {
          background-color: #121412;
          border: 1px solid rgba(82, 234, 27, 0.3);
          border-radius: var(--radius-2xl);
          padding: 48px;
          box-shadow: 0 0 40px rgba(82, 234, 27, 0.08);
          max-width: 860px;
          margin: 0 auto;
        }

        .early-program-banner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background-color: rgba(82, 234, 27, 0.1);
          border: 1px solid rgba(82, 234, 27, 0.25);
          color: #52EA1B;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 15px;
          color: #A4A7A1;
          max-width: 600px;
          margin: 0 auto 32px;
          line-height: 1.5;
        }

        .early-access-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .full-width { grid-column: span 2; }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 13px;
          font-weight: 600;
          color: #F5F5F2;
        }

        .required-star { color: #EF4444; }

        .input-field, .select-field {
          height: 44px;
          background-color: #0A0B0A;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          padding: 0 14px;
          color: #FFFFFF;
          font-family: var(--font-family);
          font-size: 14px;
        }

        .input-field:focus, .select-field:focus {
          outline: none;
          border-color: #52EA1B;
          box-shadow: 0 0 0 1px #52EA1B;
        }

        .textarea-field {
          height: auto;
          min-height: 80px;
          padding: 10px 14px;
          resize: vertical;
        }

        .input-error {
          border-color: #EF4444 !important;
        }

        .field-error-text {
          font-size: 11px;
          color: #FCA5A5;
        }

        .form-submit-btn {
          width: 100%;
          justify-content: center;
          height: 48px;
          font-size: 15px;
        }

        .form-success-box {
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background-color: rgba(82, 234, 27, 0.05);
          border: 1px solid rgba(82, 234, 27, 0.25);
          border-radius: var(--radius-xl);
        }

        .success-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #52EA1B;
          color: #051400;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .success-message {
          font-size: 14px;
          color: #A4A7A1;
          max-width: 500px;
          line-height: 1.5;
        }

        .success-meta-box {
          display: flex;
          gap: 16px;
          background-color: #0A0B0A;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: var(--font-mono);
          font-size: 11px;
          color: #52EA1B;
        }

        @media (max-width: 768px) {
          .testimonials-grid, .form-grid {
            grid-template-columns: 1fr;
          }
          .full-width { grid-column: span 1; }
          .conversion-banner-card { padding: 28px 20px; }
        }
      `}</style>
    </section>
  );
};
