const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { CORS_ORIGIN } = process.env;
const PORT = process.env.PORT || 5050;

//middleware
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

const warehouseRoutes = require("./routes/warehouseRoute");

const invetoryRoutes = require("./routes/inventoryRoute");
const searchRoute = require("./routes/searchRoute");

app.use("/warehouses", warehouseRoutes);
app.use("/inventory", invetoryRoutes);
app.use("/search", searchRoute);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.get("/", (req, res) => {
  res.send("Welocom to Inventory API");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
