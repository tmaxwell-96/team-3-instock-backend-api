const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router.route("/:id").get(inventoryController.getInventoryById);

router
  .route("/warehouses/:id/inventories")
  .get(inventoryController.getInventoryListByWarehouseById);

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventory);

router.route("/:id").delete(inventoryController.deleteInventoryById);

router.route("/:id").put(inventoryController.editInventoryById);


module.exports = router;
