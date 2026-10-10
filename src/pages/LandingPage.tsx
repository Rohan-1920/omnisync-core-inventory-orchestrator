import React, { useState, useEffect } from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ConnectedLedgerSection } from '../components/landing/ConnectedLedgerSection';
import { EventArchitectureSection } from '../components/landing/EventArchitectureSection';
import { FeatureDualSection } from '../components/landing/FeatureDualSection';
import { ReadyCtaSection } from '../components/landing/ReadyCtaSection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { RequestAccessModal } from '../components/landing/RequestAccessModal';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  useEffect(() => {
    // Document title and meta tags
    document.title = "OmniSync — Coordinate Multi-Channel Inventory from One Engine";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Manage stock buffers, catch oversell exceptions, sync real-time sales channels, and automate WMS updates from one centralized ledger.'
    );
  }, []);

  return (
    <div className="landing-page-root">
      {/* Top Navbar */}
      <LandingNavbar 
        onNavigate={onNavigate} 
        onRequestAccess={() => setIsAccessModalOpen(true)}
      />

      {/* Main Landing Page Stream */}
      <main>
        {/* Hero Section with Live Ledger Window Mockup */}
        <HeroSection 
          onNavigate={onNavigate} 
          onRequestAccess={() => setIsAccessModalOpen(true)}
        />

        {/* Any Connected Ledger: Integrations Grid & Operational Benefits */}
        <ConnectedLedgerSection 
          onNavigate={onNavigate} 
        />

        {/* Event-Driven Architecture: 7-Stage Transaction Pipeline */}
        <EventArchitectureSection />

        {/* Feature Dual Grid: Self-Healing & Customer Journey */}
        <FeatureDualSection />

        {/* Ready to Coordinate Commerce Operations: Dark Call To Action Banner */}
        <ReadyCtaSection 
          onNavigate={onNavigate} 
          onRequestAccess={() => setIsAccessModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Evaluation / Access Request Modal */}
      <RequestAccessModal 
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        onLaunchDemo={() => onNavigate('/overview')}
      />

      <style>{`
        .landing-page-root {
          min-height: 100vh;
          width: 100%;
          background-color: #FFFFFF;
          color: #0F172A;
          overflow-x: hidden;
          font-family: var(--font-family, system-ui, -apple-system, sans-serif);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
