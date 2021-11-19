import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Visualizer from "./Animation1/Visualizer";
import Visualizer2 from "./Animation2/Visualizer2";
import Visualizer3 from "./Animation3/Visualizer3";
import Visualizer4 from "./Animation4/Visualizer4";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Visualizer />}></Route>
          <Route path="/spheres" element={<Visualizer2 />}></Route>
          <Route path="/test" element={<Visualizer3 />}></Route>
          <Route path="/lines" element={<Visualizer4 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
