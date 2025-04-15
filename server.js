const express = require("express");
const { User } = require("./model/userModel");

const app = express()

//middleware
app.use(express.json());

//Endpoint Validatation

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!! , server is runing...",
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password, DOB } = req.body;

  if (!username) {
    res.json({ error: "Username cannot be empty" });
  }
  if (!email) {
    res.json({ error: "Email cannot be empty" });
  }
  if (!password) {
    res.json({ error: "Password cannot be empty" });
  } else {
    if (!8 < password <= 16) {
      res.json({
        error:
          "Password length should be greather than 8 and less than or equal to 16",
      });
    }
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      DOB,
    });

    if (user) {
      res.json({ message: "user created successfully!!" });
    }
  } catch (error) {
    res.json({ error });
  }
});

app.listen(8080)
console.log("Server is runing in localhost:8080")
