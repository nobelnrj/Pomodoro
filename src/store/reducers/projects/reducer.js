/** @format */

import {
  GET_PROJECTS,
  REMOVE_PROJECT,
  GET_PROJECTBYID,
  GET_PROJECTS_ALLTAGS,
  POST_PROJECT,
} from "../../actions/projects/types";
const initialState = {
  projects: [],
  projectById: [],
  tags: [],
  postResponse: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        projects: action.payload,
        tags: state.tags,
      };
    case GET_PROJECTBYID:
      return {
        projectById: action.payload,
      };
    case GET_PROJECTS_ALLTAGS:
      return {
        projects: state.projects,
        tags: action.payload,
      };
    case POST_PROJECT:
      return {
        projects: state.projects,
        postResponse: action.payload,
      };
    case REMOVE_PROJECT:
      return {
        projects: state.projects.filter((el) => el._id !== action.payload),
      };
    default:
      return state;
  }
}
