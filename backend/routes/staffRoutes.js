import express from "express";
import {
  getAllStaffUsers,
  getUnassignedUsers,
  getAllStaff,
  assignDepartment,
  registerStaff,
  getStaffByDepartment,
  assignComplaintToStaff,
  getAssignedComplaints,
} from "../controllers/staffController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllStaffUsers);
router.get("/", protect, authorizeRoles("admin"), getAllStaff);
router.get("/unassigned", protect, authorizeRoles("admin"), getUnassignedUsers);
router.put("/assign", protect, authorizeRoles("admin"), assignDepartment);
router.post("/", protect, authorizeRoles("admin"), registerStaff);
router.get(
  "/department/:department",
  protect,
  authorizeRoles("admin"),
  getStaffByDepartment
);
router.post(
  "/assign-complaint",
  protect,
  authorizeRoles("admin"),
  assignComplaintToStaff
);

//route for staff
router.get("/my-complaints", protect, authorizeRoles("staff"), getAssignedComplaints);

export default router;
