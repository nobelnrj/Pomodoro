/** @format */

import axios from "axios";
import {
  GET_PROJECTS,
  REMOVE_PROJECT,
  GET_PROJECTBYID,
  GET_PROJECTS_ALLTAGS,
  POST_PROJECT,
} from "./types";
import { DefaultEndpoint } from "../../../config";

export const getProjects = () => (dispatch) => {
  axios.get(`${DefaultEndpoint}/projects/`).then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.results,
    })
  );
};

export const getProjectAllTags = () => (dispatch) => {
  axios.get(`${DefaultEndpoint}/projects/`).then((res) => {
    let tags = [];
    res.data.results.forEach((project) => {
      if (project.tags !== undefined) {
        tags = tags.concat(project.tags);
      }
    });
    tags = Array.from(new Set(tags));
    dispatch({
      type: GET_PROJECTS_ALLTAGS,
      payload: tags,
    });
  });
};

export const getProjectById = (id) => (dispatch) => {
  axios.get(`${DefaultEndpoint}/projects/` + id).then((res) =>
    dispatch({
      type: GET_PROJECTBYID,
      payload: res.data,
    })
  );
};

export const postProject = (data) => (dispatch) => {
  axios.post(`${DefaultEndpoint}/projects/add`, data).then((res) =>
    dispatch({
      type: POST_PROJECT,
      payload: res.data,
    })
  );
};

export const removeProject = (id) => (dispatch) => {
  axios.delete(`${DefaultEndpoint}/projects/` + id).then((res) =>
    dispatch({
      type: REMOVE_PROJECT,
      payload: id,
    })
  );
};
