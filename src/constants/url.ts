type HostType = "localhost" | "";

const hostname: HostType = window.location.hostname as HostType;

export const BASE_URL = "http://localhost:5173";
export const API_URL =
  hostname == "localhost"
    ? "http://127.0.0.1:5000/api/v1"
    : "http://43.204.97.70/server/api/v1/";

export const FILE_URL =
  hostname == "localhost"
    ? "http://127.0.0.1:5000/uploads"
    : "http://43.204.97.70/server/uploads";
