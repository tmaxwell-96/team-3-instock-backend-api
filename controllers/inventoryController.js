const knex = require("knex")(require("../knexfile"));

const getInventoryListByWarehouseById = async (req, res) => {
  try {
    const InventoryFound = await knex("inventories").where({
      warehouse_id: req.params.id,
    });

    if (InventoryFound.length === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`,
      });
    }
    const InventoryData = InventoryFound;
    res.json(InventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

module.exports = { getInventoryListByWarehouseById };
