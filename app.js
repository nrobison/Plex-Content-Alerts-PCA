const {whitelist_ip} = require('./src/config.json')
// Require express and multer
const express = require("express")

// Initialize express and define a port
const app = express()

//Quick attempt at whitelist IPs 
app.use((req, res, next) => {
    if(whitelist_ip.includes(req.connection.remoteAddress)){
        next()
    }
    else{
        const error = new Error("IP not in whitelist. Rejecting " + req.connection.remoteAddress)
        next(error);
    }
})

app.use((err,req,res,next) =>{
    res.status(err.status || 500)
    res.send("Unable to complete request")
})
//Routes
const routes = require('./src/routes')
app.use('/',routes)

const PORT = 3000

app.use(express.urlencoded({ extended: true }));
// Tell express to use express JSON parsing
app.use(express.json())


// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))