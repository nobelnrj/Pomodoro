/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timelineSchema = new Schema(
	{
		name: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		projectLink: { type: Array, required: false },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
