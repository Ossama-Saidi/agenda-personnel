// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;