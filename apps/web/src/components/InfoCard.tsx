import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Smile } from 'lucide-react';

export default function InfoCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex items-center space-x-4">
      <CheckCircleIcon className="h-8 w-8 text-green-500" />
      <Smile className="h-8 w-8 text-blue-500" />
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Welcome!</h3>
        <p className="text-gray-600 dark:text-gray-300">This card uses both Heroicons and Lucide icons, all free for commercial use.</p>
      </div>
    </div>
  );
}