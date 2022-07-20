import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import manageEmployeesReducer from "./manageEmployeesSlice";

import manageRolesReducer from "./manageRolesSlice";
import manageSkillsReducer from "./manageSkillsSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    manageEmployees: manageEmployeesReducer,
    manageRoles: manageRolesReducer,
    manageSkills: manageSkillsReducer,
  },
});

export default store;
