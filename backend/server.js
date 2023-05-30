require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const contractRoutes = require('./routes/contracts')

// swagger imports
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');


// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const specs = swaggerJsdoc(swaggerOptions);

// routes
app.use('/api', contractRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })