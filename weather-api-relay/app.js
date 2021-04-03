// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Allow CORS from any origin
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.airvisual.com/v2/city?city=Melbourne&state=Victoria&country=Australia&key=${process.env.API_KEY}`
    );    
    
    const results = await response.json();
    
    console.log(response);

    return res.json({
      success: true,
      results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);
