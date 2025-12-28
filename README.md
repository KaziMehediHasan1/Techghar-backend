🛒 TechGhar - Professional E-commerce Backend
TechGhar is a high-performance, scalable, and type-safe e-commerce backend system built with Node.js, Express, TypeScript, and MongoDB. This project follows the Modular Layered Architecture to ensure maintainability and clean code standards.

🏗️ Architecture & Design Patterns
This project moves away from the basic MVC and implements a Senior Level Modular Architecture:

Modular Pattern: Each feature (User, Product, Order) lives in its own module.

Service-Controller-Repository: Business logic is isolated in services, making the code testable and reusable.

Interface-First Development: Full type safety using TypeScript interfaces across the entire application.

Centralized Error Handling: Global error handling middleware for consistent API responses.

🚀 Tech Stack
Language: TypeScript

Framework: Express.js

Database: MongoDB (using Mongoose ODM)

Validation: Zod (Schema-based validation)

Security: JWT, Bcrypt, Helmet, CORS

Logger: Morgan (HTTP request logger)

✨ Key Features
Authentication & Authorization: Secure JWT-based auth with Role-Based Access Control (Admin & Customer).

Product Management: Advanced filtering, searching, and pagination.

Inventory System: Atomic stock updates to prevent overselling.

Order Workflow: Transactional order processing with Mongoose sessions.

Error Management: Custom AppError class with specific HTTP status codes.

📂 Project Structure
Plaintext

src/
├── app/
│   ├── modules/          # Feature-based modules (User, Product, Order)
│   ├── middlewares/      # Auth, Global Error Handler, Validation
│   ├── routes/           # Centralized API routing
│   └── shared/           # Reusable utilities (catchAsync, sendResponse)
├── config/               # Environment variable configuration
├── server.ts             # Database connection and Server listener
└── app.ts                # Express application setup
🛠️ Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/techghar-backend.git
Install dependencies:

Bash

npm install
Configure Environment Variables: Create a .env file in the root directory and add the following (refer to .env.example):

Code snippet

PORT=5000
DATABASE_URL=your_mongodb_url
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_secret_key
Run the application:

Bash

# Development mode
npm run dev

# Production build
npm run build
npm start
🧪 API Endpoints (Quick Look)
POST /api/v1/auth/signup - Register a new user

POST /api/v1/auth/login - User login

GET /api/v1/products - Get all products (with filters)

POST /api/v1/orders - Place a new order (Protected)

🛡️ Security Measures
Data Sanitization: Against NoSQL injection.

Rate Limiting: To prevent Brute Force attacks.

Helmet: For securing HTTP headers.

CORS: Cross-Origin Resource Sharing configuration.
