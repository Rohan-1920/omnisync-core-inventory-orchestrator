import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Save, RotateCcw } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { useData } from '../context/DataContext';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useData();

  // Tenant Configuration
  const [organization, setOrganization] = useState(settings.organization);
  const [workspace, setWorkspace] = useState(settings.workspace);
  const [environment, setEnvironment] = useState(settings.environment);

  // Inventory Behavior
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(settings.lowStockThreshold);
  const [inventoryBehavior, setInventoryBehavior] = useState(settings.inventoryBehavior);

  // Retry Configuration
  const [retryAttempts, setRetryAttempts] = useState<number>(settings.retryAttempts);
  const [retryInterval, setRetryInterval] = useState(settings.retryInterval);

  // Notifications
  const [exceptionAlerts, setExceptionAlerts] = useState<boolean>(settings.exceptionAlerts);
  const [syncFailureAlerts, setSyncFailureAlerts] = useState<boolean>(settings.syncFailureAlerts);

  // System Preferences
  const [timezone, setTimezone] = useState(settings.timezone);
  const [dateFormat, setDateFormat] = useState(settings.dateFormat);

  // Sync local form state when global settings change (e.g. after save or reset)
  useEffect(() => {
    setOrganization(settings.organization);
    setWorkspace(settings.workspace);
    setEnvironment(settings.environment);
    setLowStockThreshold(settings.lowStockThreshold);
    setInventoryBehavior(settings.inventoryBehavior);
    setRetryAttempts(settings.retryAttempts);
    setRetryInterval(settings.retryInterval);
    setExceptionAlerts(settings.exceptionAlerts);
    setSyncFailureAlerts(settings.syncFailureAlerts);
    setTimezone(settings.timezone);
    setDateFormat(settings.dateFormat);
  }, [settings]);

  // Form State & Feedback
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setIsDirty(true);
    setSaveSuccessMsg(null);
    setValidationError(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation Rules
    if (lowStockThreshold === undefined || isNaN(lowStockThreshold) || lowStockThreshold < 0) {
      setValidationError('Low-stock threshold must be a non-negative number (0 or greater).');
      return;
    }

    if (retryAttempts === undefined || isNaN(retryAttempts) || retryAttempts < 1 || retryAttempts > 10) {
      setValidationError('Retry attempts must be an integer between 1 and 10.');
      return;
    }

    setIsSaving(true);
    setValidationError(null);

    const updated = {
      organization,
      workspace,
      environment,
      lowStockThreshold,
      inventoryBehavior,
      retryAttempts,
      retryInterval,
      exceptionAlerts,
      syncFailureAlerts,
      timezone,
      dateFormat,
    };

    setTimeout(() => {
      updateSettings(updated);
      setIsSaving(false);
      setIsDirty(false);
      setSaveSuccessMsg('Settings saved successfully and applied across workspace.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }, 400);
  };

  const handleResetDefaults = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setOrganization(settings.organization);
    setWorkspace(settings.workspace);
    setEnvironment(settings.environment);
    setLowStockThreshold(settings.lowStockThreshold);
    setInventoryBehavior(settings.inventoryBehavior);
    setRetryAttempts(settings.retryAttempts);
    setRetryInterval(settings.retryInterval);
    setExceptionAlerts(settings.exceptionAlerts);
    setSyncFailureAlerts(settings.syncFailureAlerts);
    setTimezone(settings.timezone);
    setDateFormat(settings.dateFormat);
    setIsDirty(false);
    setValidationError(null);
    setShowDiscardModal(false);
  };

  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {saveSuccessMsg && (
        <div style={{ padding: '12px 16px', backgroundColor: '#F0F9EB', border: '1px solid #C8ECAE', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', color: '#27620E', fontSize: '13px', fontWeight: 500 }}>
          <CheckCircle2 size={16} />
          {saveSuccessMsg}
        </div>
      )}

      {validationError && (
        <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', color: '#B91C1C', fontSize: '13px', fontWeight: 500 }}>
          <AlertCircle size={16} />
          {validationError}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 1. Tenant Configuration */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="card-heading">Tenant Configuration</h3>
            <p className="metadata-text">Manage tenant organization identity and execution scope.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={organization}
                onChange={(e) => handleInputChange(setOrganization, e.target.value)}
                required
              />
              <span className="form-help">Primary legal or operational enterprise name.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Workspace Identity</label>
              <input 
                type="text" 
                className="input-field" 
                value={workspace}
                onChange={(e) => handleInputChange(setWorkspace, e.target.value)}
                required
              />
              <span className="form-help">Active tenant workspace environment.</span>
            </div>
          </div>

          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label className="form-label">Target Environment</label>
            <select 
              className="select-field"
              value={environment}
              onChange={(e) => handleInputChange(setEnvironment, e.target.value as any)}
            >
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
            <span className="form-help">Production routes real store webhooks and live channel updates.</span>
          </div>
        </section>

        {/* 2. Inventory Behavior */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="card-heading">Inventory Behavior</h3>
            <p className="metadata-text">Thresholds and safety buffer policies for stock allocation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Low-Stock Threshold</label>
              <input 
                type="number" 
                className="input-field" 
                value={lowStockThreshold}
                min={0}
                onChange={(e) => handleInputChange(setLowStockThreshold, parseInt(e.target.value))}
              />
              <span className="form-help">Triggers low-stock warnings when available inventory drops below this count.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Allocation Policy</label>
              <select 
                className="select-field"
                value={inventoryBehavior}
                onChange={(e) => handleInputChange(setInventoryBehavior, e.target.value)}
              >
                <option value="Safety Stock Buffer (5%)">Safety Stock Buffer (5%)</option>
                <option value="Strict Allocation">Strict Allocation (No oversell)</option>
                <option value="Oversell Allow (Zero Buffer)">Oversell Allow (Zero Buffer)</option>
              </select>
              <span className="form-help">Determines how stock reserves are calculated across channels.</span>
            </div>
          </div>
        </section>

        {/* 3. Retry Configuration */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="card-heading">Retry Configuration</h3>
            <p className="metadata-text">Automated retry logic for failed channel API calls.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Max Retry Attempts</label>
              <input 
                type="number" 
                className="input-field" 
                value={retryAttempts}
                min={1}
                max={10}
                onChange={(e) => handleInputChange(setRetryAttempts, parseInt(e.target.value))}
              />
              <span className="form-help">Number of automated retries before routing to Exceptions/DLQ (1-10).</span>
            </div>

            <div className="form-group">
              <label className="form-label">Retry Interval Backoff</label>
              <select 
                className="select-field"
                value={retryInterval}
                onChange={(e) => handleInputChange(setRetryInterval, e.target.value)}
              >
                <option value="1 minute">1 minute</option>
                <option value="5 minutes (Standard)">5 minutes (Standard)</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
              </select>
              <span className="form-help">Base delay between automated sync retry requests.</span>
            </div>
          </div>
        </section>

        {/* 4. Notifications */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="card-heading">Notifications</h3>
            <p className="metadata-text">Configure operational alerting channels.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="toggle-row">
              <input 
                type="checkbox" 
                checked={exceptionAlerts}
                onChange={(e) => handleInputChange(setExceptionAlerts, e.target.checked)}
              />
              <div>
                <span className="table-text" style={{ fontWeight: 600 }}>Exception Alerts</span>
                <p className="form-help">Notify ops team immediately when high or critical exceptions are logged.</p>
              </div>
            </label>

            <label className="toggle-row">
              <input 
                type="checkbox" 
                checked={syncFailureAlerts}
                onChange={(e) => handleInputChange(setSyncFailureAlerts, e.target.checked)}
              />
              <div>
                <span className="table-text" style={{ fontWeight: 600 }}>Sync Failure Summaries</span>
                <p className="form-help">Send daily sync execution failure metrics and rate limit alerts.</p>
              </div>
            </label>
          </div>
        </section>

        {/* 5. System Preferences */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="card-heading">System Preferences</h3>
            <p className="metadata-text">Timezone and display format preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">System Timezone</label>
              <select 
                className="select-field"
                value={timezone}
                onChange={(e) => handleInputChange(setTimezone, e.target.value)}
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date Format</label>
              <select 
                className="select-field"
                value={dateFormat}
                onChange={(e) => handleInputChange(setDateFormat, e.target.value)}
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (US Standard)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (EU Standard)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Form Actions Footer Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleResetDefaults}
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isDirty && (
              <span className="metadata-text" style={{ color: '#D97706', fontWeight: 500 }}>
                Unsaved changes
              </span>
            )}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSaving}
            >
              <Save size={14} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>

      {/* Discard Unsaved Changes Confirmation Modal */}
      <Modal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        title="Discard unsaved changes?"
        footer={
          <>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowDiscardModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={resetForm}
            >
              Discard Changes
            </button>
          </>
        }
      >
        <p className="body-text">
          You have unsaved configuration changes. Discarding will revert all settings back to their last saved values.
        </p>
      </Modal>

      <style>{`
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-help {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .toggle-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          padding: 8px 0;
        }

        .toggle-row input[type="checkbox"] {
          margin-top: 3px;
          accent-color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
