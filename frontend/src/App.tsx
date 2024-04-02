import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import MainNavigation from "./components/Navigation/MainNavigation";
import Event from "./pages/Event";
import Booking from "./pages/Booking";
import {useAppContext} from "./context/AppContext";
function App() {
  const context = useAppContext();
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        {!context?.token && <Route path="/auth" element={<Auth />} />}
        <Route path="/events" element={<Event />} />
        {context?.token ? (
          <Route path="/bookings" element={<Booking />} />
        ) : (
          <Route path="/auth" element={<Navigate to="/auth" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
