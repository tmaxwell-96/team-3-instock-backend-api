const knex = require("knex")(require("../knexfile"));

const getInventoryById = async (req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select("inventories.*", "warehouse_name as warehouse_name")
      .where({
        "inventories.id": req.params.id,
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
      .select("inventories.*", "warehouse_name as warehouse_name");

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting inventory list");
  }
};

//POST Create new inventory item
const createInventory = async (req, res) => {
  const newInvData = req.body;
  if (
    !newInvData.warehouse_id ||
    !newInvData.item_name ||
    !newInvData.description ||
    !newInvData.category ||
    !newInvData.status ||
    isNaN(newInvData.quantity)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or Incomplete Data in the Request Body" });
  }
  try {
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

// DELETE Inventory Item by ID (Item/Ids 5 & 6 were erased through test in Postman)

const deleteInventoryById = async (req, res) => {
  try {
    const inventoryId = req.params.id;

    const inventory = await knex("inventories")
      .where({ id: inventoryId })
      .first();

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory item with ID ${inventoryId} not found` });
    }

    await knex("inventories").where({ id: inventoryId }).del();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting inventory item" });
  }
};

// PUT/EDIT Inventory Item (Item Ids 5 & 7 were edited via PUT through test in Postman)

const editInventoryById = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      isNaN(quantity)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or Incomplete Data in the Request Body" });
    }

    const warehouseExists = await knex("warehouses")
      .where({ id: warehouse_id })
      .first();

    if (!warehouseExists) {
      return res
        .status(400)
        .json({ message: `Warehouse with ID ${warehouse_id} not found` });
    }

    await knex("inventories").where({ id: inventoryId }).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    const updatedInventory = await knex("inventories")
      .where({ id: inventoryId })
      .first();

    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Editing Inventory Item" });
  }
};

const sortByColumnName = async (req, res) =>{
  try{
    const { sort_by, order_by } = req.query;

    const sortData = await knex("inventories")
    .join("warehouses", "warehouses.id", "inventories.warehouse_id")
    .select("inventories.*", "warehouse_name as warehouse_name")
    .orderBy(sort_by, order_by);

    res.status(200).json(sortData);
    
  }catch(error){
    res.status(500).json({
      message: `Error:  Unknown column ${error}`,
    });
  }
 
}

module.exports = {
  getInventoryListByWarehouseById,
  getInventoryById,
  createInventory,
  getAllInventory,
  deleteInventoryById,
  editInventoryById,
  sortByColumnName,
};
