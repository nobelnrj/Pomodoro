/** @format */

import React from "react";
import progressBarStyle from "../../assets/css/components/progressBar.module.css";

export default function ProgressBar(props) {
  const progressBar = {
    width: props.percentage + "%",
    backgroundColor: props.progressColor,
  };
  return (
    <div>
      <p className={progressBarStyle.heading}>Progress</p>
      <div className={progressBarStyle.bar}>
        <div className={progressBarStyle.progress} style={progressBar}></div>
      </div>
      <p className={progressBarStyle.info}>{props.percentage}%</p>
    </div>
  );
}
