/** @format */

const router = require("express").Router();
let Timeline = require("../models/timeline.model");

router.route("/").get((req, res) => {
	Timeline.find()
		.then((timelines) => res.json(timelines))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const name = req.body.name;
	const startDate = Date.parse(req.body.startDate);
	const endDate = Date.parse(req.body.endDate);
	const projectLink = req.body.projectLink;
	const description = req.body.description;

	const newTimeline = new Timeline({
		name,
		startDate,
		endDate,
		projectLink,
		description,
	});

	newTimeline
		.save()
		.then(() => res.json("Timeline added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
	Timeline.findByIdAndDelete(req.params.id)
		.then(() => res.json("Project deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	Timeline.findById(req.params.id)
		.then((exercise) => {
			exercise.teamLead = req.body.teamLead;
			exercise.projectName = req.body.projectName;
			exercise.description = req.body.description;
			exercise.duration = Number(req.body.duration);
			exercise.projectType = req.body.projectType;
			exercise.colorCode = req.body.colorCode;
			exercise.projectStatus = req.body.projectStatus;
			exercise.startDate = Date.parse(req.body.startDate);
			exercise.tags = req.body.tags;
		})
		.save()
		.then(() => res.json("Project updated!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
