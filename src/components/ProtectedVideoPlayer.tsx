import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const ProtectedVideoPlayer = ({ url, userData, onComplete }: { url: string; userData: any, onComplete?: () => void }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);


  const handleStart = () => {
    setIsPlaying(true);
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const forbiddenKeys = ['s', 'S', 'u', 'U'];
    if ((e.ctrlKey || e.metaKey) && forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

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
    <>
      <div
        className="relative"
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          onEnded={()=>{
            if (typeof onComplete === 'function') {
              onComplete();
            }
            setIsEnded(true);
          }}

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
      {
        isEnded && <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 select-none">
          <div className="p-4 text-sm text-white mix-blend-difference">
            <span className="text-slate-300">Video completed! Redirecting to payment...</span>
          </div>
        </div>
      }
    </>
  );
};

export default ProtectedVideoPlayer;