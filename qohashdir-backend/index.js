const express = require("express");
const cors = require('cors');
const router = require('./router');
const config = require('./config');

const PORT = process.env.PORT || 3001;

const app = express();
/**
 * To address the cors policy, should not go in production
 */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(config.app.baseUrl, router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});