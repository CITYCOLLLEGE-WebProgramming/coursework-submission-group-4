const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');

const Survey = require('../models/survey');

router.get('/', async (req, res) => {

    try {
        const surveys = await Survey.find();
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Upload new survey
router.post('/', upload.single('survey'), async (req, res) => {

    const survey = new Survey( {
        q1: req.body.ques1,
        q2: req.body.ques2,
        q3: req.body.ques3,
        r1: req.body.r1,
        r2: req.body.r2,
        r3: req.body.r3,
        r4: req.body.r4,
        feedback: req.body.r4
    });

    try {

        const newSurvey = await survey.save();

        res.status(201).json(newUser);
    } catch (error) {

        res.status(400).json({message: error.message });
    }
});

module.exports = router;