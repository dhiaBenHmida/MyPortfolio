interface SecondProfilePhotoProps {
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  width?: number;
  height?: number;
}

export const PROFILE_PHOTO_SRC = '/profile_picture.png';

export default function SecondProfilePhoto({
  alt,
  className,
  loading = 'lazy',
  width = 720,
  height = 960,
}: SecondProfilePhotoProps) {
  return (
    <img
      src={PROFILE_PHOTO_SRC}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
}
