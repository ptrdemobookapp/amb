import React, { useRef, useEffect } from "react";

export const AudioPlayer = ({ play, src }) => {
  const audioEl = useRef(null);

  useEffect(() => {
    if (play && audioEl.current) {
      audioEl.current.volume = 0.3;
      audioEl.current.play();
    } else if (audioEl.current) {
      audioEl.current.pause();
    }
  }, [play]);

  return <audio ref={audioEl} src={src} autoPlay />;
};
