import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: "RESOLVED" });
    const pending = await Complaint.countDocuments({ status: { $ne: "RESOLVED" } });

    const avgTimeAgg = await Complaint.aggregate([
      { $match: { resolvedAt: { $exists: true, $ne: null} } },
      {
        $project: {
          duration: { $subtract: ["$resolvedAt", "$createdAt"] },
        },
      },
      {
        $group: { _id: null, avgDuration: { $avg: "$duration" } },
      },
    ]);

    const avgResolutionTime = avgTimeAgg[0]?.avgDuration
      ? avgTimeAgg[0].avgDuration / (1000 * 60 * 60)
      : 0;

    res.json({
      total,
      resolved,
      pending,
      avgResolutionTime: avgResolutionTime.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;
