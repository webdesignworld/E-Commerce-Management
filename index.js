const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { run } = require("./db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require('./routes/orderRoutes');
const swaggerDocument = require('./swagger');
const swaggerUi = require("swagger-ui-express");


const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productRoutes);
app.use('/orders', orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

run();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
