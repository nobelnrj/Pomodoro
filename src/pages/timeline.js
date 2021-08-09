/** @format */

import React from "react";
import timeLineStyle from "../assets/css/components/timeLine.module.css";
import Fade from "react-reveal/Fade";
import AnimatedOverlay from "../components/Projects/animatedOverlay";

export default function TimeLine() {
	const timeLines = [
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
		{
			name: "My First Project",
			startDate: "01-01-2021",
			endDate: "07-08-2021",
			projectLink: "Project 1",
			description: "Something about the timeline",
		},
	];
	const getDateFormated = (dateString) => {
		let date = new Date(dateString);
		let options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		console.log(date.toLocaleDateString("en-US", options));
		date = date.toLocaleDateString("en-US", options);
		return date;
	};
	const buildTimeline = () => {
		return timeLines.map((timeline, index) => {
			return (
				<li
					key={index}
					className={`${timeLineStyle.timeLineItem} ${timeLineStyle.timeLineItemActive}`}>
					<Fade top>
						<span className={timeLineStyle.timeLineItemStartDate}>
							{getDateFormated(timeline.startDate)}
						</span>
					</Fade>
					<span
						className={`${timeLineStyle.timeLineItemLine} ${
							index % 2 === 0
								? timeLineStyle.timeLineItemLineEven
								: timeLineStyle.timeLineItemLineOdd
						}`}></span>
					<div
						className={`${timeLineStyle.timeLineItemDetails} ${
							index % 2 === 0
								? timeLineStyle.timeLineItemDetailsEven
								: timeLineStyle.timeLineItemDetailsOdd
						}`}>
						<Fade>
							<h4>{timeline.name}</h4>
							<p>{timeline.description}</p>
							<p>{timeline.projectLink}</p>
							<p>{timeline.endDate}</p>
						</Fade>
					</div>
				</li>
			);
		});
	};
	return (
		<div className="wrapper-box">
			<AnimatedOverlay colorCode="#3131f3">
				<div className={timeLineStyle.content}>
					<h3 className="wrapper-heading">Timeline</h3>
					<p>
						This timeline gives you a detailed understanding about the path that
						I took to reach the position that I am right now.
					</p>
				</div>
			</AnimatedOverlay>
			<div className={timeLineStyle.timeLineWrapper}>
				<ul className={timeLineStyle.timeLine}>{buildTimeline()}</ul>
			</div>
		</div>
	);
}
