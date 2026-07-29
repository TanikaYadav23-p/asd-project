const express = require("express");

const router = express.Router();

const {

getSettings,
updateGeneral,
updatePreferences,
updateNotifications,
updateSecurity,
updateBilling,
updateTheme,
changePassword,
getActivity,
getAccountSummary

} = require("../controllers/settingsController");
router.get("/", getSettings);
router.put("/general", updateGeneral);
router.put("/preferences", updatePreferences);
router.put("/notifications", updateNotifications);
router.put("/security", updateSecurity);
router.put("/billing", updateBilling);
router.put("/theme", updateTheme);
router.put("/change-password", changePassword);
router.get("/activity", getActivity);
router.get("/account-summary", getAccountSummary);

module.exports = router;