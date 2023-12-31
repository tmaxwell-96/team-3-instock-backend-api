const router = require("express").Router();
const warehouseController = require("./../controllers/warehouseController");

router.route("/").get(warehouseController.getWarehouseList);
router
  .route("/:id")
  .get(warehouseController.getWarehouseById)
  .delete(warehouseController.deleteWarehouse)
  .put(warehouseController.changeWarehouse);

router.route("/").post(warehouseController.createWarehouse);

module.exports = router;
