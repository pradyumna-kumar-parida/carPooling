import React, { createContext, useContext, useEffect, useState } from "react";

import { getVehicleListApi } from "../../utils/api";
import { useAuth } from "../AuthContext";

const VehicleContent = createContext();

const VechicleProvider = ({ children }) => {
  const [vehicleList, setvehicleList] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);

  const { user } = useAuth();

  const fetchVehicleList = async () => {
    setVehiclesLoading(true);

    try {
      const api = await getVehicleListApi();

      setvehicleList(api?.data?.data || api?.data || []);
    } catch (err) {
      console.log("vehicle list fetch error", err);
    } finally {
      setVehiclesLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "driver") {
      fetchVehicleList();
    } else {
      setvehicleList([]);
    }
  }, [user]);

  return (
    <VehicleContent.Provider
      value={{
        vehicleList,
        vehiclesLoading,
        setvehicleList,
        setVehiclesLoading,
        fetchVehicleList,
      }}
    >
      {children}
    </VehicleContent.Provider>
  );
};

export default VechicleProvider;

export const useVehicleList = () => useContext(VehicleContent);
