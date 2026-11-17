'use client';

import React, { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [academyName, setAcademyName] = useState('Compete Academy — Chennai');
  const [helpline, setHelpline] = useState('+91 94765 43210');
  const [email, setEmail] = useState('info@competeacademy.in');
  const [adminEmail, setAdminEmail] = useState('admin@competeacademy.in');
  const [adminName, setAdminName] = useState('Academy Registrar & Dean');
  const [passwordChangedAt, setPasswordChangedAt] = useState<string | null>(null);
  const [activeSessionsCount, setActiveSessionsCount] = useState<number>(1);

  const [savingSettings, setSavingSettings] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPwd, setChangingPwd] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setAcademyName(data.settings.academyName);
          setHelpline(data.settings.helpline);
          setEmail(data.settings.email);
          setAdminEmail(data.settings.adminEmail);
          setAdminName(data.settings.adminName || 'Academy Registrar & Dean');
          setPasswordChangedAt(data.settings.passwordChangedAt);
          setActiveSessionsCount(data.settings.activeSessionsCount || 1);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSavedMsg(null);
    setSettingsError(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academyName,
          helpline,
          email,
          adminName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSettingsError(data.error || 'Failed to update settings');
      } else {
        setSavedMsg('Institutional settings persisted to database.');
        setTimeout(() => setSavedMsg(null), 3500);
      }
    } catch {
      setSettingsError('Network error saving settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (newPassword !== confirmPassword) {
      setPwdError('New password and confirmation password do not match.');
      return;
    }

    setChangingPwd(true);
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwdError(data.error || 'Failed to update password.');
      } else {
        setPwdSuccess(data.message || 'Password updated and sessions rotated.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordChangedAt(new Date().toISOString());
        setActiveSessionsCount(1);
      }
    } catch {
      setPwdError('Network error updating password.');
    } finally {
      setChangingPwd(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Academy &amp; Security Settings
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
          Configure institutional contact anchors, rotate administrator credentials, and inspect session security.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{savedMsg}</span>
        </div>
      )}

      {settingsError && (
        <div className="p-3.5 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          <span>{settingsError}</span>
        </div>
      )}

      {/* Institutional Metadata Form */}
      <form
        onSubmit={handleSave}
        className="bg-[#0B1735]/90 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl text-xs font-sans"
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="material-symbols-outlined text-[#FFB91F]">tune</span>
          <h2 className="font-headline text-base font-bold text-white">
            General Institutional Metadata
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="setting-academy-name" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Academy Title
            </label>
            <input
              id="setting-academy-name"
              type="text"
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="setting-helpline" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Admissions Helpline
            </label>
            <input
              id="setting-helpline"
              type="text"
              value={helpline}
              onChange={(e) => setHelpline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="setting-public-email" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Public Inquiry Email
            </label>
            <input
              id="setting-public-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="setting-admin-email" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Master Administrator Email (Read-Only Login ID)
            </label>
            <input
              id="setting-admin-email"
              type="email"
              value={adminEmail}
              disabled
              className="w-full px-3.5 py-2.5 bg-[#071126]/60 border border-white/10 rounded-xl text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3 pt-2">
          <span className="material-symbols-outlined text-[#FFB91F]">database</span>
          <h2 className="font-headline text-base font-bold text-white">
            Database &amp; Session Status
          </h2>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-headline font-bold text-slate-200">
              SQLite Embedded Engine (WAL Mode)
            </span>
            <span className="text-emerald-400 font-bold uppercase text-[0.625rem] px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">
              Operational
            </span>
          </div>
          <span className="text-[0.6875rem] text-slate-400">
            Active Server-Side Sessions: <strong className="text-white">{activeSessionsCount}</strong>
          </span>
          {passwordChangedAt && (
            <span className="text-[0.6875rem] text-slate-400">
              Last Credential Rotation:{' '}
              <strong className="text-emerald-300">
                {new Date(passwordChangedAt).toLocaleString()}
              </strong>
            </span>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingSettings}
            className="px-6 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] disabled:opacity-50 text-[#071126] font-headline text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          >
            {savingSettings ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>

      {/* Administrator Password Rotation Section */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-[#0B1735]/90 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-xl text-xs font-sans"
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="material-symbols-outlined text-[#FFB91F]">key</span>
          <div>
            <h2 className="font-headline text-base font-bold text-white">
              Rotate Administrator Password
            </h2>
            <p className="text-[0.6875rem] text-slate-400 mt-0.5">
              Updating your password immediately revokes all other active sessions across devices.
            </p>
          </div>
        </div>

        {pwdSuccess && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{pwdSuccess}</span>
          </div>
        )}

        {pwdError && (
          <div className="p-3.5 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{pwdError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="current-admin-pwd" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Current Password
            </label>
            <input
              id="current-admin-pwd"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="new-admin-pwd" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              New Strong Password
            </label>
            <input
              id="new-admin-pwd"
              type="password"
              required
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-admin-pwd" className="font-headline font-bold uppercase tracking-wider text-slate-300">
              Confirm New Password
            </label>
            <input
              id="confirm-admin-pwd"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[0.6875rem] text-slate-400">
            Requires 10+ characters, uppercase, lowercase, number, and symbol.
          </span>
          <button
            type="submit"
            disabled={changingPwd || !currentPassword || !newPassword || !confirmPassword}
            className="px-6 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] disabled:opacity-50 text-[#071126] font-headline text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          >
            {changingPwd ? 'Rotating Password...' : 'Update Password & Revoke Sessions'}
          </button>
        </div>
      </form>
    </div>
  );
}
