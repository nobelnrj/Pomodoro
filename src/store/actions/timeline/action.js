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

