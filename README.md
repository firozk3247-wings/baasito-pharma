# Baasito Pharma Pvt. Ltd. - Web Application

A full-stack, enterprise-grade portal for **Baasito Pharma Pvt. Ltd.** built using Node.js, Express, MongoDB (Mongoose), and responsive HTML/CSS/JavaScript.

## Project Structure
```
baasito-pharma/
├── models/
│   ├── Product.js          # Mongoose schema for medicines / products
│   └── Inquiry.js          # Mongoose schema for inquiries & orders
├── public/
│   ├── css/
│   │   └── style.css       # Clean, modern healthcare design system
│   ├── js/
│   │   └── main.js         # Fetch API & dynamic frontend interactions
│   └── index.html          # Professional homepage & catalog
├── .env                    # Environment config
├── .gitignore
├── server.js               # Express server & API endpoints
├── package.json
└── README.md
```

## How to Run Locally

### 1. Extract the ZIP file
Extract the downloaded `baasito-pharma.zip` archive into any folder on your PC.

### 2. Install Dependencies
Open terminal or VS Code in the project folder and run:
```bash
npm install
```

### 3. Ensure MongoDB is Running
Start your local MongoDB service:
- On Windows: Run `net start MongoDB` or launch `mongod` in Command Prompt.

### 4. Start the Application
```bash
npm start
```
Or with nodemon for live reload:
```bash
npx nodemon server.js
```

### 5. Access in Browser
Open your browser and navigate to:
```
http://localhost:5000
```
- The database automatically seeds the products (`Pansito-DSR`, `Basiflam-SP`, `Calsito`) upon first launch.
- Submitting the inquiry form writes records directly to MongoDB.
