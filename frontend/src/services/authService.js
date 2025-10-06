import API from "./api.js";

const authService = {
  signup: (userData) => API.post("/auth/signup", userData),
  login: (email, password) => API.post("/auth/login", { email, password }),
  forgotPassword: (email) => API.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => API.post(`/auth/reset-password/${token}`, { password }),
};

export default authService;
