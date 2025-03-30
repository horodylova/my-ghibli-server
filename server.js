const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Ghibli picture generation service!</h1>
    <p>API server is working correctly.</p>
  `);
});

 app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
