const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//We SHall Get all of the actions here
router.get("/", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions);
    });
});

// lets make a new action here
router.post("/", (req, res) => {
    const data = req.body;
    if (!data.project_id || !data.description || !data.notes) {
        res.status(400).json({
            message: "400 Missing project id and description what the heck man"
        });
    } else {
        Actions.insert(data).then((action) => {
            res.status(200).json(action);
        });
    }
});

// we shall delete actions here
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(() => res.status(200).json({ message: "deleted the action" }));
});

// we shall put to a action here 
router.put("/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (!data.project_id || !data.description || !data.notes) {
        res.status(400)
            .json({ message: "This requires project id, desciption, and notes" });
    } else {
        Actions.update(id, data).then((action) => {
            if (action) {
                res.status(200).json(actions);
            } else {
                res.status(400).json({ message: "400 serve has no clue man and hes angry about it" });
            }
        });
    }
});

module.exports = router;