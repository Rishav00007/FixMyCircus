import API from "./api";

const analyticsService = {
  getComplaintStats: async () => {
    const res = await API.get("/complaints/analytics");
    return res.data;
  },
};

export default analyticsService;
