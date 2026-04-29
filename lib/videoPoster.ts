// Map a video URL → a still-image URL used as the landing-page thumbnail.
// Cloudinary videos get an on-the-fly JPG transform (first frame).
// Local /foo/bar.mp4 maps to /foo/bar.jpg (user provides matching jpg).

export function videoPoster(url: string): string {
  if (!url) return '';

  const cloudinary = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/)video\/upload\/(?:[^/]+\/)?(v\d+\/[^/]+)\.(mp4|mov|webm)(\?.*)?$/i
  );
  if (cloudinary) {
    const [, base, idPath] = cloudinary;
    return `${base}video/upload/so_0,w_480,c_fill,q_auto,f_jpg/${idPath}.jpg`;
  }

  return url.replace(/\.(mp4|mov|webm)(\?.*)?$/i, '.jpg$2');
}
