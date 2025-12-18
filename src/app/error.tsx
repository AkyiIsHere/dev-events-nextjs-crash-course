"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface ErrorProps {
  error: Error & { digest: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const errorMessage = error.message || "An unexpected Error occurred.";

  const router = useRouter();

  const handleTryAgain = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex flex-col item-center justify-center min-h-96 p-8 bg-gray-900/25 text-center rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-red-600 mb4">
        Something went wrong!
      </h2>
      <p className="mb-6">
        We couldn&apos;t load the event data due to a problem.
      </p>

      <div className="bg-red-100 p-3 rounded-md text-sm text-red-800 mb-6">
        <p className="font-mono">{errorMessage}</p>
      </div>

      <button
        className="px-4 py-2 w-min text-nowrap mx-auto bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        onClick={
          // Attempt to re-render the segment by re-running the data fetch in page.js
          handleTryAgain
        }
      >
        Try again
      </button>
    </div>
  );
}
