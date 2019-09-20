import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import pin from "./pin";

export default combineReducers({ auth, project, pin });
