const knex = require("knex")(require("../knexfile"));

//GET a list of all inventory items
const getAllInventory = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (error) {
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
  createInventory,
  getAllInventory,
};
