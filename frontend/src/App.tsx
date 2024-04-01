import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route index path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
