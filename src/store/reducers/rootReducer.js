import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectsReducer from "./projects/reducer";
import employeesReducer from "./employees/reducer";
import timelineReducer from "./timeline/reducer";
export default combineReducers({
  errors: errorReducer,
  projects: projectsReducer,
  employees: employeesReducer,
  timeline: timelineReducer,
});
