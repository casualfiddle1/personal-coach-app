'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface JournalEntry {
  id: string
  content: string
  mood: string | null
  created_at: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '😡', label: 'Angry', value: 'angry' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
  ]

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      loadEntries()
    }
  }, [user])

  const loadEntries = async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (!error && data) {
      setEntries(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newEntry.trim()) return

    setSaving(true)
    const { error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        content: newEntry.trim(),
        mood: selectedMood || null,
      })

    if (!error) {
      setNewEntry('')
      setSelectedMood('')
      await loadEntries()
    }
    setSaving(false)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Daily Journaling</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Entry Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Reflection</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedMood === mood.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs text-gray-600">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="entry" className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                id="entry"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-600">No journal entries yet. Start your journey above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {entry.mood && (
                        <span className="text-2xl">
                          {moods.find(m => m.value === entry.mood)?.emoji}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 