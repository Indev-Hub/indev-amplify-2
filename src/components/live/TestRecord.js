/* eslint-disable */
import React, { useEffect, useRef } from 'react';

function TestRecord() {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error('error:', err);
      });
  };

  return (
    <div>
      <div>
        <button>Take a photo</button>
        <video ref={videoRef} track="" />
      </div>
    </div>
  );
};

export default TestRecord;
