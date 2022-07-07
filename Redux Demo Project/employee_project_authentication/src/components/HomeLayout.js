import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "./Navbar";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/manageEmployees" replace />;
  }

  return (
    <div>
      <Navbar
        pages={[
          { label: "Login", path: "/login" },
          { label: "Registration", path: "/registration" },
        ]}
      />
      {outlet}
    </div>
  );
};
