Mini E-Commerce Platform

-----------------------------
Section 1: Authentication
POST /auth/register
● Accept { name, email, password, role } where role = "customer" or "admin".
● Hash password with bcrypt.
● Ensure email is unique.
POST /auth/login
● Validate credentials.
● If valid, return JWT token (expiry 1h).

------------------------------
Section 2 : JWT Middelware

● Create authMiddleware that verifies JWT.
● If valid → req.user = { id, role }.
● If invalid → return 401 Unauthorized.
● Protect all routes except /auth/*.

------------------------------
Section 3: CRUD Operations – Products
● POST /products (Protected – admin only)
○ Create a product { name, price }.
● GET /products
○ List all products.
● PUT /products/:id (Admin only)
○ Update product details.
● DELETE /products/:id (Admin only)
○ Delete product.

------------------------------
Section 4: Orders & Calculation
● Order Schema: { userId, productId, quantity }
APIs:
❖ POST /orders (Customer only)
➢ Place an order.
➢ Calculate totalAmount = product. price * quantity.
❖ GET /orders/:userId
➢ Get all orders of a user with product details (use populate).
❖ GET /orders/total/:userId
➢ Calculate the total amount spent by a user.

----------------------------------------
Section 5: Aggregation & Reporting
➔ GET /reports/top-customers
➔ Find the top 3 customers by total spending (sum of orders).
➔ GET /reports/revenue
➔ Return the total revenue of the platform.