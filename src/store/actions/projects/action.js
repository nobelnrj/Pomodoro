/** @format */

import axios from "axios";
import { GET_PROJECTS, REMOVE_PROJECT, GET_ERRORS } from "../types";

export const getProjects = () => (dispatch) => {
	axios.get("http://localhost:5000/projects/").then((res) =>
		dispatch({
			type: GET_PROJECTS,
			payload: res.data,
		})
	);
};

export const removeProject = (id) => (dispatch) => {
	axios.delete("http://localhost:5000/projects/" + id).then((res) =>
		dispatch({
			type: REMOVE_PROJECT,
			payload: id,
		})
	);
};
