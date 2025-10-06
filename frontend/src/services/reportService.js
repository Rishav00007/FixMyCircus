import API from "./api";

const reportService = {
  exportComplaintsCSV: async () => {
    const res = await API.get("/complaints/export/csv", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "complaints_report.csv");
    document.body.appendChild(link);
    link.click();
  },
};

export default reportService;
