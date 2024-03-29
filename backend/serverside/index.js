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
    const query =`SELECT * FROM users`
    const result = await pool.query(query)
    const data = result.rows
    res.json({data})
   } catch (error) {
    console.log(error);
   } 
})

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // const loggedid = generateRandomNumber();
  try {

    const query = `SELECT * FROM users WHERE email = $1`
    const result = await pool.query(query,[email])
    if (result.rows.length > 0) {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1 and password = $2`,[email,password])
        if (result.rows.length > 0 ){
          console.log(result.rows[0]);
          console.log({ status: 200,data:result.rows[0]});
          res.status(200).json({ status: 200,data:result.rows[0]})

        }
        else {
          res.status(401).json({ status: 401,message:"Wrong password"})
        }
    }
    else {
      res.status(404).json({ status: 404, message: "Email doesn't Exist"});
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

app.post("/api/getGoogleuserByid", async (req, res) => {
  try {
    const { id, email, given_name, picture } = req.body;
    console.log(req.body,"req.bodyreq.bodyreq.body")
   
    // Check if the user with the given Google ID exists
    const checkQuery = "SELECT * FROM customers WHERE google_id = $1";
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      // If the user does not exist, create a new record
      const query = "SELECT * FROM customers WHERE email = $1"
      const value = [email]
      const userdata = await pool.query(query, value)
      if (userdata?.rows?.length > 0) {
        return res.status(200).json({ status: 200, customerData: userdata?.rows[0] });
      }

      const newCustomer = {
        // Extract customer details from the request body
        given_name: given_name || "",
        family_name: "",
        email: email || "",
        password: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        bio: "",
        status: 3,
        google_id: id,
        picture: picture
      };

      const insertCustomerQuery = `
          INSERT INTO customers
          (given_name, family_name, email, 
            phone_number, address_line_1, address_line_2, 
            city, state, zip_code, country, bio, status, password, verification_code, 
            verification_expire_date, google_id, picture, verified_with)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          RETURNING *;
        `;

      const insertCustomerValues = [
        newCustomer.given_name,
        newCustomer.family_name,
        newCustomer.email,
        newCustomer.phone_number,
        newCustomer.address_line_1,
        newCustomer.address_line_2,
        newCustomer.city,
        newCustomer.state,
        newCustomer.zip_code,
        newCustomer.country,
        newCustomer.bio,
        newCustomer.status,
        '', // Store the hashed password
        null,
        null,
        newCustomer.google_id,
        newCustomer.picture,
        '{Google}'
      ];

      const { rows } = await pool.query(
        insertCustomerQuery,
        insertCustomerValues
      );

      const insertedCustomerData = rows[0];

      if (insertedCustomerData) {
        return res.status(200).json({ status: 200, customerData: insertedCustomerData });
      }
    } else {
      res.status(200).json({ customerData: checkResult.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(3001, () => {
    console.log("Sever is now listening at port 3001");
  });
  


  // if (!password) {
  //   // If the password is empty, send a response
  //   return res.status(401).json({
  //     status: 401,
  //     message: "This account needs to be logged in with Google",
  //   });
  // }

  // const query = "SELECT * FROM customers WHERE email = $1";
  // const { rows } = await pool.query(query, [email]);

  // if (rows.length === 0) {
  //   return res.status(401).json({ status: 401, message: "Account doesn't exist" });
  // }

  // const hashedPassword = rows[0].password;
  // if (!hashedPassword) {
  //   return res.status(401).json({
  //     status: 401,
  //     message: "This account needs to be logged in with Google",
  //   });
  // }
  // const passwordMatch = await bcrypt.compare(password, hashedPassword);

  // if (!passwordMatch) {
  //   return res.status(401).json({ status: 401, message: "Incorrect password" });
  // }



  // if (rows[0].status === 1) {
  //   return res.status(401).json({ status: 401, message: "Account Blocked, Kindly Contact support for assistance." });
  // }

  // if (rows[0].status === 0) {
  //   const otp = Math.floor(1000 + Math.random() * 9000);
  //   const verificationExpireDate = new Date();
  //   verificationExpireDate.setMinutes(
  //     verificationExpireDate.getMinutes() + 30
  //   );

  //   const toEmail = rows[0].email;
  //   const subject = "Account Verification";
  //   const htmlContent = `
  //       <p>Hello, ${rows[0].given_name} ${rows[0].family_name}</p>
  //       <p>Your verification code is: <strong>${otp}</strong></p>
  //       <p>If you did not request this verification, please ignore this email.</p>
  //     `;

  //   const updateQuery = `
  //     UPDATE customers
  //     SET verification_code = $1, verification_expire_date = $2
  //     WHERE customer_id = $3;
  //   `;

  //   await pool.query(updateQuery, [
  //     otp,
  //     verificationExpireDate,
  //     rows[0].customer_id,
  //   ]);

  //   sendEmail(toEmail, subject, htmlContent)
  //     .then(() => {
  //       return res.status(200).json({
  //         status: 301,
  //         user: rows[0],
  //         message: "Account not verified. An email with verification instructions has been sent to your Gmail account. Please check your Gmail inbox and follow the instructions to verify your account.",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error sending verification email:", error);
  //       return res.status(500).json({
  //         status: 500,
  //         message: "Internal server error. Please try again later.",
  //       });
  //     });
  // } else {
  //   await req.pool.query(
  //     'UPDATE customers SET "customer_loggedid" = $1 WHERE email = $2',
  //     [loggedid, email]
  //   );

  //   const updatedQuery = "SELECT * FROM customers WHERE email = $1";
  //   const { rows: updatedRows } = await pool.query(updatedQuery, [email]);

  //   const customerData = { ...updatedRows[0] };
  //   delete customerData.password;

  //   res.status(200).json({ status: 200, message: "Login successful", loggedid, customerData });
  // }