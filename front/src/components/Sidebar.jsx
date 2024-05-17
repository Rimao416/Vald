import PropTypes from "prop-types";
import { useState } from "react";

import { RxDashboard } from "react-icons/rx";

import { FaChalkboardTeacher, FaUniversity } from "react-icons/fa";

import { HiMiniAcademicCap } from "react-icons/hi2";
import { MdClass } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import SidebarItem from "./SidebarItem";
const sidebarLinks = {
  Admin: [
    { to: "/payments", icon: <RxDashboard />, text: "Paiements" },

    {
      to: "/admin/students",
      icon: <FaChalkboardTeacher />,
      text: "Gestion des étudiants",
    },
    {
      to: "/admin/class",
      icon: <SiGoogleclassroom />,
      text: "Gestion des classes",
    },
    {
      to: "/admin/notifs",
      icon: <FaUniversity />,
      text: "Gestion des notifications",
    },
    {
      to: "/admin/rapport",
      icon: <FaUniversity />,
      text: "Gestion des rapports",
    },
  ],
  Teacher: [
    {
      to: "/teacher/dashboard",
      icon: <RxDashboard />,
      text: "Tableau de bord",
    },
  ],
  Student: [
    {
      to: "/payment",
      icon: <RxDashboard />,
      text: "Tableau de bord",
    },
  ],
};
const Sidebar = ({ inactive }) => {
  const { user } = JSON.parse(localStorage.getItem("profile"));
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const userLinks = sidebarLinks[user.role] || [];

  return (
    <div className={`sidebar ${inactive ? "sidebar--inactive" : ""}`}>
      <div className="sidebar__wrapper">
        <img src="" className="sidebar__wrapper--top" alt="" />
      </div>
      <div className="sidebar__divider"></div>
      <div className="sidebar__navigation u-block u-margin-top-extra">
        <ul className="sidebar__menu">
          {userLinks.map((link, index) => (
            <SidebarItem
              key={index}
              to={link.to}
              icon={link.icon}
              text={link.text}
              activeLink={activeLink}
              onClick={handleLinkClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  inactive: PropTypes.bool,
};

export default Sidebar;
