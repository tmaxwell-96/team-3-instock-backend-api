const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const {CORS_ORIGIN} = process.env;
const PORT = process.env.PORT || 5050;

//middleware
app.use(express.json());
app.use(cors({origin: CORS_ORIGIN})); 

const warehouseRoutes = require('./routes/warehouseRoute');

app.use('/warehouses', warehouseRoutes);

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
  });

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });