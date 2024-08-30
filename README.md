## Porsche E-commerce Website Backend Project

### Overview

This project involves designing and implementing the backend for an e-commerce website using MongoDB for the database and a RESTful API for backend services. The project is structured to handle the data requirements for an e-commerce platform, including customers, products, and admins, and to provide both public and private API endpoints for various operations. 

### Project Structure

1. **Database Implementation**
   - Use MongoDB to implement the database according to the ERD design.
   - MongoDB collections to be created:
     - **Customers**: Stores customer details such as name, email, password, and purchase history.
     - **Products**: Contains product information including name, price, description, stock, and category.
     - **Admins**: Holds admin user data and their roles.
   - Mongoose code provided will automatically create these collections and ensure the database is set up to handle data storage and retrieval for the e-commerce platform’s operations.

2. **Backend API Development**
   - Develop a set of **public API endpoints** to allow customers to:
     - Browse the product catalog.
     - Search for products based on various criteria such as name, category, or price.
   - Implement **private API endpoints** for:
     - **Customer Authentication**: Enable user registration and login using JWT-based authentication.
     - **Order Management**: Allow customers to place, view, and manage their orders.
     - **Admin Product Management**: Provide functionality for admins to add, edit, or delete products from the catalog.
   - **Security**: 
     - Use JWT-based authentication and middleware to secure private API endpoints. This ensures that only authenticated users have access to sensitive operations such as managing orders and products.

### Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/malakabdelbaki/Porsche-ecommerce-website.git
   cd Porsche-ecommerce-website
   ```

2. **Set Up MongoDB**: 
   - Make sure MongoDB is installed and running on your machine.


3. **Install Dependencies**:
   - Install the necessary Node.js dependencies by running:
   ```bash
   npm install
   ```

4. **Environment Configuration**:
   - Create a `.env` file in the root directory of the project.
   - Add your MongoDB connection string and any other environment variables required for JWT authentication.

5. **Run the Server**:
   - Start the development server using:
   ```bash
   npm run dev
   ```

6. **Testing the API**:
   - Use tools like Postman or cURL to test the public and private API endpoints.
   - Ensure all endpoints work as expected and data is correctly stored and retrieved from MongoDB.
