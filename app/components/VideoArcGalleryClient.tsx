'use client';

import VideoArcGallery from './VideoArcGallery';

export default function VideoArcGalleryClient({ videos }: { videos?: string[] }) {
  return <VideoArcGallery videos={videos} />;
}
