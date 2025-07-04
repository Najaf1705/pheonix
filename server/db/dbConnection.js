const mongoose=require('mongoose');

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(()=> {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });