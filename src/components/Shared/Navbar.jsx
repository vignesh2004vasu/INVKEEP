import React from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const NavLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
    { title: "Dash", path: "/dashboard" },
    { title: "Admin", path: "/admin/dashboard" },
  ];

  return (
    <nav className="w-full z-50 top-0 h-16 bg-gray-800 text-white shadow-md flex items-center px-6 fixed">
      <div className="text-2xl font-bold flex-1">Invkeep</div>
      <ul className="flex items-center space-x-6 flex-1 justify-end px-40 gap-9">
        {NavLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "text-yellow-300" : "text-gray-300"
                } hover:text-yellow-400`
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
