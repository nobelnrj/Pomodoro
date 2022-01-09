/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjectById } from "../store/actions/projects/action";
import style from "../assets/css/pages/viewPage.module.css";
import AnimatedOverlay from "../components/Projects/animatedOverlay";
import ProjectInfobox from "../components/Projects/ProjectInfobox";

export default function ViewProject(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProjectById(props.match.params.id));
	}, [dispatch, props.match.params.id]);
	const project = useSelector((state) => state.projects.projects);
	console.log(project);
	const projectColor = {
		backgroundColor: project.colorCode,
		opacity: 0.6,
	};
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
	return (
		<div className="wrapper-box overlayWrapper">
			<div className="overlay" style={projectColor}></div>
			<div className={style.contentWrapper}>
				<AnimatedOverlay colorCode={project.colorCode}>
					<h3 className="wrapper-heading">{project.projectName}</h3>
					<p className="wrapper-content">{project.description}</p>
				</AnimatedOverlay>
				<h3 className="wrapper-heading" style={{ marginTop: window.innerWidth < 700 ? "20px":"50px" }}>
					Project Details
				</h3>
				<div className={style.infoWrapper}>
					<ProjectInfobox
						name="Status"
						value={project.projectStatus}
						colorCode={project.colorCode}
					/>
					<ProjectInfobox
						name="Duration"
						value={project.duration}
						colorCode={project.colorCode}
					/>
					<ProjectInfobox
						name="Started On"
						value={getDateFormated(project.startDate)}
						colorCode={project.colorCode}
					/>
					<ProjectInfobox
						name="Developed By"
						value={project.teamLead}
						colorCode={project.colorCode}
					/>
					<ProjectInfobox
						name="Project Type"
						value={project.projectType}
						colorCode={project.colorCode}
					/>
				</div>
			</div>
		</div>
	);
}
