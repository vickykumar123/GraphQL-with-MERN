import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import MainNavigation from "./components/Navigation/MainNavigation";
function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route index path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
