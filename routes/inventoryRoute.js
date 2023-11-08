const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router
  .route("/warehouses/:id/inventories")
  .get(inventoryController.getInventoryListByWarehouseById);
module.exports = router;
