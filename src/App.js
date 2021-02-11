import "./App.css";
import "./fireWork.css"
import { Bingo } from "./bingo.jsx";
import AppContext from "./appContext"
import {useState} from "react"

function App() {
  const [isBingo, setIsBingo] = useState(false);
  return (
    <div className="App">
      {isBingo && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
      <div className="BingoParent">
        <AppContext.Provider value={setIsBingo}>
          <Bingo isBingo={isBingo}></Bingo>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
