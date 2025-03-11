# QuickBazaar Documentation

## Overview

QuickBazaar is an innovative e-commerce platform designed to offer users a seamless shopping experience. Built with the latest technologies, it connects buyers and sellers in real-time for quick and hassle-free transactions.

The platform utilizes React and React-Redux for a dynamic and responsive user interface, while MongoDB serves as the backend database to handle product data efficiently. With MUI for beautiful, consistent UI components, and Node and Express for the backend, QuickBazaar ensures fast and scalable performance. User authentication is secured with JWT, offering a safe and personalized shopping experience.

Razorpay is integrated to provide safe and seamless transactions, ensuring users have a secure checkout experience every time.

QuickBazaar also features an Admin Page that allows administrators to control all platform operations, manage products, orders, and users, ensuring smooth day-to-day functioning.

QuickBazaar aims to be your go-to marketplace for a wide variety of products, whether you're shopping for everyday essentials or looking for something unique. We are committed to providing a smooth and enjoyable shopping experience, where ease of use meets cutting-edge technology.

## Environment Variables

The project uses the following environment variables:

- `PORT`: The port on which the server runs.
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `JWT_SECRET_KEY`: The secret key for signing JWT tokens.
- `RAZORPAY_KEY_ID`: The key ID for Razorpay integration.
- `RAZORPAY_KEY_SECRET`: The key secret for Razorpay integration.

## Folder Structure

### Backend

backEnd/
.env
.gitignore
app.js
config/
db.js
razorPayClient.js
controllers/
adminOrder.controller.js
auth.controller.js
cart.controller.js
cartItem.controller.js
groq.controller.js
order.controller.js
payment.controller.js
product.controller.js
...
middlewares/
models/
package.json
routes/
services/
utils/

### Frontend

frontEnd/
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
public/
README.md
src/
tailwind.config.js
vite.config.js
README.md

## Backend

### app.js

The main entry point of the backend application. It sets up the Express server, middleware, and routes.

### config/

Contains configuration files for the database and Razorpay client.

- `db.js`: Configures and connects to the MongoDB database.
- `razorPayClient.js`: Sets up the Razorpay client for payment processing.

### controllers/

Contains controller files that handle incoming HTTP requests and send responses.

- `adminOrder.controller.js`: Manages admin-specific order operations.
- `auth.controller.js`: Handles user authentication (login, registration).
- `cart.controller.js`: Manages user cart operations.
- `cartItem.controller.js`: Manages individual cart items.
- `groq.controller.js`: Handles chat-related operations.
- `order.controller.js`: Manages order operations.
- `payment.controller.js`: Handles payment processing.
- `product.controller.js`: Manages product-related operations.

### middlewares/

Contains middleware functions for request processing (e.g., authentication, validation).

### models/

Contains Mongoose models that define the schema for different collections in MongoDB.

- `orderItems.model.js`: Defines the schema for order items.
- `product.model.js`: Defines the schema for products.
- `cartItem.model.js`: Defines the schema for cart items.
- `cart.model.js`: Defines the schema for carts.
- `category.model.js`: Defines the schema for categories.
- `address.model.js`: Defines the schema for addresses.

### routes/

Contains route definitions that map URLs to controller functions.

- `cartItem.routes.js`: Routes for cart item operations.
- `order.routes.js`: Routes for order operations.
- `rating.routes.js`: Routes for rating operations.
- `payment.routes.js`: Routes for payment operations.
- `groq.routes.js`: Routes for chat operations.
- `user.routes.js`: Routes for user operations.
- `auth.routes.js`: Routes for authentication operations.
- `admin.routes.js`: Routes for admin-specific operations.
- `product.routes.js`: Routes for product operations.
- `adminProduct.routes.js`: Routes for admin-specific product operations.
- `cart.routes.js`: Routes for cart operations.

### services/

Contains service files that encapsulate business logic and interact with the database.

- `order.service.js`: Manages order-related business logic.
- `cart.service.js`: Manages cart-related business logic.
- `user.service.js`: Manages user-related business logic.
- `product.service.js`: Manages product-related business logic.
- `review.service.js`: Manages review-related business logic.

