import { useEffect, useRef } from 'react';
import Video from './components/Video';
import './App.css';

function App() {
  const videoRef = useRef();

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  useEffect(() => {
    console.log('Ref nhận từ chilren: ', videoRef.current);
  }, []);

  return (
    <div className="App">
      <button onClick={handlePlay}>Play</button>
      <Video ref={videoRef} />
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}

export default App;
