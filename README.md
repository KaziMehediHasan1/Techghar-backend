# 🛒 TechGhar - Professional E-Commerce Backend

**TechGhar** is a robust, scalable, and type-safe backend system for a medium-sized e-commerce platform. It is built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, following senior-level architecture patterns to handle thousands of customers and a single-seller business model.

---

## 🏗️ Architecture & Design Patterns

This project implements a **Modular Layered Architecture** (Service-Controller-Route pattern) to ensure clean separation of concerns:

* **Modular Design:** Each feature (User, Product, Order) is an independent module.
* **Service Layer:** Contains all business logic and database queries.
* **Controller Layer:** Handles incoming requests and sends structured responses.
* **Type Safety:** 100% TypeScript coverage with interfaces for models and requests.
* **Validation:** Schema-based validation using **Zod**.



---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Zod
- **Security:** JWT (JSON Web Token), Bcrypt, Helmet, CORS
- **Logging:** Morgan

---

## ✨ Key Features

- **User Auth:** Secure Signup/Login with Role-Based Access Control (Admin vs. Customer).
- **Product Management:** Search, filter, and pagination for thousands of products.
- **Inventory System:** Atomic stock management to handle high-concurrency orders.
- **Order Management:** Transactional processing with Mongoose Sessions (Rollback support).
- **Error Handling:** Centralized global error handler with custom `AppError` classes.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── modules/          # Feature modules (User, Product, Order, etc.)
│   │   └── user/         # user.interface, user.model, user.service, etc.
│   ├── middlewares/      # Auth, GlobalErrorHandler, Validation
│   ├── routes/           # Centralized Route Index
│   └── shared/           # Reusable utils (catchAsync, sendResponse)
├── config/               # Environment variables and DB configuration
├── app.ts                # Express application setup
└── server.ts             # Server listener & Database connection

