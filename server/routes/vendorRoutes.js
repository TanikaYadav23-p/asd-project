const express = require("express");

const router = express.Router();

const {
  getB2BUsers,
  getB2BUserById,
  getB2BUserStats,
  approveKYC,
  rejectKYC,
  suspendB2BUser,
} = require("../controllers/vendorController");

const { protect } = require("../middleware/authMiddleware");

// B2B Users

router.get("/", protect, getB2BUsers);

router.get("/stats/all", protect, getB2BUserStats);

router.get("/:id", protect, getB2BUserById);

router.patch("/:id/suspend", protect, suspendB2BUser);

// KYC

router.patch("/:userId/kyc/approve", protect, approveKYC);

router.patch("/:userId/kyc/reject", protect, rejectKYC);

module.exports = router;