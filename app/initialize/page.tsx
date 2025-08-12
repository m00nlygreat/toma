import Link from 'next/link';
import { setupDatabase } from '@/lib/setupDatabase';

export const metadata = {
  title: 'Initialize Database',
};

export default async function InitializePage() {
  const result = await setupDatabase();

  return (
    <div className="p-4 space-y-4">
      {result.success ? (
        <p>Database initialized successfully.</p>
      ) : (
        <p>Failed to initialize database: {result.error}</p>
      )}
      <Link href="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
}
