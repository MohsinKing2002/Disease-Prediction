import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div class="py-2 block text-gray-500 text-base sm:text-center dark:text-gray-400">
      © 2024{" "}
      <NavLink to="/" className="hover:underline cursor-pointer">
        Disease Predico™
      </NavLink>
      . All Rights Reserved.
    </div>
  );
};

export default Footer;
