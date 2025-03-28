const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for lost and found items
let items = [];

// Route to fetch all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Route to fetch items filtered by location
app.get("/api/items/filter", (req, res) => {
  const { location } = req.query;
  const filteredItems = items.filter(
    (item) => item.location.toLowerCase() === location.toLowerCase()
  );
  res.json(filteredItems);
});

// Route to add a new item
app.post("/api/items", (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now(); // Simulate a unique ID
  items.push(newItem);
  res.status(201).json(newItem);
});

// Route to get a specific item by ID
app.get("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Route to delete an item
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id == id);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).send("Item deleted");
  } else {
    res.status(404).send("Item not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
