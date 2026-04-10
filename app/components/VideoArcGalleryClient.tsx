'use client';

import dynamic from 'next/dynamic';

const VideoArcGallery = dynamic(() => import('./VideoArcGallery'), { ssr: false });

export default function VideoArcGalleryClient() {
  return <VideoArcGallery />;
}
