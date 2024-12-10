import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChartPage from "./Pages/ChartPage";
import Maps from "./Pages/Maps";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </div>
  );
}

export default App;
