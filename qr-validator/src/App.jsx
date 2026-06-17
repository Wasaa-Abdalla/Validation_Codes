import { BrowserRouter, Routes, Route } from "react-router-dom";
import QrGenerator from "./pages/QrGenerator";
import ValidationPage from "./pages/ValidationPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrGenerator />} />
        <Route path="/validate/:code" element={<ValidationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
