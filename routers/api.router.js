const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");

apiRouter.get("/", (req, res) => {
    res.status(200).send({ msg: "Server running ok" });
});

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
