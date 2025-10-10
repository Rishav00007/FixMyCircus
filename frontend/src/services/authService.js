import API from "./api.js";

const authService = {
  signup: (userData) => API.post("/auth/signup", userData),
  login: (email, password) => API.post("/auth/login", { email, password }),
  forgotPassword: (email) => API.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    API.post(`/auth/reset-password/${token}`, { password }),

  sendOTP: (userData) => API.post("/auth/send-otp", userData),
  verifyOTP: ({ email, otp }) => API.post("/auth/verify-otp", { email, otp }),
};

export default authService;
