const express = require("express");
const router = express.Router();
const axios = require("axios");

exports.value = (req, res) => {
  const { body } = req.body;
  const url =
    "https://mufasa-qa.interswitchng.com/p/lending-service/accept/sandbox/build.js";
  const config = {
    "content-type": "application/json",
  };

  axios
    .post(`${url}`, body, config)
    .then((res) => {
      res.json({
        data: res,
      });
    })
    .catch((err) => {
      res.json({
        data: err,
      });
    });
};

// module.exports = router;
