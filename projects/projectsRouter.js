const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

//first the get request

router.get("/", (req, res) => {
    Projects.get()
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(500).json({ message: "500 sever messed up" });
        });
});
module.exports = router;