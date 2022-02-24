/** @format */

import React from "react";
import style from "../../assets/css/components/projectInfobox.module.css";
import Fade from "react-reveal/Fade";

export default function ProjectInfobox(props) {
	const background = {
		background: `linear-gradient(to right,${props.colorCode} 60%,${props.colorCode} 20%)`,
		boxShadow: `5px 7px 5px -1px ${props.colorCode}`,
	};
	return (
		<div className={style.projectInfoBox} style={background}>
			<Fade left>
				<span>{props.name}</span>
				<span>{props.value}</span>
			</Fade>
		</div>
	);
}
