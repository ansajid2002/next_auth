const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./connection.js");

// app.use('/api')
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.get("/api/users",async(req,res) => {
   try {
    console.log("called");
    const query =`SELECT * FROM users`
    const result = await pool.query(query)
    const data = result.rows
    res.json({data})
   } catch (error) {
    console.log(error);
   }
})

app.listen(3001, () => {
    console.log("Sever is now listening at port 3001");
  });
  