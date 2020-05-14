const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket");

router.get("/ticket", controller.getAll);

router.get("/ticket/:id", controller.getDetails);

router.post("/ticket", controller.post);

router.delete("/ticket", controller.delete);

router.put("/ticket", controller.put);


module.exports = router;