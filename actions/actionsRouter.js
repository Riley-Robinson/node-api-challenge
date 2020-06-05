const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//We SHall Get all of the actions here
router.get("/", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions);
    });
});

module.exports = router;