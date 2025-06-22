## 📚 Library Management Backend API
A simple backend API for managing books in a library system — built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.


###  Live link: https://assignment-3-library.vercel.app/api/books

#### 🛠️ Technologies used: Mongoose, Express js , Node js.

#### ✨ Features : 
- 📖 **Books**
  - Create, update, delete books
  - View all books with filtering and sorting support
  - Get a single book by ID (with validation)
  
- 📦 **Borrow**
  - Borrow a book with quantity and due date
  - Automatically manage availability and stock
  - Save borrow records

- 📊 **Reports**
  - View borrow summary (with total quantity borrowed per book)



#### ⚙️ How to Set Up Locally

- First you have to install node and github in your machine.
- then git clone the repository or download the zip file
- in root folder go to the terminal, hit - `npm i` then `npm run dev`
- in src/server.ts - mongoose.connect('') - here in the ('') quote give your mongodb altus connection.
- access api locally at `http://localhost:5000/api/books` in your browser.