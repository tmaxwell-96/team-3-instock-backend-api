const router = require("express").Router();
const inventoryController = require("./../controllers/inventoryController");

router.route("/:id").get(inventoryController.getInventoryById);
router
  .route("/warehouses/:id")
  .get(inventoryController.getInventoryListByWarehouseById);

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventory);

module.exports = router;
