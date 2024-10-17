
---

# 🛒 **My eCommerce Platform**  

This full-stack eCommerce application is built with a **Node.js backend** (Express + MongoDB) and a **React frontend** (Redux for state management, ViteJS for fast development, and TailwindCSS for styling). It offers a seamless marketplace experience with features like **user roles, product management, order handling**, and **search functionality**. 

---

## 🌟 **Key Features**  

- **🔐 User Registration & Authentication:** Secure JWT-based authentication.  
- **👥 User Roles:** 
  - **🛠️ Admin:** Manage users (add, delete, change roles) and view orders.  
  - **🛒 Seller:** Manage products (add, update, delete).  
  - **🛍️ Shopper:** Browse, search, and place orders.  
- **📦 Product Management:** Sellers can list products with prices and stock information.  
- **🔍 Search Functionality:** Search for products, users, or orders using a search bar on relevant pages.  
- **🔒 Protected Routes:** Role-based access ensures security and permissions.  
- **🌍 Global State Management:** Managed using Redux with persistent state through Redux Persist.  
- **📱 Responsive UI:** Built with TailwindCSS for a mobile-friendly design.

---

## 📁 **Project Structure**  

### **Backend Structure**  

```plaintext
/backend
├── config
│   └── db.js               # MongoDB connection setup
├── controllers
│   ├── adminController.js  # Admin actions (user management)
│   ├── authController.js   # User registration & authentication
│   ├── orderController.js   # Order handling (create & retrieve orders)
│   └── productController.js # Product management (CRUD operations)
├── middleware
│   ├── authMiddleware.js    # JWT-based authentication protection
│   └── errorMiddleware.js   # Error handling middleware
├── models
│   ├── Order.js             # Order schema definition
│   ├── Product.js           # Product schema definition
│   └── User.js              # User schema & role management
├── routes
│   ├── adminRoutes.js       # Routes for admin actions
│   ├── authRoutes.js        # Authentication routes (login, register)
│   ├── orderRoutes.js       # Order-related routes
│   └── productRoutes.js     # Product management routes
├── .env                     # Environment variables (DB URI, JWT Secret)
├── package.json             # Backend dependencies  
└── server.js                # Main server entry point
```

---

### **Frontend Structure**  

```plaintext
/frontend
├── public
│   └── index.html           # HTML entry point for React  
├── src
│   ├── assets               # Static assets like images or logos
│   ├── components
│   │   ├── AddProductForm.jsx        # Form to add new products
│   │   ├── ConfirmationDialog.jsx    # Dialog for confirming actions (delete, etc.)
│   │   ├── LoginForm.jsx             # Login form component  
│   │   ├── Navbar.jsx                # Navigation bar based on user roles  
│   │   ├── ProductForm.jsx           # Product management form for sellers  
│   │   ├── ProductList.jsx           # Component to list products  
│   │   └── RegisterForm.jsx          # Registration form component  
│   ├── pages
│   │   ├── AdminPage.jsx     # Admin dashboard for user management  
│   │   ├── HomePage.jsx      # Main landing page displaying products  
│   │   ├── LoginPage.jsx     # Login screen  
│   │   ├── ProductPage.jsx   # Product details and purchase page  
│   │   ├── RegisterPage.jsx  # Registration page  
│   │   └── SellerPage.jsx    # Seller dashboard for managing products  
│   ├── redux
│   │   ├── orderSlice.js     # Redux slice for order state management  
│   │   ├── productSlice.js   # Redux slice for product management  
│   │   ├── store.js          # Configures the Redux store  
│   │   └── userSlice.js      # Redux slice for user authentication and roles  
│   ├── App.jsx               # Main App component with route setup  
│   ├── main.jsx              # React entry point  
│   └── index.css             # Global styles using TailwindCSS  
├── .env                      # Frontend environment variables (API URL)  
├── vite.config.js            # ViteJS configuration  
├── tailwind.config.js        # TailwindCSS configuration  
└── package.json              # Frontend dependencies  
```

---

## 🔄 **API Endpoints**  

### **Authentication**  
- **POST** `/api/auth/register` - Register a new user  
- **POST** `/api/auth/login` - Log in an existing user  

### **User Management (Admin Only)**  
- **POST** `/api/users/add` - Add a new user  
- **DELETE** `/api/users/:id` - Delete a user  
- **PUT** `/api/users/:id` - Modify a user's role  

### **Product Management**  
- **POST** `/api/products/add` - Create a product (Seller only)  
- **GET** `/api/products` - Get all products  
- **PUT** `/api/products/:id` - Update a Product  (Seller only)
- **DELETE** `/api/products/:id/` - Delete a product (Seller only)  

### **Orders**  
- **POST** `/api/orders/place` - Place an order.  
- **GET** `/api/orders/admin` - Retrieve all orders (for Admin only)

---

## 📽️ **Demo Video**  
Check out the demo video showcasing the platform's features:  
[![YouTube Logo](https://img.freepik.com/premium-photo/minimalistic-youtube-logo-design_1046319-89702.jpg?ga=GA1.1.578089932.1728644457&semt=ais_hybrid)](https://youtu.be/6xqz7u-ShdY)

---

## 🚀 **Installation & Setup**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/Nitrajsinh-Solanki/Redux-bounty.git 
cd Redux-bounty
cd ecommerce
```

### **2. Backend Setup**  
Navigate to the backend directory, install dependencies, and start the server.  

```bash
cd backend  
npm install  
```

Create a `.env` file in the `/backend` directory:  
```plaintext
MONGO_URI=<your_mongodb_uri>  
JWT_SECRET=<your_jwt_secret>  
PORT=5000  
```

Run the backend server:  
```bash
npm start  
```
The backend API will run on `http://localhost:5000`.

---

### **3. Frontend Setup**  
Navigate to the frontend directory, install dependencies, and start the React app.  

```bash
cd frontend  
npm install  
```

Run the frontend server:  
```bash
npm run dev  
```
The React app will run on `http://localhost:5173`.

---

## ⚙️ **Dependencies**  

### **Backend**  
- **🚀 express:** Web framework for Node.js  
- **🐍 mongoose:** MongoDB object modeling  
- **🔐 jsonwebtoken:** JWT authentication  
- **🔒 bcryptjs:** Password hashing  
- **📦 dotenv:** Manage environment variables  

### **Frontend**  
- **⚛️ react:** UI library  
- **📦 redux:** State management  
- **🗄️ redux-persist:** Persist Redux state  
- **🌐 react-router-dom:** Client-side routing  
- **🎨 tailwindcss:** CSS framework for responsive UI  

---
