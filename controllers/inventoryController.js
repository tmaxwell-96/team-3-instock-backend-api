const knex = require("knex")(require("../knexfile"));

const getInventoryById = async (req, res) => {
  try {
    const data = await knex("inventories").where({
      id: req.params.id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send("Error retrieving Inventories: error");
  }
};

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

//GET a list of all inventory items
const getAllInventory = async (_req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select("inventories.*", "warehouse_name as warehouse_name"); // Correct the alias here

    res.status(200).json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).send("Error getting inventory list");
  }
};

//POST Create new inventory item
const createInventory = async (req, res) => {
  try {
    console.log(req.body);
    const newInventoryData = await knex("inventories").insert(req.body);
    const newInventoryId = newInventoryData[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryId,
    });
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item:`,
    });
  }
};

module.exports = {
  getInventoryListByWarehouseById,
  getInventoryById,
  createInventory,
  getAllInventory,
};
