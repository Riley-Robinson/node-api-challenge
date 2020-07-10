const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();


router.get("/", (req, res) => {//working
    Projects.get()
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(500).json({ message: "500 internal sever error"});
        });
});


//posting of the project
router.post("/", (req, res) => {
    const data = req.body;
    if (!data.name || !data.description) {
        res.status(400).json({ message: "400 im sorry lad but your missing the name and description" });
    } else {
        Projects.insert(data)
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((err) => {
                res.status(500).json({ message: "500 sever had a error" });
            });
    }
});

//get a project by id request
router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
        .then((project) => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(400).json({ message: "400" });
            }
        });
});

//delete a project by id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(() => res.status(200).json({ message: "Project has been deleted" }));
});

module.exports = router; 