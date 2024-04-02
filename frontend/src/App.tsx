import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import MainNavigation from "./components/Navigation/MainNavigation";
import Event from "./pages/Event";
function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/events" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
