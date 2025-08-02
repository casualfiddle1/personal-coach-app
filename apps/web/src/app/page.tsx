import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Personal Coach App
        </h1>
        <p className="text-xl text-blue-700">
          Your transformation journey starts here
        </p>
        <div className="mt-8">
          <Link 
            href="/auth/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
