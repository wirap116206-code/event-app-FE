import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import EventView from "./pages/EventView";
import LoginView from "./pages/LoginView";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardView from "./pages/DashboardView";
import DetailPage from "./pages/DetailPage";
import ProtectedRoute from "./guard/ProtectedRoute";
import PublicRoute from "./guard/PublicRoute";
import DashboardEventView from "./pages/DashboardEventView";
import CreateEventView from "./pages/dashboard/CreateEventView";
import UpdateEventView from "./pages/dashboard/UpdateEventView";
import DashboardBookingView from "./pages/DashboardBookingView";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<PublicLayout />}>
          <Route index element={<HomeView />}></Route>
          <Route path="/events" element={<EventView />} />
          <Route path="/event/:id" element={<DetailPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginView />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardView />}></Route>
            <Route path="event" element={<DashboardEventView />}></Route>
            <Route path="event/create" element={<CreateEventView />}></Route>
            <Route path="event/edit/:id" element={<UpdateEventView />}></Route>
            <Route path="booking" element={<DashboardBookingView />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
