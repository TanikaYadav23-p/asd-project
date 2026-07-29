const router = require("express").Router();
const ctrl = require("../controllers/adController");
router.post("/", ctrl.createAd);
router.get("/", ctrl.getAds);
router.put("/:id", ctrl.updateAd);
router.delete("/:id", ctrl.deleteAd);
router.post("/duplicate/:id", ctrl.duplicateAd);
router.post("/status/:id", ctrl.changeStatus);
router.post("/priority", ctrl.updatePriority);
router.get("/preview/:id", ctrl.getAdPreview);
router.get("/stats", ctrl.getStats);
router.get("/performance", ctrl.getPerformance);
router.get("/analytics", ctrl.getAnalytics);

module.exports = router;