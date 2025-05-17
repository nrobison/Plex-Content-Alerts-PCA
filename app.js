// Require express and multer
const express = require("express")

// Initialize express and define a port
const app = express()

//Routes
const routes = require('./src/routes')
app.use('/',routes)

const PORT = 3000

app.use(express.urlencoded({ extended: true }));
// Tell express to use express JSON parsing
app.use(express.json())

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))