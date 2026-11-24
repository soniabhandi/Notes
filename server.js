require("dotenv").config();

const app = require("./src/app");

app.listen(3000, () => {
  console.log("Successfully connected to 3000");
});
