import { User } from 'lucide-react';

interface LandingNavbarProps {
  onNavigate: (path: string) => void;
  onRequestAccess?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onNavigate, onRequestAccess }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestAccessClick = () => {
    if (onRequestAccess) {
      onRequestAccess();
    } else {
      scrollTo('cta-section');
    }
  };

  return (
    <header className="omnisync-nav" id="top-navbar">
      <div className="nav-inner-container">
        {/* Left: Brand Logo */}
        <div 
          className="brand-logo-area" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="OmniSync Home"
        >
          <div className="brand-icon-sparkle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="#14B8A6"/>
            </svg>
          </div>
          <span className="brand-name-text">OmniSync</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="center-nav-links" aria-label="Main Navigation">
          <button type="button" className="nav-link-btn" onClick={() => scrollTo('platform')}>
            Platform
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollTo('integrations')}>
            Integrations
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollTo('pipeline')}>
            Lifecycle
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollTo('operations')}>
            Operations
          </button>
          <button type="button" className="nav-link-btn" onClick={() => onNavigate('/how-it-works')}>
            Docs
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="right-nav-actions">
          <button 
            type="button" 
            className="btn-signin-text"
            onClick={() => onNavigate('/overview')}
          >
            Sign In
          </button>

          <button 
            type="button" 
            className="btn-request-access-pill"
            onClick={handleRequestAccessClick}
          >
            Request Access
          </button>

          <button 
            type="button" 
            className="btn-user-avatar"
            onClick={() => onNavigate('/overview')}
            aria-label="Launch Workspace Console"
            title="Launch App Workspace"
          >
            <User size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .omnisync-nav {
          height: 68px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #E5E7EB;
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .nav-inner-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .brand-icon-sparkle {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        .brand-logo-area:hover .brand-icon-sparkle {
          transform: rotate(45deg) scale(1.08);
        }

        .brand-name-text {
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 19px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.025em;
        }

        .center-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link-btn {
          background: transparent;
          border: none;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          padding: 6px 0;
          transition: color 0.15s ease;
        }

        .nav-link-btn:hover {
          color: #0F172A;
        }

        .right-nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .btn-signin-text {
          background: transparent;
          border: none;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: color 0.15s ease, background-color 0.15s ease;
        }

        .btn-signin-text:hover {
          color: #0F172A;
          background-color: #F1F5F9;
        }

        .btn-request-access-pill {
          height: 38px;
          padding: 0 18px;
          background-color: #0A0F1D;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .btn-request-access-pill:hover {
          background-color: #1E293B;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(10, 15, 29, 0.15);
        }

        .btn-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #F8FAFC;
          color: #475569;
          border: 1px solid #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-user-avatar:hover {
          background-color: #0A0F1D;
          color: #FFFFFF;
          border-color: #0A0F1D;
          transform: scale(1.05);
        }

        @media (max-width: 860px) {
          .center-nav-links { display: none; }
        }
      `}</style>
    </header>
  );
};

export default LandingNavbar;
