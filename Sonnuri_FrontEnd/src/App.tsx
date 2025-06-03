import { Header } from "./components";
import { Home, Learning, LearningLevel, Testing, Translation } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learningLevel" element={<LearningLevel />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learningTest" element={<Testing />} />
        <Route path="/translation" element={<Translation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
