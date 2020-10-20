const express = require('express');
const server = express();
const port = 3000;

// Parent API
server.get("/data", (req, res) => {
   res.json({ 
       sucess: true,
       message: "Data you requested" 
    });
});

// Child API
server.get("/data/abcd", (req, res) => {
    res.json({ 
        sucess: true,
        message: "efgh" 
     });
 });

 // Testing out html
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
    res.send('ci with travis');
 });

// Retrieving JSON
let data = require('./data');

// GET all items
server.get("/items", (req,res) => {
    res.json(data);
});

// GET one item by ID
server.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);
 
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
 });

// Error handling
server.use((req, res, next) => {
    res.status(404 || 500); //Catch Not found or Internal Server Errors
    res.json({
            success : false,
            message: "Unknown API endpoint test thing"
    });
});


//  Connect to Port
server.listen(port, () => {
    console.log(`Server listening at ` +port);
});
