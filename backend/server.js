const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const projectsRouter = require('./routes/projects');
const employeesRouter = require('./routes/employees');
const timelineRouter = require("./routes/timeline");

require("dotenv").config();

const app = express();

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/projects", projectsRouter);
app.use("/employees", employeesRouter);
app.use("/timeline", timelineRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
