import { useState } from "react";
import "./App.css";
import Timer from "./Timer";


function App() {
  const [rest, setRest] = useState(true);

  return (
    <div className={rest? "rest": "go"}>
      <h1>Accumulator</h1>
      <Timer setRest = {setRest}/>
    </div>
  );
}

export default App;
