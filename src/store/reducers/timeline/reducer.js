/** @format */

import {
  GET_TIMELINE,
  REMOVE_TIMELINE,
  POST_TIMELINE,
} from "../../actions/timeline/types";
const initialState = {
  timeline: [],
  postResponse: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMELINE:
      return {
        timeline: action.payload,
      };
    case POST_TIMELINE:
      return {
        postResponse: action.payload,
      };
    case REMOVE_TIMELINE:
      return {
        timeline: state.timeline.filter((el) => el._id !== action.payload),
      };
    default:
      return state;
  }
}
