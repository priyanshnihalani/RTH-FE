import YouTube from "react-youtube";
import { useRef, useEffect } from "react";

const VideoPlayer = ({ videoId, savedTime = 0, onProgress }) => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const hasSeekedRef = useRef(false);

  const onReady = (event) => {
    playerRef.current = event.target;
    hasSeekedRef.current = false;
  };

  const trySeek = () => {
    if (
      playerRef.current &&
      savedTime > 0 &&
      !hasSeekedRef.current
    ) {
      playerRef.current.seekTo(savedTime, true);
      hasSeekedRef.current = true;
    }
  };

  const onStateChange = (event) => {
    // PLAYING
    if (event.data === 1) {
      trySeek();
      startTracking();
    }

    // PAUSED or ENDED
    if (event.data === 2 || event.data === 0) {
      stopTracking();
      saveProgress();
    }
  };

  const startTracking = () => {
    stopTracking();
    intervalRef.current = setInterval(saveProgress, 5000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const saveProgress = () => {
    if (!playerRef.current) return;

    const currentTime = Math.floor(
      playerRef.current.getCurrentTime()
    );
    const duration = Math.floor(
      playerRef.current.getDuration()
    );

    if (duration > 0 && onProgress) {
      onProgress({
        currentTime,
        duration,
        percent: Math.floor((currentTime / duration) * 100),
      });
    }
  };

  /* Re-seek if savedTime updates later */
  useEffect(() => {
    hasSeekedRef.current = false;
  }, [savedTime, videoId]);

  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (
    <div>
      <h4 className="font-semibold mb-2">Video Tutorial</h4>

      <YouTube
        videoId={videoId}
        className="w-full h-80 rounded-xl overflow-hidden"
        opts={{
          width: "100%",
          height: "320",
          playerVars: {
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default VideoPlayer;
