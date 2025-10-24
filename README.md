# 🛒 Express.js RESTful Product API

This is a simple RESTful API built using **Express.js**.  
It lets you perform CRUD operations (Create, Read, Update, Delete) on a list of products stored in memory.

This project is part of the **Week 2 Express.js Assignment**.

---

## 🚀 Features

- Get all products  
- Get a single product by ID  
- Add (create) a new product  
- Update a product  
- Delete a product  
- Simple authentication (using a static token)  
- Basic request logging  
- Simple error handling  
- Filtering and searching products

---

## 🧰 Requirements

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) v18 or higher  
- npm (comes with Node.js)
- A REST client like **Postman**, **Insomnia**, or **curl**

---

## ⚙️ Setup & Installation

1. **Clone your repository** (from GitHub Classroom)

   ```bash
   git clone <your-repo-link>
   cd <repo-folder>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Server**
   ```bash
   npm start
   ```

# 🧾 Product API Endpoints

Below are all the available endpoints for the Product RESTful API.

---

## 1️⃣ Get All Products

**GET** `/api/products`

Fetches all products.  
Supports **search** and **filtering**.

**Query Parameters (optional):**
- `category` → Filter by category  
- `search` → Search by name  

**Example:**
GET /api/products?category=electronics
GET /api/products?search=laptop


**Response:**
```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
]

The same works for every other endpoint

