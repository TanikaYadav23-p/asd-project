const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getTopCountries,
    getSupplierTypes,
    getQualityDistribution,
    getTopSuppliers,
    getSupplierSpotlight,
    getRecentShipments,
    getFilterOptions
} = require("../controllers/supplierDiscoveryController");
router.get("/dashboard", getDashboard);
router.get("/top-countries", getTopCountries);
router.get("/supplier-types", getSupplierTypes);
router.get("/quality-distribution", getQualityDistribution);
router.get("/top-suppliers", getTopSuppliers);
router.get("/supplier-spotlight", getSupplierSpotlight);
router.get("/recent-shipments", getRecentShipments);
router.get("/filters", getFilterOptions);

module.exports = router;