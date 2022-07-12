import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import { Login } from "./pages/Authentication/Login";
import { Registration } from "./pages/Authentication/Registration";
import { HomeLayout } from "./components/HomeLayout";
import { EmployeesLayout } from "./components/EmployeesLayout";
import { EmployeeTable } from "./pages/ManageEmployees/EmployeeTable";
import { Home } from "./pages/DashBoard/Home";
import { NotFound } from "./components/NotFound";
import { SkillTable } from "./pages/ManageSkills/SkillTable";
import { RolesTable } from "./pages/ManageRoles/RolesTable";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Route>

          <Route element={<EmployeesLayout />}>
            <Route path="/manageEmployees" index element={<EmployeeTable />} />
            <Route path="/manageSkills" element={<SkillTable />} />
            <Route path="/manageRoles" element={<RolesTable />} />
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

