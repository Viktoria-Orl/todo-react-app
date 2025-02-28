import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../icons/homeButton.svg";
import { ReactComponent as StatisticsButton } from "../icons/statisticsButton.svg";
import './NavMenu.css';

function NavMenu() {
  return (
    <div className="nav-menu__container">
      <nav className="nav-menu">
        <button className="nav-menu__homepage">
          <NavLink to="/">
            <HomeIcon />
          </NavLink>
        </button>
        <button className="nav-menu__statisticPage">
          <NavLink to="/statistics">
            <StatisticsButton />
          </NavLink>
        </button>
      </nav>
    </div>
  );
}

export default NavMenu;
