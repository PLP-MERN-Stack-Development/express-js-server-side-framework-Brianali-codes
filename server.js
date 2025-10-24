// server.js - Week 2 Express.js Assignment

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Simple logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Simple authentication middleware
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer secret123') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized. Please include a valid token.' });
  }
});

// In-memory product list
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API. Try /api/products');
});

// GET all products (with simple search & filter)
app.get('/api/products', (req, res) => {
  let result = products;
  const { category, search } = req.query;

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(term));
  }

  res.json(result);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;

  res.json(product);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Something went wrong:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
