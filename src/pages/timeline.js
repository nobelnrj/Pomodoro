/** @format */

import React, { useEffect, useRef, useState } from "react";
import timeLineStyle from "../assets/css/components/timeLine.module.css";
import { getTimeline } from "../store/actions/timeline/action";
import Fade from "react-reveal/Fade";
import AnimatedOverlay from "../components/Projects/animatedOverlay";
import { useSelector, useDispatch } from "react-redux";

export default function TimeLine() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTimeline());
	}, [dispatch]);
	const timeLines = useSelector((state) => state.timeline.timeline);
	const getDateFormated = (dateString) => {
		let date = new Date(dateString);
		let options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		date = date.toLocaleDateString("en-US", options);
		return date;
	};
	const timelineContainer = useRef();
	const [timelineState, updateTimelineState] = useState(1)
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
							<h4 className={timeLineStyle.heading}>{timeline.name}</h4>
							<p className={timeLineStyle.desc}>{timeline.description}</p>
							<p>{timeline.projectLink}</p>
							<p className={timeLineStyle.endDate}>{index === timeLines.length-1 ? "Present" : getDateFormated(timeline.endDate)}</p>
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
					<p className="wrapper-content">
						This timeline gives you a detailed understanding about the path that
						I took to reach the position that I am right now.
					</p>
				</div>
			</AnimatedOverlay>
			<div className={timeLineStyle.timeLineWrapper} ref={timelineContainer}>
				<ul className={timeLineStyle.timeLine}>{buildTimeline()}</ul>
			</div>
			{window.innerWidth < 700 && <div className={timeLineStyle.buttonWrapper}>
				<button onClick={() => {
					updateTimelineState(timelineState === timeLines.length ? 0 : timelineState + 1);
					timelineContainer.current.scroll({
						top: 0,
						left: timelineContainer.current.offsetWidth * timelineState,
						behavior: 'smooth'
					});
				}}>Next Timline</button>
			</div>}
		</div>
	);
}
