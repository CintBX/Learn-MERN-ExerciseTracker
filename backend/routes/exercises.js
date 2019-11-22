const express = require('express');
const router = express.Router();

let Exercise = require('../models/Exercise');

// @route 	GET INDEX
// @descrip Displays All Exercises
// @access 	Public
router.get('/', (req, res) => {
	Exercise.find()
		.then(exercises => res.json(exercises))
		.catch(err => res.status(400).json('Error: ' + err));
});


// @route 	POST NEW
// @descrip	Creates a New Exercise
// @access	Public (for now?)
router.post('/add', (req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({ username, description, duration, date });

	newExercise.save()
		.then(() => res.json('New exercise added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route 	GET SHOW
// @descrip Displays One Exercise
// @access 	Public
router.get('/:id', (req, res) => {
	Exercise.findById(req.params.id)
		.then(exercise => res.json(exercise))
		.catch(err => res.status(400).json('Error ' + err));
});


// @route		DELETE
// @descrip	Deletes an Exercise
// access 	Public(for now)
router.delete('/:id', (req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});


// @route		POST UPDATE
// @descrip	Edits/Updates an Exercise Details
// access 	Public(for now)
router.post('/update/:id', (req, res) => {
	Exercise.findById(req.params.id)
		.then(exercise => {
			exercise.username = req.body.username;
			exercise.description = req.body.description;
			exercise.duration = Number(req.body.duration);
			exercise.date = Date.parse(req.body.date);

			exercise.save()
				.then(() => res.json('Exercise updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;