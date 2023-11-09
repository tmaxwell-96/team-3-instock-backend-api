const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventory);

module.exports = router;
