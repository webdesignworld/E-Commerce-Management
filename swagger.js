
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    // swagger: "2.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the eCommerce Management System",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec;

