/** @format */

import axios from "axios";
import { GET_EMPLOYEES } from "./types";
import { DefaultEndpoint } from "../../../config";

export const getEmployees = () => (dispatch) => {
  axios.get(`${DefaultEndpoint}/employees/`).then((res) =>
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    })
  );
};
