import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projects/reducer";
import employeesReducer from "./employees/reducer";
import timelineReducer from "./timeline/reducer";
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	projects: projectsReducer,
	employees: employeesReducer,
	timeline: timelineReducer,
});