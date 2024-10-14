const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(cookieParser());

// Function to generate random strings
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

app.get("/check", (req, res) => res.send("It works"));

// Middleware to set cookies for subdomains
app.use((req, res, next) => {
  const subdomains = ["sub1.localhost", "sub2.localhost", "sub3.localhost"];

  subdomains.forEach((subdomain) => {
    const randomValue = generateRandomString(16); // 16-byte random string
    res.cookie("myCookie", randomValue, {
      domain: subdomain, // set cookie for subdomain
      path: "/",
      httpOnly: true,
      secure: false,
    });
  });

  res.send("Cookies set for subdomains on localhost!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
