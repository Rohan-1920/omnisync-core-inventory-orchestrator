import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Share2, 
  RefreshCw, 
  AlertTriangle, 
  GitMerge, 
  Settings, 
  Layers,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navGroups = [
    {
      label: 'PUBLIC & PRODUCT',
      items: [
        { path: '/', label: 'Landing Page', icon: Layers },
      ],
    },
    {
      label: 'OVERVIEW',
      items: [
        { path: '/overview', label: 'Overview', icon: LayoutDashboard },
      ],
    },
    {
      label: 'OPERATIONS',
      items: [
        { path: '/inventory', label: 'Inventory', icon: Package },
        { path: '/stores', label: 'Stores', icon: Store },
        { path: '/channels', label: 'Channels', icon: Share2 },
        { path: '/sync-activity', label: 'Sync Activity', icon: RefreshCw },
        { path: '/exceptions', label: 'Exceptions', icon: AlertTriangle },
      ],
    },
    {
      label: 'CONFIGURATION',
      items: [
        { path: '/sku-mapping', label: 'SKU Mapping', icon: GitMerge },
        { path: '/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div 
          className="mobile-overlay" 
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 40,
          }}
        />
      )}

      <aside className={`app-sidebar ${isOpenMobile ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon">
              <Layers size={18} />
            </div>
            <div className="brand-text">
              <span className="brand-title">OmniSync</span>
              <span className="brand-subtitle">CORE V2.4</span>
            </div>
          </div>
          <button 
            type="button" 
            className="sidebar-close-btn" 
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onNavigate(item.path);
                      onCloseMobile();
                    }}
                  >
                    <Icon size={16} className="nav-item-icon" />
                    <span>{item.label}</span>
                    {isActive && <span className="active-indicator" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="tenant-info">
            <span className="tenant-label">ACTIVE TENANT</span>
            <span className="tenant-name">Enterprise Logistics Group</span>
          </div>
        </div>
      </aside>

      <style>{`
        .app-sidebar {
          width: 240px;
          min-width: 240px;
          background-color: #FFFFFF;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 50;
          transition: transform 0.2s ease-in-out;
        }

        .sidebar-header {
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background-color: var(--text-primary);
          color: var(--accent-green);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-subtitle {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .sidebar-close-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
        }

        .sidebar-nav {
          padding: 16px 12px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-group-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
          padding: 4px 10px;
          margin-bottom: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.12s ease;
          position: relative;
        }

        .nav-item:hover {
          color: var(--text-primary);
          background-color: var(--bg-app);
        }

        .nav-item.active {
          color: var(--text-primary);
          background-color: #F0F9EB;
          font-weight: 600;
        }

        .nav-item-icon {
          color: var(--text-secondary);
        }

        .nav-item.active .nav-item-icon {
          color: #2D6B0D;
        }

        .active-indicator {
          position: absolute;
          right: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-green);
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border-color);
          background-color: #FAF9F6;
        }

        .tenant-info {
          display: flex;
          flex-direction: column;
        }

        .tenant-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .tenant-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 900px) {
          .app-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            box-shadow: var(--shadow-lg);
          }

          .app-sidebar.mobile-open {
            transform: translateX(0);
          }

          .sidebar-close-btn {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
