const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket");
const multipart = require("connect-multiparty")
const multipartMiddleware = multipart({ uploadDir: "./uploads" });

router.get("/ticket", controller.getAll);

router.get("/ticket/:id?", controller.getById);

router.get("/ticket/isActive/:isActive?", controller.getByActive);

router.post("/ticket", controller.post);

router.post("/ticket/:id?", multipartMiddleware, controller.uploadFile);

router.delete("/ticket/:id?", controller.delete);

router.put("/ticket/:id?", controller.update);


module.exports = router;