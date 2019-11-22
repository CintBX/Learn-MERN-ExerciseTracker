const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { 
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB connected...");
});


// Routes
const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

// Use Routes
app.use('/users', userRouter);
app.use('/exercises', exerciseRouter);


// Server connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));