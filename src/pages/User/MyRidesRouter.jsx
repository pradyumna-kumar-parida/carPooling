import { useAuth } from "../../context/AuthContext";
import DriverRides from "./driverRide";
import PassengerRides from "./myRide";

const MyRidesRouter = () => {
  const { user } = useAuth();

  return user?.role === "driver" ? <DriverRides /> : <PassengerRides />;
};

export default MyRidesRouter;
