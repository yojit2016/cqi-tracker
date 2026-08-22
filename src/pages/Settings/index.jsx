import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCQIData } from '../../hooks/useCQIData';
import BrandEdge from '../../components/common/BrandEdge';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import AlertBanner from '../../components/common/AlertBanner';
import ThemeToggle from '../../components/common/ThemeToggle';
import { User, Bell, Shield, Save } from 'lucide-react';

const SettingsPage = () => {
  const { notificationPreference, updateNotificationPreferences } = useCQIData();

  // Profile Form State
  const [profileName, setProfileName] = useState('Dr. Sanjay Kumar');
  const [profileEmail, setProfileEmail] = useState('sanjay.k@somaiya.edu');
  const profileDept = 'Computer Engineering';
  const profileRole = 'Dean / Quality Assurance Lead';

  // Notifications State
  const [emailEnabled, setEmailEnabled] = useState(notificationPreference.emailEnabled ?? true);
  const [inAppEnabled, setInAppEnabled] = useState(notificationPreference.inAppEnabled ?? true);
  const [thresholdDays, setThresholdDays] = useState(notificationPreference.thresholdDays ?? 5);

  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate
    if (!profileName) newErrors.profileName = 'Profile name cannot be empty';
    if (!profileEmail) newErrors.profileEmail = 'Email address cannot be empty';
    
    const days = parseInt(thresholdDays);
    if (isNaN(days) || days < 1 || days > 30) {
      newErrors.thresholdDays = 'Alert threshold must be between 1 and 30 days';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSaveSuccess(false);
      return;
    }

    // Save notifications to context (updates localStorage)
    updateNotificationPreferences({
      emailEnabled,
      inAppEnabled,
      thresholdDays: days,
    });

    setErrors({});
    setSaveSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <BrandEdge
        title="CQI System Preferences & Settings"
        subtitle="Manage academic profiles, global notifications, and theme defaults"
      />

      {saveSuccess && (
        <AlertBanner
          type="success"
          title="System Sync Successful"
          message="Accreditation profile and notification thresholds have been saved to local storage."
          duration={5000}
          onDismiss={() => setSaveSuccess(false)}
        />
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Personal Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings} className="rounded-lg border border-border bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <User className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Academic Profile</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Full Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                error={errors.profileName}
              />
              <InputField
                label="Somaiya Email"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                error={errors.profileEmail}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Department Scope"
                value={profileDept}
                disabled
                helperText="Department bounds are locked by institutional hierarchy"
              />
              <InputField
                label="System Role"
                value={profileRole}
                disabled
                helperText="Permissions are managed under SVU Active Directory"
              />
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <Bell className="w-4 h-4 text-secondary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">CQI Alert Thresholds</h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3.5">
                  <ToggleSwitch
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    label="Email Alerts for Impending Deadlines"
                  />
                  <ToggleSwitch
                    checked={inAppEnabled}
                    onChange={(e) => setInAppEnabled(e.target.checked)}
                    label="In-App Banner Notifications"
                  />
                </div>
                <div>
                  <InputField
                    label="Pre-deadline Alert (Days)"
                    type="number"
                    value={thresholdDays}
                    onChange={(e) => setThresholdDays(e.target.value)}
                    error={errors.thresholdDays}
                    helperText="Alert generated N days before corrective due dates"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={<Save className="w-4 h-4" />}
              >
                Save Preferences
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Theme & Credentials overview */}
        <div className="space-y-6">
          {/* Theme panel */}
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-border mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Visual Controls</h3>
            </div>
            <p className="text-xs text-text-secondary leading-normal mb-4">
              Swap dashboard visual tokens instantly to suit light conditions.
            </p>
            <ThemeToggle />
          </div>

          {/* Institutional details panel */}
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm text-xs space-y-3">
            <h4 className="font-bold text-text-primary uppercase tracking-wider">SVU OBE Compliance Core</h4>
            <div className="space-y-1.5 text-text-secondary leading-relaxed">
              <p>Platform Version: <span className="font-mono font-bold text-text-primary">v0.1.0-beta</span></p>
              <p>Accreditation Standard: <span className="font-bold text-primary">NBA Tier-1 Criteria</span></p>
              <p>Active Audits: <span className="font-bold">12 subjects</span></p>
              <p>System Hash: <span className="font-mono text-[10px] text-text-tertiary">0x8D9F2A61BC07</span></p>
            </div>
            <div className="border-t border-border pt-3 text-[10px] text-text-tertiary">
              For system changes or credentials resets, contact Somaiya IT Services at <span className="font-semibold text-primary">helpdesk@somaiya.edu</span>.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
