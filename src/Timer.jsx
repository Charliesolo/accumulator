import { useEffect, useState } from "react";




function Timer() {
        const [paused, setPaused] = useState(false);
        const [over, setOver] = useState(false);
        const [time, setTime] = useState(40);
      
        const tick = () => {
          if (paused || over) return;
          if (time === 0) setOver(true);
           else {
            setTime(time -1);
          } 
        };
      
        const reset = () => {
          setTime(40);
          setPaused(false);
          setOver(false);
        };
      
        useEffect(() => {
          const timerID = setInterval(() => tick(), 1000);
          return () => clearInterval(timerID);
        });
      
        return (
          <div>
            <p>{`${Math.floor(time/60)
              .toString()
              .padStart(2, '0')}:${Math.floor(time%60).toString().padStart(2, '0')}`}</p>
            <div>{over ? "Time's up!" : ''}</div>
            <button onClick={() => setPaused(!paused)}>
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={() => reset()}>Restart</button>
            <button onClick={() => setTime(time + 40)}>Add 40 seconds</button>
          </div>
        );
      };  

      
  


export default Timer