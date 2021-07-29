/** @format */

import axios from "axios";
import { GET_EMPLOYEES } from "./types";

export const getEmployees = () => (dispatch) => {
	axios.get("http://localhost:5000/employees/").then((res) =>
		dispatch({
			type: GET_EMPLOYEES,
			payload: res.data,
		})
	);
};
