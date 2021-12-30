/** @format */

import axios from "axios";
import { GET_TIMELINE, REMOVE_TIMELINE, POST_TIMELINE } from "./types";
import { DefaultEndpoint } from "../../../config";

export const getTimeline = () => (dispatch) => {
	axios.get(`${DefaultEndpoint}/timeline/`).then((res) =>
		dispatch({
			type: GET_TIMELINE,
			payload: res.data,
		})
	);
};

export const postTimeline = (data) => (dispatch) => {
	axios.post(`${DefaultEndpoint}/timeline/add`, data).then((res) =>
		dispatch({
			type: POST_TIMELINE,
			payload: res.data,
		})
	);
};

export const removeTimeline = (id) => (dispatch) => {
	axios.delete(`${DefaultEndpoint}/timeline/` + id).then((res) =>
		dispatch({
			type: REMOVE_TIMELINE,
			payload: id,
		})
	);
};
