

// backend/routes/reportRoutes.js
import express from "express";
import {
  generateReport,
  getAllReports,
  getReportById,
  deleteReport,
  exportReportsCSV,
  exportReportById,
} from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Generate a report (store in DB)
router.post("/", protect, authorizeRoles("admin", "staff"), generateReport);

// Export CSV from ad-hoc filters (query params)
router.get("/export", protect, authorizeRoles("admin", "staff"), exportReportsCSV);

// Get all reports
router.get("/", protect, authorizeRoles("admin", "staff"), getAllReports);

// Export stored report by report id
router.get("/:id/export", protect, authorizeRoles("admin", "staff"), exportReportById);

// Get a specific report
router.get("/:id", protect, authorizeRoles("admin", "staff"), getReportById);

// Delete a report (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteReport);

export default router;
