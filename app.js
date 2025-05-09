// Require express and body-parser
const express = require("express")
// Initialize express and define a port
const app = express()

//Routes
const routes = require('./routes')
app.use('/',routes)

const PORT = 3000
// Tell express to use express JSON parsing
app.use(express.json())

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))