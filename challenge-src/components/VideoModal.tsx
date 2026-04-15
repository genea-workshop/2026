import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      aria-labelledby="video-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-brand-surface rounded-lg shadow-2xl relative w-full max-w-4xl aspect-video m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal content
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 h-8 w-8 bg-brand-primary text-white rounded-full flex items-center justify-center z-10 hover:bg-blue-700 transition-colors"
          aria-label="Close video player"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe
          src={videoUrl}
          className="w-full h-full rounded-lg"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Embedded Video"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;