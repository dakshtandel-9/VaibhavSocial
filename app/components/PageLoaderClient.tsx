'use client';

// This wrapper lives in a Client Component so `ssr: false` is valid here.
// PageLoader is NEVER rendered on the server — zero hydration mismatch possible.
import dynamic from 'next/dynamic';

const PageLoader = dynamic(() => import('./PageLoader'), { ssr: false });

export default function PageLoaderClient() {
  return <PageLoader />;
}
