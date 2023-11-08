const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router.route("/").get(inventoryController.getInventoryById);
router.route("/:id").get(inventoryController.getInventoryById);
router
  .route("/warehouses/:id/inventories")
  .get(inventoryController.getInventoryListByWarehouseById);
router.route("/").post(inventoryController.createInventory);

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventory);

module.exports = router;
