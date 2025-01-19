import  { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const ProtectedVideoPlayer = ({ url, userData }: { url: string; userData: any }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track user viewing session
  const handleStart = () => {
    setIsPlaying(true);
    // You can add analytics or session tracking here
  };

  // Prevent keyboard shortcuts for download/saving
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const forbiddenKeys = ['s', 'S', 'u', 'U'];
    if ((e.ctrlKey || e.metaKey) && forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Custom control settings
  const config = {
    file: {
      attributes: {
        controlsList: 'nodownload',
        onContextMenu: (e: Event) => e.preventDefault(),
      },
    },
  };

  // Dynamic watermark with user info
  const Watermark = () => (
    <div 
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 select-none"
      style={{ 
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 100px,
          rgba(0, 0, 0, 0.1) 100px,
          rgba(0, 0, 0, 0.1) 200px
        )`
      }}
    >
      <div className="p-4 text-sm text-white mix-blend-difference">
        {userData.email} • {new Date().toISOString()}
      </div>
    </div>
  );

  return (
    <div 
      className="relative"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"

        controls={true}
        config={config}
        onStart={handleStart}
        // Prevent picture-in-picture
        pip={false}
        // Disable full screen if desired
        // playsinline={true}
        // Disable download button
        download={false}
        // Custom controls configuration
        playbackRate={1.0}
        // Prevent seeking if needed
        // onSeek={(e) => e.preventDefault()}
      />
      {isPlaying && <Watermark />}
    </div>
  );
};

export default ProtectedVideoPlayer;