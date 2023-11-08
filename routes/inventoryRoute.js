const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router.route("/").post(inventoryController.createInventory);

module.exports = router;
