const express = require("express");
const server = express();

const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");
server.use(express.json());
server.use("/api/actions", logger, actionsRouter);
server.use("/api/projects", logger, projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>We've got a right to partyyy</h2>`);
});

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

module.exports = server;
