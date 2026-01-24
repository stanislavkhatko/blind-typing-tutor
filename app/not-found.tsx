import Link from "next/link";
import { KeyboardIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <KeyboardIcon className="w-20 h-20 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <KeyboardIcon size={20} />
          <span>Go to Home</span>
        </Link>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Looking for typing practice?</p>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <Link
              href="/en/en/words"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              English Words
            </Link>
            <Link
              href="/en/en/phrases"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              English Phrases
            </Link>
            <Link
              href="/es/es/words"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Spanish Words
            </Link>
            <Link
              href="/fr/fr/words"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              French Words
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
