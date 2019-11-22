const express = require('express');
const router = express.Router();

let User = require('../models/User');

// @route 	GET
// @descrip User Index
// @access	Public
router.get('/', (req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route 	POST
// @desrip	create a user
// @access	Public
router.post('/add', (req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });

	newUser.save()
		.then(() => res.json('User added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;