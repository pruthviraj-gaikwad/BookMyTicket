import React from 'react';
import ReactPlayer from 'react-player';

const App=()=> {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <ReactPlayer
  url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
  onReady={() => console.log("✅ ReactPlayer ready")}
  onError={(e) => console.error("❌ Error loading player", e)}
/>
    </div>
  );
}

export default App;
