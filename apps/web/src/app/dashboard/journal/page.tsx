"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Smile, Meh, Frown, Angry, Brain, Moon, HelpCircle } from 'lucide-react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const moodIcons = {
  happy: <Smile className="h-6 w-6 text-yellow-400" />,
  calm: <Brain className="h-6 w-6 text-blue-400" />,
  sad: <Frown className="h-6 w-6 text-blue-600" />,
  frustrated: <Angry className="h-6 w-6 text-red-500" />,
  angry: <Angry className="h-6 w-6 text-red-700" />,
  anxious: <HelpCircle className="h-6 w-6 text-pink-500" />,
  thoughtful: <Meh className="h-6 w-6 text-purple-500" />,
  tired: <Moon className="h-6 w-6 text-gray-500" />,
};

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const moods = [
    { icon: moodIcons.happy, label: 'Happy', value: 'happy' },
    { icon: moodIcons.calm, label: 'Calm', value: 'calm' },
    { icon: moodIcons.sad, label: 'Sad', value: 'sad' },
    { icon: moodIcons.frustrated, label: 'Frustrated', value: 'frustrated' },
    { icon: moodIcons.angry, label: 'Angry', value: 'angry' },
    { icon: moodIcons.anxious, label: 'Anxious', value: 'anxious' },
    { icon: moodIcons.thoughtful, label: 'Thoughtful', value: 'thoughtful' },
    { icon: moodIcons.tired, label: 'Tired', value: 'tired' },
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newEntry.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        content: newEntry.trim(),
        mood: selectedMood || null,
      });
    if (!error) {
      setNewEntry('');
      setSelectedMood('');
      await loadEntries();
    }
    setSaving(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center space-x-4">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Journaling</h1>
        </header>

        {/* New Entry Form */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Reflection</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      selectedMood === mood.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="mb-1">{mood.icon}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="entry" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                What's on your mind?
              </label>
              <textarea
                id="entry"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Write about your day, your thoughts, your goals, or anything that's important to you..."
                disabled={saving}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving || !newEntry.trim()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Entries */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Entries</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8">
              <PencilSquareIcon className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">No journal entries yet. Start your journey above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {entry.mood && (
                        <span>{moodIcons[entry.mood]}</span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 