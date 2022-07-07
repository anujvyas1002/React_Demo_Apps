import { Navigate, useOutlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "./Navbar";

export const EmployeesLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <Navbar
        pages={[
          { label: "Employee", path: "/manageEmployees" },
          { label: "Skills", path: "/manageSkills" },
          { label: "Roles", path: "/manageRoles" },
          { label: "DashBoard", path: "/dashboard" },
        ]}
      />
      {outlet}
    </div>
  );
};
