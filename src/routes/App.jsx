import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import ScrollManager from "../ScrollPgesView";
import AdminPanel from "../pages/Admin View/admin";
import RoleProtectedRoute from "./RoleBasedPage";
import NotFound from "../components/NotFound";

const ArcLoader = lazy(() => import("../components/Loader"));
const Home = lazy(() => import("../pages/Home page/landingpage"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const PublishRide = lazy(() => import("../pages/Publish ride/PublishRide"));
const FindRide = lazy(() => import("../pages/Rides/FindRide"));
const RideDetails = lazy(() => import("../pages/Rides/RideDetails"));
const RideConfirmation = lazy(() => import("../pages/Rides/RideBooking"));
const ProfilePage = lazy(() => import("../pages/User/profile"));
const MyRides = lazy(() => import("../pages/User/myRides"));
const RidePayment = lazy(() => import("../pages/Rides/RidePayment"));
const BookingConfirmation = lazy(
  () => import("../pages/Rides/BookingConfirmation"),
);
const VehicleDetails = lazy(
  () => import("../pages/Vehicle/VehicleRegistration"),
);
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <ArcLoader />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter basename="carpooling">
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/offer-ride"
            element={
              <ProtectedRoutes>
                <RoleProtectedRoute allowedRole="driver">
                  <PublishRide />
                </RoleProtectedRoute>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/find-ride"
            element={
              <ProtectedRoutes>
                <RoleProtectedRoute allowedRole="passenger">
                  <FindRide />
                </RoleProtectedRoute>
              </ProtectedRoutes>
            }
          />
          <Route path="/all-rides" element={<RideDetails />} />
          <Route path="/ride-book/:rideId" element={<RideConfirmation />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/vehicle-registration"
            element={
              <ProtectedRoutes>
                <RoleProtectedRoute allowedRole="driver">
                  <VehicleDetails />
                </RoleProtectedRoute>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              </>
            }
          />
          <Route
            path="/my-rides"
            element={
              <>
                <ProtectedRoutes>
                  <MyRides />
                </ProtectedRoutes>
              </>
            }
          />
          <Route
            path="/booking-payment"
            element={
              <>
                <ProtectedRoutes>
                  <RidePayment />
                </ProtectedRoutes>
              </>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <>
                <ProtectedRoutes>
                  <BookingConfirmation />
                </ProtectedRoutes>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
