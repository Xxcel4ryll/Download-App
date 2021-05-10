const express = require("express");
const router = express.Router();

const { download } = require("../controllers/main.controllers");

router.get("/download", download);

module.exports = router;
