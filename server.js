const express = require("express");
const server = express();

const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");
server.use(express.json());
server.use("/api/actions", logger, actionsRouter);
server.use("/api/projects", logger, projectsRouter);

server.get("/", (req, res) => {
    res.send(`were green red leader `);
});

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

module.exports = server;