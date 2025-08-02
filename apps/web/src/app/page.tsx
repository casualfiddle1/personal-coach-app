"use client";

import Link from 'next/link';
import InfoCard from '../components/InfoCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4">
      <main className="w-full max-w-xl flex flex-col items-center justify-center flex-1 py-16">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-10 w-full text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-white mb-4 tracking-tight">
            Personal Coach App
          </h1>
          <p className="text-lg md:text-xl text-blue-700 dark:text-blue-200 mb-8">
            Your transformation journey starts here
          </p>
          <div className="flex justify-center">
            <Link
              href="/auth/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors duration-200 text-lg"
            >
              Getting Started
            </Link>
          </div>
        </div>
        <div className="w-full mt-4">
          <InfoCard />
        </div>
      </main>
    </div>
  );
}
