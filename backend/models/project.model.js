const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		teamLead: { type: String, required: true },
		projectName: { type: String, required: true },
		description: { type: String, required: true },
		duration: { type: Number, required: true },
		teamMembers: { type: Array, required: false },
		projectType: { type: String, required: true },
		colorCode: { type: String, required: false },
		projectStatus: { type: String, required: true },
		startDate: { type: Date, required: true },
		tags: { type: Array, required: false },
	},
	{
		timestamps: true,
	}
);

const Projects = mongoose.model("Project", projectSchema);

module.exports = Projects;