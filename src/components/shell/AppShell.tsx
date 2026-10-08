import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface AppShellProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentPath,
  onNavigate,
  title,
  description,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar 
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="app-main-content">
        <TopNav 
          title={title}
          description={description}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
};
