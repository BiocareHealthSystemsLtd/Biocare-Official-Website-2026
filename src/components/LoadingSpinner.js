export default function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-primary-100 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
