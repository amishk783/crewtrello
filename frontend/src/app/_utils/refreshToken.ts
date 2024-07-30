import api from "./api/axios";

export const refreshToken = async () => {
  try {
    const refreshToken = JSON.parse(
      localStorage.getItem("session") || "{}"
    ).refreshToken;
    const response = await api.post("/auth/refresh-token", { refreshToken });
    const newSession = response.data;
    localStorage.setItem("session", JSON.stringify(newSession));
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newSession.accessToken}`;
    return newSession;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("session");
    delete api.defaults.headers.common["Authorization"];
    throw error;
  }
};
