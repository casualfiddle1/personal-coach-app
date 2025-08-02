"use client";

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Phone, Moon, Sun, UserCog, Lock, ImagePlus, UserCircle2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const { user, updatePassword, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [showPhoneConfirm, setShowPhoneConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarConfirm, setShowAvatarConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (typeof window !== 'undefined') {
      if (!darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Simulate save handlers (replace with real API calls)
  const handleSaveEmail = async () => {
    setErrorMsg('');
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setErrorMsg(error.message || 'Failed to update email.');
      setShowEmailConfirm(false);
      return;
    }
    setShowEmailConfirm(false);
    setSuccessMsg('Email updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };
  const handleSavePhone = async () => {
    setErrorMsg('');
    const { error } = await supabase.auth.updateUser({ data: { phone } });
    if (error) {
      setErrorMsg(error.message || 'Failed to update phone.');
      setShowPhoneConfirm(false);
      return;
    }
    setShowPhoneConfirm(false);
    setSuccessMsg('Phone number updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };
  const handleSavePassword = async () => {
    setErrorMsg('');
    if (!oldPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    // Re-authenticate
    const { error: signInError } = await signIn(user.email, oldPassword);
    if (signInError) {
      setErrorMsg('Current password is incorrect.');
      return;
    }
    const { error } = await updatePassword(newPassword);
    if (error) {
      setErrorMsg(error.message || 'Failed to update password.');
      return;
    }
    setShowPasswordModal(false);
    setSuccessMsg('Password updated successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };
  const handleSaveAvatar = async () => {
    setErrorMsg('');
    // For demo: just update metadata. For real, upload to Supabase Storage and save URL.
    const { error } = await supabase.auth.updateUser({ data: { avatar_url: avatar } });
    if (error) {
      setErrorMsg(error.message || 'Failed to update avatar.');
      setShowAvatarConfirm(false);
      return;
    }
    setShowAvatarConfirm(false);
    setSuccessMsg('Avatar updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setShowAvatarConfirm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <UserCog className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Profile</span>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <button
            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'preferences' ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <Link href="/dashboard" className="mt-8 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">← Back to Dashboard</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}
        {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{errorMsg}</div>}
        {activeTab === 'settings' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Info</h2>
            <form className="space-y-6 max-w-lg" onSubmit={e => e.preventDefault()}>
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-indigo-400" />
                  ) : (
                    <UserCircle2 className="h-20 w-20 text-gray-400 dark:text-gray-600" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <ImagePlus className="h-5 w-5" />
                    Change Avatar
                  </button>
                </div>
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email</label>
                <div className="relative flex gap-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => setShowEmailConfirm(true)}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Phone</label>
                <div className="relative flex gap-2">
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => setShowPhoneConfirm(true)}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <Lock className="h-5 w-5" />
                  Change Password
                </button>
              </div>
            </form>
          </section>
        )}
        {activeTab === 'preferences' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
              <button
                type="button"
                onClick={handleToggleDarkMode}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-indigo-600 border-indigo-700 text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200'}`}
              >
                {darkMode ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                {darkMode ? 'Dark' : 'Light'}
              </button>
            </div>
            {/* Add more preferences here */}
          </section>
        )}

        {/* Confirm Email Save Dialog */}
        <Transition.Root show={showEmailConfirm} as={Dialog} onClose={setShowEmailConfirm}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-full max-w-sm">
              <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Email Change</Dialog.Title>
              <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to update your email to <span className="font-semibold">{email}</span>?</p>
              <div className="flex gap-4 justify-end">
                <button onClick={() => setShowEmailConfirm(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={handleSaveEmail} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Confirm</button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Root>
        {/* Confirm Phone Save Dialog */}
        <Transition.Root show={showPhoneConfirm} as={Dialog} onClose={setShowPhoneConfirm}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-full max-w-sm">
              <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Phone Change</Dialog.Title>
              <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to update your phone number to <span className="font-semibold">{phone}</span>?</p>
              <div className="flex gap-4 justify-end">
                <button onClick={() => setShowPhoneConfirm(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={handleSavePhone} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Confirm</button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Root>
        {/* Confirm Avatar Save Dialog */}
        <Transition.Root show={showAvatarConfirm} as={Dialog} onClose={setShowAvatarConfirm}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-full max-w-sm">
              <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Avatar Change</Dialog.Title>
              <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to update your avatar?</p>
              <div className="flex gap-4 justify-end">
                <button onClick={() => setShowAvatarConfirm(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={handleSaveAvatar} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Confirm</button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Root>
        {/* Change Password Modal */}
        <Transition.Root show={showPasswordModal} as={Dialog} onClose={setShowPasswordModal}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-full max-w-sm">
              <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Change Password</Dialog.Title>
              <form onSubmit={async e => { e.preventDefault(); await handleSavePassword(); }} className="space-y-4">
                <div>
                  <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="old-password"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="new-password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      onClick={() => setShowNewPassword(v => !v)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      onClick={() => setShowConfirmPassword(v => !v)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {errorMsg && <div className="mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{errorMsg}</div>}
                <div className="flex gap-4 justify-end">
                  <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Save</button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Transition.Root>
      </main>
    </div>
  );
}