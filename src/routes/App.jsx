import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ScrollManager from "../ScrollPgesView";
import NotFound from "../components/NotFound";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../layout";

// ✅ Loader is NOT lazy — it must be ready before anything else loads
import ArcLoader from "../components/Loader";

// ✅ Home is NOT lazy — first page must be instant
import Home from "../pages/Home page/landingpage";

const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const PublishRide = lazy(() => import("../pages/Publish ride/PublishRide"));
const FindRide = lazy(() => import("../pages/Rides/FindRide"));
const RideDetails = lazy(() => import("../pages/Rides/RideDetails"));
const RideConfirmation = lazy(() => import("../pages/Rides/RideBooking"));
const ProfilePage = lazy(() => import("../pages/User/profile"));
const MyRides = lazy(() => import("../pages/User/myRides"));
const RidePayment = lazy(() => import("../pages/Rides/RidePayment"));
const BookingConfirmation = lazy(() => import("../pages/Rides/BookingConfirmation"));
const VehicleDetails = lazy(() => import("../pages/Vehicle/VehicleRegistration"));

// ✅ Solid background so blank screen never shows
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fff" }}>
    <ArcLoader />
  </div>
);

const routes = [
  { path: "/", element: <Home />, isProtected: false, permission: [] },
  { path: "/login", element: <Login />, isProtected: false, permission: [], layout: "blankLayout" },
  { path: "/signup", element: <Signup />, isProtected: false, permission: [], layout: "blankLayout" },
  { path: "/offer-ride", element: <PublishRide />, isProtected: false, permission: [] },
  { path: "/find-ride", element: <FindRide />, isProtected: false, permission: [] },
  { path: "/all-rides", element: <RideDetails />, isProtected: false, permission: [] },
  { path: "/ride-book/:rideId", element: <RideConfirmation />, isProtected: false, permission: [] },
  { path: "/vehicle-registration", element: <VehicleDetails />, isProtected: true, permission: ["driver"] },
  { path: "/profile", element: <ProfilePage />, isProtected: true, permission: ["driver", "passenger"] },
  { path: "/my-rides", element: <MyRides />, isProtected: true, permission: ["driver", "passenger"] },
  { path: "/booking-payment", element: <RidePayment />, isProtected: true, permission: ["driver", "passenger"] },
  { path: "/booking-confirmation", element: <BookingConfirmation />, isProtected: true, permission: ["driver", "passenger"] },
];

const ProtectedRoute = ({ route }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!route.permission.includes(user.role)) return <Navigate to="/" replace />;
  return route.layout === "blankLayout" ? route.element : <AppLayout>{route.element}</AppLayout>;
};

const PublicRoute = ({ route }) => {
  const { user } = useAuth();
  if (user && route.layout === "blankLayout") return <Navigate to="/" replace />;
  return route.layout === "blankLayout" ? route.element : <AppLayout>{route.element}</AppLayout>;
};

function App() {
  // ✅ Preload all lazy chunks in the background after app mounts
  // So when user navigates, the chunk is already downloaded — instant render
  useEffect(() => {
    const preload = [
      () => import("../pages/Auth/Login"),
      () => import("../pages/Auth/Signup"),
      () => import("../pages/Publish ride/PublishRide"),
      () => import("../pages/Rides/FindRide"),
      () => import("../pages/Rides/RideDetails"),
      () => import("../pages/Rides/RideBooking"),
      () => import("../pages/User/profile"),
      () => import("../pages/User/myRides"),
      () => import("../pages/Rides/RidePayment"),
      () => import("../pages/Rides/BookingConfirmation"),
      () => import("../pages/Vehicle/VehicleRegistration"),
    ];
    // Stagger preloads so they don't compete with the initial render
    preload.forEach((fn, i) => setTimeout(fn, i * 300));
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter basename="carpooling">
        <ScrollManager />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.isProtected
                  ? <ProtectedRoute route={route} />
                  : <PublicRoute route={route} />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;