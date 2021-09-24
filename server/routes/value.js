const express = require("express");
const router = express.Router();

const { value } = require("../controller/value");

router.post("/value/data", value);


module.exports = router;