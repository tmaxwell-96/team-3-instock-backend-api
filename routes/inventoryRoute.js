const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

// router.route("/:id").get(inventoryController.getInventoryById);
// .delete(inventoryController.remove);

// router
//   .route("/warehouses/:id/inventories")
//   .get(inventoryController.getInventoryListByWarehouseById);

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventory);

module.exports = router;
