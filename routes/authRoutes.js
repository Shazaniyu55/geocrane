const express= require("express");
const authController = require("../controller/userController");
const {errorHandler} = require("../utils/errorHandle");
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = express.Router();


authRouter.post("/signup", errorHandler(authController.register));
authRouter.post("/login", errorHandler(authController.login));
authRouter.get("/getLoggedInUser", authMiddleware, errorHandler(authController.getUserProfile));




module.exports = authRouter;