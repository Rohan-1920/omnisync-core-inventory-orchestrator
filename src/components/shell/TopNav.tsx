import React, { useState, useEffect, useRef } from 'react';
import { Bell, Menu, User, ChevronDown, CheckCircle, Shield, RotateCcw, LogOut } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface TopNavProps {
  title: string;
  description?: string;
  onToggleMobileMenu: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  title,
  description,
  onToggleMobileMenu,
}) => {
  const { resetDemoData } = useData();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);

  const notifsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifsRef.current && !notifsRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifs(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleResetDemo = () => {
    resetDemoData();
    setResetFeedback(true);
    setTimeout(() => {
      setResetFeedback(false);
      setShowProfileMenu(false);
    }, 1000);
  };

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button 
          type="button" 
          className="btn-icon mobile-menu-trigger" 
          onClick={onToggleMobileMenu}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <div className="page-header-title-container">
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-description">{description}</p>}
        </div>
      </div>

      <div className="top-nav-right">
        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifsRef}>
          <button 
            type="button" 
            className="btn-icon notif-btn"
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="notif-badge" />
          </button>

          {showNotifs && (
            <div className="dropdown-panel notif-dropdown">
              <div className="dropdown-header">
                <span className="card-heading" style={{ fontSize: '13px' }}>System Notifications</span>
                <span className="metadata-text">3 unread</span>
              </div>
              <div className="dropdown-body">
                <div className="notif-item">
                  <div className="notif-dot alert" />
                  <div>
                    <p className="table-text" style={{ fontWeight: 500 }}>Sync Exception logged</p>
                    <p className="metadata-text">Variant ID #8841 failed payload validation on Shopify</p>
                    <span className="metadata-text" style={{ fontSize: '11px', color: '#999' }}>12m ago</span>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot warning" />
                  <div>
                    <p className="table-text" style={{ fontWeight: 500 }}>Rate limit warning</p>
                    <p className="metadata-text">Amazon API approaching rate limit (88/100 req/min)</p>
                    <span className="metadata-text" style={{ fontSize: '11px', color: '#999' }}>18m ago</span>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot success" />
                  <div>
                    <p className="table-text" style={{ fontWeight: 500 }}>Rebalance Batch Success</p>
                    <p className="metadata-text">48 items updated across Main Shopify Store</p>
                    <span className="metadata-text" style={{ fontSize: '11px', color: '#999' }}>1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Control */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button 
            type="button" 
            className="profile-control-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifs(false);
            }}
          >
            <div className="user-avatar">AV</div>
            <div className="user-info">
              <span className="user-name">Alex Vance</span>
              <span className="user-role">Lead Operations</span>
            </div>
            <ChevronDown size={14} className="user-chevron" />
          </button>

          {showProfileMenu && (
            <div className="dropdown-panel profile-dropdown">
              <div className="dropdown-header user-dropdown-header">
                <div className="user-avatar lg">AV</div>
                <div>
                  <p className="card-heading" style={{ fontSize: '14px' }}>Alex Vance</p>
                  <p className="metadata-text">alex.vance@enterprise-logistics.com</p>
                </div>
              </div>
              <div className="dropdown-menu-list">
                <button type="button" className="dropdown-menu-item">
                  <User size={14} /> Profile & Account
                </button>
                <button type="button" className="dropdown-menu-item">
                  <Shield size={14} /> Tenant Roles & Permissions
                </button>
                <button type="button" className="dropdown-menu-item">
                  <CheckCircle size={14} /> System Status: Normal
                </button>
                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
                <button 
                  type="button" 
                  className="dropdown-menu-item"
                  onClick={handleResetDemo}
                >
                  <RotateCcw size={14} /> {resetFeedback ? 'Demo Data Reset!' : 'Reset Demo State'}
                </button>
                <button type="button" className="dropdown-menu-item danger">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .top-nav {
          height: 72px;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-8);
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .top-nav-left {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .mobile-menu-trigger {
          display: none;
        }

        .page-header-title-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .top-nav-right {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .notif-btn {
          position: relative;
        }

        .notif-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 7px;
          height: 7px;
          background-color: var(--accent-green);
          border-radius: 50%;
          border: 1px solid var(--bg-surface);
        }

        .profile-control-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 10px 4px 6px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .profile-control-btn:hover {
          background-color: var(--bg-surface-hover);
          border-color: var(--border-color-hover);
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--text-primary);
          color: var(--text-inverted);
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar.lg {
          width: 36px;
          height: 36px;
          font-size: 13px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .user-role {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .user-chevron {
          color: var(--text-secondary);
        }

        /* Dropdowns */
        .dropdown-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 320px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 60;
          overflow: hidden;
          animation: fadeIn 0.12s ease-out;
        }

        .dropdown-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-color);
          background-color: #FAF9F6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-dropdown-header {
          justify-content: flex-start;
          gap: 12px;
        }

        .dropdown-body {
          max-height: 300px;
          overflow-y: auto;
        }

        .notif-item {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .notif-item:last-child {
          border-bottom: none;
        }

        .notif-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .notif-dot.alert { background-color: var(--status-failed-text); }
        .notif-dot.warning { background-color: var(--status-warning-text); }
        .notif-dot.success { background-color: var(--accent-green); }

        .dropdown-menu-list {
          padding: 6px;
          display: flex;
          flex-direction: column;
        }

        .dropdown-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          font-size: 13px;
          color: var(--text-primary);
          background: none;
          border: none;
          border-radius: var(--radius-sm);
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .dropdown-menu-item:hover {
          background-color: var(--bg-app);
        }

        .dropdown-menu-item.danger {
          color: var(--status-failed-text);
        }

        @media (max-width: 900px) {
          .top-nav {
            padding: 0 var(--space-4);
          }

          .mobile-menu-trigger {
            display: inline-flex;
          }

          .user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
