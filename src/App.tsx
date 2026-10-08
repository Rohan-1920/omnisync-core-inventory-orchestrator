import { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AppShell } from './components/shell/AppShell';
import { OverviewPage } from './pages/OverviewPage';
import { InventoryPage } from './pages/InventoryPage';
import { StoresPage } from './pages/StoresPage';
import { ChannelsPage } from './pages/ChannelsPage';
import { SyncActivityPage } from './pages/SyncActivityPage';
import { ExceptionsPage } from './pages/ExceptionsPage';
import { SkuMappingPage } from './pages/SkuMappingPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  let pageTitle = 'Overview';
  let pageDescription = 'Monitor inventory health, synchronization activity, and operational exceptions.';
  let PageContent = <OverviewPage onNavigate={navigate} />;

  switch (currentPath) {
    case '/inventory':
      pageTitle = 'Inventory';
      pageDescription = 'Manage and monitor inventory across connected stores and channels.';
      PageContent = <InventoryPage />;
      break;
    case '/stores':
      pageTitle = 'Stores';
      pageDescription = 'Monitor connected stores and their inventory synchronization health.';
      PageContent = <StoresPage />;
      break;
    case '/channels':
      pageTitle = 'Channels';
      pageDescription = 'Monitor connected sales channels and marketplace integrations.';
      PageContent = <ChannelsPage />;
      break;
    case '/sync-activity':
      pageTitle = 'Sync Activity';
      pageDescription = 'Track inventory synchronization events across stores and channels.';
      PageContent = <SyncActivityPage />;
      break;
    case '/exceptions':
      pageTitle = 'Exceptions';
      pageDescription = 'Review, retry, and resolve synchronization issues that require operational attention.';
      PageContent = <ExceptionsPage onNavigate={navigate} />;
      break;
    case '/sku-mapping':
      pageTitle = 'SKU Mapping';
      pageDescription = 'Manage product relationships between master inventory records and channel-specific SKUs.';
      PageContent = <SkuMappingPage />;
      break;
    case '/settings':
      pageTitle = 'Settings';
      pageDescription = 'Configure inventory behavior, synchronization policies, notifications, and workspace preferences.';
      PageContent = <SettingsPage />;
      break;
    case '/':
    default:
      pageTitle = 'Overview';
      pageDescription = 'Monitor inventory health, synchronization activity, and operational exceptions.';
      PageContent = <OverviewPage onNavigate={navigate} />;
      break;
  }

  return (
    <DataProvider>
      <AppShell
        currentPath={currentPath}
        onNavigate={navigate}
        title={pageTitle}
        description={pageDescription}
      >
        {PageContent}
      </AppShell>
    </DataProvider>
  );
}

export default App;
