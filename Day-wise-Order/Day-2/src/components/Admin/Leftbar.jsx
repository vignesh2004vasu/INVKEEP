import React from "react";
import { NavLink } from "react-router-dom";

const Leftbar = () => {
  const NavLinks = [
    { title: "Users", path: "/admin/users" },
    { title: "Products", path: "/admin/products" },
    { title: "Sales", path: "/admin/sales" },
    { title: "Supplier", path: "/admin/suppliers" },
    { title: "Review", path: "/admin/reviews" },
    { title: "Purchase", path: "/admin/purchases" },
    { title: "Bonk", path: "/admin/bonk" },
    
    
  ];
  
  return (
    <div className="h-70 z-10 w-52 flex justify-center items-center flex-col bg-gray-800 pt-10">
      <div className="h-5/6 w-full flex flex-col justify-start items-center mt-10">
        {NavLinks.map((link, index) => (
          <li key={index} className="list-none mb-4">
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
          </li>
        ))}
      </div>
      <div className="h-1/6 w-full flex flex-col justify-center items-center">
       
      </div>
    </div>
  );
};

export default Leftbar;
