/** @format */

import axios from "axios";
import { GET_TIMELINE, REMOVE_TIMELINE, POST_TIMELINE } from "./types";

export const getTimeline = () => (dispatch) => {
	axios.get("http://localhost:5000/timeline/").then((res) =>
		dispatch({
			type: GET_TIMELINE,
			payload: res.data,
		})
	);
};

export const postTimeline = (data) => (dispatch) => {
	axios.post("http://localhost:5000/timeline/add", data).then((res) =>
		dispatch({
			type: POST_TIMELINE,
			payload: res.data,
		})
	);
};

export const removeTimeline = (id) => (dispatch) => {
	axios.delete("http://localhost:5000/timeline/" + id).then((res) =>
		dispatch({
			type: REMOVE_TIMELINE,
			payload: id,
		})
	);
};
