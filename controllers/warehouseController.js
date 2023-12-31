const knex = require("knex")(require("../knexfile"));

//GET: Warehouse List
const getWarehouseList = async (_req, res) => {
  try {
    const data = await knex
    .select('id', 'warehouse_name', 'address','city'
    ,'country','contact_name','contact_position'
    ,'contact_phone','contact_email')
    .from("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};

//GET: Warehouse By ID
const getWarehouseById = async (req, res) => {
  try {
    const warehouseFound = await knex.select('id', 'warehouse_name', 'address','city'
    ,'country','contact_name','contact_position'
    ,'contact_phone','contact_email')
    .from("warehouses").where({
      id: req.params.id,
    });
    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

//POST: Create New Warehouse
const createWarehouse = async (req, res) => {
  const data = req.body;
  if (
    !data.warehouse_name ||
    !data.address ||
    !data.city ||
    !data.country ||
    !data.contact_name ||
    !data.contact_position ||
    !data.contact_phone ||
    !data.contact_email
  ) {
    return res.status(400).json({
      message: "Please provide name and email for the warehoue in the request",
    });
  }
  // Check for valid email and phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!emailRegex.test(data.contact_email)) {
    return res.status(400).json({
      message: "Please provide valid email",
    });
  } else if (!phoneRegex.test(data.contact_phone)) {
    return res.status(400).json({
      message: "Please provide valid phone number",
    });
  }

  try {
    const newWarehouseData = await knex("warehouses").insert(req.body);
    const newWarehouseId = newWarehouseData[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });
    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehoue: ${error}`,
    });
  }
};

//Put/Edit warehouse
const changeWarehouse = async (req, res) => {
  try {
    const warehouseId = req.params.id;

    // Body validation
    const warehouseData = req.body;

    const data = req.body;
    if (
      !data.warehouse_name ||
      !data.address ||
      !data.city ||
      !data.country ||
      !data.contact_name ||
      !data.contact_position ||
      !data.contact_phone ||
      !data.contact_email
    ) {
      return res.status(400).json({
        message:
          "Please provide name and email for the warehoue in the request",
      });
    }
    // Check for valid email and phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,2} \(\d{3}\) \d{3}-\d{4}$/;
    if (!emailRegex.test(data.contact_email)) {
      return res.status(400).json({
        message: "Please provide valid email",
      });
    } else if (!phoneRegex.test(data.contact_phone)) {
      return res.status(400).json({
        message: "Please provide valid phone number",
      });
    }
    const rowsUpdated = await knex("warehouses")
      .where({ id: warehouseId })
      .update(req.body);

    const updatedWarehouse = await knex("warehouses").where({
      id: warehouseId,
    });
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    const updateWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });
    return res.json(updateWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `unable to update warehouse user with ID ${req.params.id}`,
    });
  }
};

//DELETE: delete warehouse
const deleteWarehouse = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    // No Content response
    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Warehouse: ${error}`,
    });
  }
};

module.exports = {
  getWarehouseList,
  getWarehouseById,
  createWarehouse,
  deleteWarehouse,
  changeWarehouse,
};
