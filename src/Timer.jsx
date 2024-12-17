import { useEffect, useState, useRef } from "react";
import { timingsRequired } from "./utils/timings";
import beep from "./assets/beep.mp3";

function Timer({ setRest }) {
  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState(40);
  const [reps, setReps] = useState("1");
  const [sets, setSets] = useState([]);
  const bleep = useRef(new Audio(beep));

  const tick = () => {
    if (paused || over) return;
    if (time === 0) {
      playBeep();
      const newSets = [...sets];
      newSets.shift();
      if (newSets.length === 0) {
        setOver(true);
        setRest(true);
        setPaused(true);
        setTimeout(() => {
          playBeep();
        }, 1000);
        setTimeout(() => {
          playBeep();
        }, 2000);
      }
      setTime(newSets[0]);
      setSets(newSets);
      if (newSets[0] === 20) {
        setRest(false);
      }
      if (newSets[0] === 15) {
        setRest(true);
      }
    } else {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 100);
    return () => clearInterval(timerID);
  });

  const handleChange = (e) => {
    e.preventDefault();
    setReps(e.target.value);
  };

  const handleStart = (e) => {
    e.preventDefault();
    const newSets = timingsRequired(reps)
    setSets(newSets);
    setTime(newSets[0]);
    setPaused(false);
    setOver(false);
    setRest(false);
  };

  const playBeep = () => {
    bleep.current.play();
  };

  return (
    <div>
      <label htmlFor="repsSelect">Number of sets</label>
      <select
        name="repsSelect"
        id="repsSelect"
        onChange={handleChange}
        value={reps}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button onClick={handleStart}>Set Reps</button>
      <button onClick={() => setPaused(!paused)}>
        {paused ? "Resume" : "Pause"}
      </button>
      <p>{`${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(time % 60)
        .toString()
        .padStart(2, "0")}`}</p>
      <div>{over ? "Time's up!" : ""}</div>
      {sets.map((set, index) => {
        return set === 20 ? <p> Exercise</p> : <p> Rest</p>;
      })}
    </div>
  );
}

export default Timer;
