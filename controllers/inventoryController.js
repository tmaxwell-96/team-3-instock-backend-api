const knex = require("knex")(require("../knexfile"));

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
//delete inventory item
const remove = async (req, res) => {
  try {
    const inventorydelete = await knex("inventory")
      .where({ id: req.params.id })
      .del();
    res.status(200).send(`Inventory with id has been successfully deleted`);
    if (inventorydelete === 0) {
      return res.status(404).send(`inventory id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(400).send("Error removing inventory list");
  }
};
module.exports = {
  createInventory,
  getAllInventory,
  // remove,
};
