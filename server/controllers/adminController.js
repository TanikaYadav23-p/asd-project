const User = require("../models/user");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalVendors = await User.countDocuments({ role: "b2b" });
    const totalStaff = await User.countDocuments({ role: "staff" });
    const totalSubscription = 860;
    const totalShipment = 4320;
    const revenue = 128500;
    const pendingApprovals = 15;

    res.json({
      stats: {
        totalUsers,
        totalVendors,
        totalStaff,
        totalSubscription,
        totalShipment,
        revenue,
        pendingApprovals
      },
      charts: {
        revenueGrowth: [20, 40, 30, 50, 60],
        userGrowth: [10, 25, 35, 45, 70]
      },

      recentActivity: [
        "User registered",
        "Vendor approved",
        "Shipment created"
      ],

      systemStatus: {
        api: "Active",
        server: "Running"
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};