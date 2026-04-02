const express = require("express");
const authRouter = require("./authRoutes");

const indexRouter = express.Router();


indexRouter.use('/auth', authRouter);


module.exports = indexRouter;