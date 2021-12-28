const router = require('express').Router();
let Project = require('../models/project.model');

// router.route('/').get((req, res) => {
//   Project.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/").get(paginatedResults(), (req, res) => {
	res.json(res.paginatedResults);
});

function paginatedResults() {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const skipIndex = (page - 1) * limit;
		const results = {};

		try {
			results.results = await Project.find()
				.sort({ _id: 1 })
				.limit(limit)
				.skip(skipIndex)
				.exec();
			res.paginatedResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: "Error Occured" });
		}
	};
}

router.route('/add').post((req, res) => {
  const teamLead = req.body.teamLead;
	const projectName = req.body.projectName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const projectType = req.body.projectType;
	const colorCode = req.body.colorCode;
	const projectStatus = req.body.projectStatus;
  const startDate = Date.parse(req.body.startDate);
	const tags = req.body.tags;

	const newExercise = new Project({
		teamLead,
		projectName,
		description,
		duration,
		projectType,
		colorCode,
		projectStatus,
		startDate,
		tags,
	});

  newExercise
		.save()
		.then(() => res.json("Project added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
		.then(() => res.json("Project deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id)
		.then(exercise => {
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