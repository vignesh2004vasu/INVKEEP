import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import logoImage from "/src/assets/inventory-management.png"; // Adjust the path to your logo image
import { useUser } from "@/components/UserContext"; // Adjust the path as needed

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user state
    navigate("/login"); // Redirect to the login page
  };

  const publicLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];

  const privateLinks = [
    { title: "Home", path: "/" },
    { title: "Dash", path: "/dashboard" },
    { title: "Admin", path: "/admin/dashboard" },
    { title: "Logout", action: handleLogout },
  ];

  return (
    <nav className="w-full z-50 top-0 h-20 bg-gray-800 text-white shadow-md flex items-center px-6 fixed">
      <div className="flex items-center space-x-4">
        <img src={logoImage} alt="Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold">Invkeep</span>
      </div>
      <ul className="flex items-center space-x-6 flex-1 justify-end px-40 gap-9 ">
        {(!user ? publicLinks : privateLinks).map((link, index) => (
          <li key={index}>
            {link.action ? (
              <button
                onClick={link.action}
                className="font-semibold transition-colors duration-300 text-xl text-gray-300 hover:text-yellow-400"
              >
                {link.title}
              </button>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-xl font-semibold transition-colors duration-300 ${
                    isActive ? "text-yellow-300" : "text-gray-300"
                  } hover:text-yellow-400`
                }
              >
                {link.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
