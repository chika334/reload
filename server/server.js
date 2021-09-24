const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const value = require("./routes/value")

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: true }));
}

app.use("/api", value);
// app.use("/api/user/location", location);

// port
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});