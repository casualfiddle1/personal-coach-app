"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { BookOpenCheck, Brain, HeartHandshake, Dumbbell, Users, HeartPulse, Target, Compass, Wrench, Share2, Globe, Landmark, UserCircle } from 'lucide-react';
import { PencilSquareIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

const phaseIcons = {
  foundation: <BookOpenCheck className="h-7 w-7 text-indigo-600" />,
  rebuild: <ChartBarIcon className="h-7 w-7 text-indigo-600" />,
  launchpad: <Globe className="h-7 w-7 text-indigo-600" />,
};

const moduleIcons = {
  'Daily Journaling': <PencilSquareIcon className="h-6 w-6 text-blue-500" />,
  'Mind Practice': <Brain className="h-6 w-6 text-purple-500" />,
  'Relationship Repair': <HeartHandshake className="h-6 w-6 text-pink-500" />,
  'Body Care': <Dumbbell className="h-6 w-6 text-green-500" />,
  'Family Unity': <Users className="h-6 w-6 text-yellow-500" />,
  'Health Enhancement': <HeartPulse className="h-6 w-6 text-red-500" />,
  'Values Builder': <Target className="h-6 w-6 text-indigo-500" />,
  'Purpose Statement': <Compass className="h-6 w-6 text-blue-700" />,
  'Reputation Repair': <Wrench className="h-6 w-6 text-gray-500" />,
  'Blueprint Sharing': <Share2 className="h-6 w-6 text-cyan-500" />,
  'Growth Community': <Globe className="h-6 w-6 text-green-700" />,
  'Legacy Building': <Landmark className="h-6 w-6 text-yellow-700" />,
};

export default function DashboardPage() {
  const [currentPhase, setCurrentPhase] = useState('foundation');
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const phases = [
    {
      id: 'foundation',
      name: 'Foundation',
      icon: phaseIcons.foundation,
      description: 'Self-awareness, relationship repair, basic body care',
      modules: [
        { name: 'Daily Journaling', icon: moduleIcons['Daily Journaling'], href: '/dashboard/journal' },
        { name: 'Mind Practice', icon: moduleIcons['Mind Practice'], href: '/dashboard/mind-practice' },
        { name: 'Relationship Repair', icon: moduleIcons['Relationship Repair'], href: '/dashboard/relationships' },
        { name: 'Body Care', icon: moduleIcons['Body Care'], href: '/dashboard/body-care' },
      ],
    },
    {
      id: 'rebuild',
      name: 'Rebuild',
      icon: phaseIcons.rebuild,
      description: 'Reconnection tools, health enhancement, life compass',
      modules: [
        { name: 'Family Unity', icon: moduleIcons['Family Unity'], href: '/dashboard/family' },
        { name: 'Health Enhancement', icon: moduleIcons['Health Enhancement'], href: '/dashboard/health' },
        { name: 'Values Builder', icon: moduleIcons['Values Builder'], href: '/dashboard/values' },
        { name: 'Purpose Statement', icon: moduleIcons['Purpose Statement'], href: '/dashboard/purpose' },
      ],
    },
    {
      id: 'launchpad',
      name: 'Launchpad',
      icon: phaseIcons.launchpad,
      description: 'Reputation repair, blueprint sharing, community',
      modules: [
        { name: 'Reputation Repair', icon: moduleIcons['Reputation Repair'], href: '/dashboard/reputation' },
        { name: 'Blueprint Sharing', icon: moduleIcons['Blueprint Sharing'], href: '/dashboard/blueprint' },
        { name: 'Growth Community', icon: moduleIcons['Growth Community'], href: '/dashboard/community' },
        { name: 'Legacy Building', icon: moduleIcons['Legacy Building'], href: '/dashboard/legacy' },
      ],
    },
  ];

  const currentPhaseData = phases.find((phase) => phase.id === currentPhase)!;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-gray-900/80 shadow-sm border-b fixed top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-700 dark:text-white">Personal Coach</span>
          </div>
          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center focus:outline-none">
                <UserCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800 rounded-md shadow-lg focus:outline-none z-30">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-indigo-50 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200'}`}
                        onClick={() => router.push('/profile')}
                      >
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-indigo-50 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200'}`}
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </header>
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phase Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Growth Journey</h2>
          <div className="flex space-x-1 bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentPhase === phase.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {phase.icon}
                  <span>{phase.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Content */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="mr-3">{currentPhaseData.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentPhaseData.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{currentPhaseData.description}</p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPhaseData.modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500"
            >
              <div className="text-center flex flex-col items-center">
                <div className="mb-3">{module.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{module.name}</h4>
                <div className="text-sm text-indigo-600 dark:text-indigo-400">Get started →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <PencilSquareIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Daily Check-in</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">How are you feeling today?</div>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Target className="h-6 w-6 text-indigo-500 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Set Today's Goal</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">What will you accomplish?</div>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ChartBarIcon className="h-6 w-6 text-green-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">View Progress</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">See your transformation journey</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 