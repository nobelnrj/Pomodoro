import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projects/reducer";
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	projects: projectsReducer,
});