## Frontend

### index.html

The main HTML file for the frontend application.

### src/

Contains the source code for the frontend application.

- `App.jsx`: The main entry point of the React application.
- `apiConfig.js`: Configures the Axios instance for API requests.

#### customer/

Contains components and pages for the customer-facing part of the application.

#### components/

Contains reusable components.

#### product/

Contains components related to product display.

#### navigation/

Contains components related to navigation.

#### footer/

Contains the footer component.

#### homeCarousel/

Contains the main carousel component.

#### homeSectionCarousel/

Contains the section carousel component.

#### chatBot/

Contains the chatbot component.

#### pages/

Contains page components.

#### homePage/

Contains the home page component.

#### admin/

Contains components and pages for the admin part of the application.

#### components/

Contains reusable components.

- `Dashboard.jsx`: The main dashboard component.
- `MonthlyOverview.jsx`: The monthly overview component.
- `OrderTableView.jsx`: The order table view component.
- `ProductTableView.jsx`: The product table view component.
- `Admin.jsx`: The main admin component.

#### Data/

Contains data files for the application.

- `mens_kurta.js`: Contains data for men's kurtas.
- `mens_jeans.js`: Contains data for men's jeans.
- `woman_top.js`: Contains data for women's tops.
- `woman_dress.js`: Contains data for women's dresses.

#### state/

Contains Redux slices for state management.

- `Auth/`: Contains the auth slice.
- `Cart/`: Contains the cart slice.

#### routes/

Contains route definitions for the application.

- `CustomerRoutes.jsx`: Defines routes for the customer-facing part of the application.
- `AdminRoutes.jsx`: Defines routes for the admin part of the application.

## Running the Project

### Backend

To run the backend server, use the following command:

Ensure that you have a .env file with the required environment variables set up before running the server.

### Frontend

To run the frontend application, use the following command:

Ensure that you have the necessary dependencies installed by running:

## API Endpoints

### Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login a user.

### User

- `GET /api/v1/user/profile`: Get user profile.
- `GET /api/v1/user`: Get all users.

### Products

- `GET /api/v1/product`: Get all products.
- `GET /api/v1/product/id/:productId`: Get product by ID.
- `POST /api/v1/admin/product`: Create a new product.
- `POST /api/v1/admin/product/create`: Create multiple products.
- `PUT /api/v1/admin/product/:productId`: Update a product.
- `DELETE /api/v1/admin/product/:productId/delete`: Delete a product.

### Orders

- `POST /api/v1/orders`: Create a new order.
- `GET /api/v1/orders/user`: Get order history for a user.
- `GET /api/v1/orders/:orderId`: Get order by ID.

### Cart

- `GET /api/v1/cart`: Get user cart.
- `PUT /api/v1/cart/add`: Add item to cart.

### Cart Items

- `PUT /api/v1/cartItems/:cartItemId`: Update cart item.
- `DELETE /api/v1/cartItems/:cartItemId`: Remove cart item.

### Payments

- `POST /api/v1/payments`: Create a payment link.
- `PUT /api/v1/payments`: Update payment information.

### Reviews

- `POST /api/v1/reviews`: Create a review.
- `GET /api/v1/reviews/:productId`: Get all reviews for a product.

### Admin Orders

- `GET /api/v1/admin/orders`: Get all orders.
- `PUT /api/v1/admin/orders/:orderId/confirmed`: Confirm an order.
- `PUT /api/v1/admin/orders/:orderId/shipped`: Mark an order as shipped.
- `PUT /api/v1/admin/orders/:orderId/deliver`: Mark an order as delivered.
- `PUT /api/v1/admin/orders/:orderId/cancel`: Cancel an order.
- `DELETE /api/v1/admin/orders/:orderId/delete`: Delete an order.

## Conclusion

QuickBazaar is a comprehensive e-commerce platform designed to provide a seamless shopping experience for users. With a robust backend and a dynamic frontend, it ensures fast and efficient performance, secure transactions, and easy management for administrators.
