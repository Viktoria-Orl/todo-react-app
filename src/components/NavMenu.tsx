import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../icons/homeButton.svg";
import { ReactComponent as StatisticsButton } from "../icons/statisticsButton.svg";
import styles from './NavMenu.module.scss';

function NavMenu() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navMenu}>
        <button>
          <NavLink to="/">
            <HomeIcon />
          </NavLink>
        </button>
        <button>
          <NavLink to="/statistics">
            <StatisticsButton />
          </NavLink>
        </button>
      </nav>
    </div>
  );
}

export default NavMenu;
