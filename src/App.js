import React from 'react';
import OnlineHlsPlayer from './OnlineHlsPlayer';

function App() {
  return (
    <div className="App">
      <h1>HLS Video Player</h1>
      <OnlineHlsPlayer
        src="https://ar-127-bucket-output-video.s3.amazonaws.com/sample_960x400_ocean_with_audio.m3u8"
        autoPlay={true}
        controls={false}
        width="640"
        height="360"
      />
    </div>
  );
}

export default App;