'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [currentPhase, setCurrentPhase] = useState<'foundation' | 'rebuild' | 'launchpad'>('foundation')
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const phases = [
    {
      id: 'foundation',
      name: 'Foundation',
      icon: '🧱',
      description: 'Self-awareness, relationship repair, basic body care',
      modules: [
        { name: 'Daily Journaling', icon: '📝', href: '/dashboard/journal' },
        { name: 'Mind Practice', icon: '🧠', href: '/dashboard/mind-practice' },
        { name: 'Relationship Repair', icon: '💞', href: '/dashboard/relationships' },
        { name: 'Body Care', icon: '🏋️', href: '/dashboard/body-care' }
      ]
    },
    {
      id: 'rebuild',
      name: 'Rebuild',
      icon: '📊',
      description: 'Reconnection tools, health enhancement, life compass',
      modules: [
        { name: 'Family Unity', icon: '👨‍👩‍👧‍👦', href: '/dashboard/family' },
        { name: 'Health Enhancement', icon: '💪', href: '/dashboard/health' },
        { name: 'Values Builder', icon: '🎯', href: '/dashboard/values' },
        { name: 'Purpose Statement', icon: '🧭', href: '/dashboard/purpose' }
      ]
    },
    {
      id: 'launchpad',
      name: 'Launchpad',
      icon: '🌱',
      description: 'Reputation repair, blueprint sharing, community',
      modules: [
        { name: 'Reputation Repair', icon: '🔧', href: '/dashboard/reputation' },
        { name: 'Blueprint Sharing', icon: '📤', href: '/dashboard/blueprint' },
        { name: 'Growth Community', icon: '🌍', href: '/dashboard/community' },
        { name: 'Legacy Building', icon: '🏛️', href: '/dashboard/legacy' }
      ]
    }
  ]

  const currentPhaseData = phases.find(phase => phase.id === currentPhase)!

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Personal Coach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.user_metadata?.full_name || user.email}!
              </span>
              <button 
                onClick={handleSignOut}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phase Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Growth Journey</h2>
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentPhase === phase.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{phase.icon}</span>
                  <span>{phase.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{currentPhaseData.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentPhaseData.name}</h3>
              <p className="text-gray-600">{currentPhaseData.description}</p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPhaseData.modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 hover:border-indigo-300"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{module.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{module.name}</h4>
                <div className="text-sm text-indigo-600">Get started →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">📝</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">Daily Check-in</div>
                <div className="text-sm text-gray-600">How are you feeling today?</div>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">🎯</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">Set Today's Goal</div>
                <div className="text-sm text-gray-600">What will you accomplish?</div>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">📊</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">View Progress</div>
                <div className="text-sm text-gray-600">See your transformation journey</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 