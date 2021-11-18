import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Visualizer from './Animation1/Visualizer';
import Visualizer2 from './Animation2/Visualizer2';
import './App.css';
// import { Effects } from "./Effects";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Visualizer />}></Route>
          <Route path="/spheres" element={<Visualizer2 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
