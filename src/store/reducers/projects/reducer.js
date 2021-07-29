/** @format */

import {
	GET_PROJECTS,
	REMOVE_PROJECT,
	GET_PROJECTBYID,
} from "../../actions/projects/types";
const initialState = {
	projects: [],
	projectById: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				projects: action.payload,
			};
		case GET_PROJECTBYID:
			return {
				projectById: action.payload,
			};
		case REMOVE_PROJECT:
			return {
				projects: state.projects.filter((el) => el._id !== action.payload),
			};
		default:
			return state;
	}
}
