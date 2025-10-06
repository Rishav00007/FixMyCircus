import express from 'express';
import { generateReport, getAllReports, getReportById,deleteReport, } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post("/",protect,authorizeRoles("admin","staff"),generateReport);
router.get("/",protect,authorizeRoles("admin","staff"),getAllReports);
router.get("/:id",protect,authorizeRoles("admin","staff"),getReportById);
router.delete("/:id",protect,authorizeRoles("admin"),deleteReport);

export default router;