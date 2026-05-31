import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export function loginApi(data) {
  return axiosInstance.post("/login", data);
}

export function signupApi(data) {
  return axiosInstance.post("/register", data);
}

export function getRolesApi() {
  return axiosInstance.get("/get-roles");
}

export function getVehicleListApi() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject(new Error("Not authenticated"));
  return axiosInstance.get("/vehicles");
}

export function searchLocationsApi(input) {
  return axiosInstance.post("/search-locaton", input);
}

export function publishRideApi(data) {
  return axiosInstance.post("/store-ride-data", data);
}
export function findRidesApi(data) {
  return axiosInstance.post("/find-rides", data);
}

export function bookRideApi(data) {
  return axiosInstance.post("/create-booking-request", data);
}
export function vehicleRegistrationApi(data) {
  return axiosInstance.post("/store-vehicle-data", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}