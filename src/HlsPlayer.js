import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const HlsPlayer = ({ src, autoPlay = false, controls = true, width = "100%", height = "auto" }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (autoPlay) {
          video.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Autoplay prevented:', error);
            // Autoplay failed; user interaction is required
          });
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Network error", data);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Media error", data);
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      if (autoPlay) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Autoplay prevented:', error);
          // Autoplay failed; user interaction is required
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    video.play();
    setMuted(false);
    setIsPlaying(true);
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls={controls}
        muted={muted}
        width={width}
        height={height}
        style={{ maxWidth: '100%' }}
      />
      {!isPlaying && (
        <button onClick={handlePlayClick}>
          Play Video
        </button>
      )}
      {/* {isPlaying && (
        <button onClick={() => setMuted(!muted)}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      )} */}
    </div>
  );
};

export default HlsPlayer;