const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

//get all of the projects


router.get("/", (req, res) => {//working
    Projects.get()
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(500).json({ message: "500 sever messed up" });
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

// put project by id

router.put("/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (!data.name || !data.description) {
        res.status(400).json({ message: "would you please include a name and description" });
    } else {
        Projects.update(id, data)
            .then((post) => {
                if (post) {
                    res.status(400).json({ message: "400 serve haveing issues with the id" });
                }
            });
    }
});

module.exports = router;