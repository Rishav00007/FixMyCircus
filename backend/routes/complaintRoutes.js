import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
  deleteComplaint,
  getComplaintById,
} from "../controllers/complaintController.js";
import { upload } from "../middlewares/multer.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post("/", protect, upload.single("photo"), createComplaint);
router.get("/", protect, authorizeRoles("admin", "staff"), getAllComplaints);
router.get("/my", protect, getMyComplaints);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  updateComplaintStatus
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteComplaint);
router.get("/:id", protect, getComplaintById);

export default router;
