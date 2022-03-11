/** @format */

import React from "react";
import style from "../../assets/css/components/animatedOverlay.module.css";

export default function AnimatedOverlay(props) {
  const color = {
    color: props.fontColor,
  };
  const bgColor = {
    backgroundColor: props.colorCode,
  };
  const small = {
    background: `linear-gradient(to right,${props.colorCode} ,var(--color-white))`,
    boxShadow: `0px 0px 10px 4px ${props.colorCode}`,
  };
  return (
    <div className={style.pageOverlayContainer} style={color}>
      <div className={style.pageOverlay} style={bgColor}>
        <div
          className={`${style.circle} ${style.xlarge} ${style.shade1}`}
          style={color}
        ></div>
        <div
          className={`${style.circle} ${style.large} ${style.shade2}`}
          style={color}
        ></div>
        <div
          className={`${style.circle} ${style.medium} ${style.shade3}`}
          style={color}
        ></div>
        <div
          className={`${style.circle} ${style.small} ${style.shade4}`}
          style={small}
        ></div>
        <div className={style.content}>{props.children}</div>
      </div>
    </div>
  );
}
