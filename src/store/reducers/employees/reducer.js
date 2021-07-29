/** @format */

import { GET_EMPLOYEES } from "../../actions/employees/types";
const initialState = {
	employees: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_EMPLOYEES:
			return {
				employees: action.payload,
			};
		default:
			return state;
	}
}
