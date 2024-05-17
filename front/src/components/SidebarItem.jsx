import {Link} from 'react-router-dom'

function SidebarItem({ to, icon, text, activeLink, onClick }) {
    return (
        <Link
          exact
          to={to}
          className={`sidebar__menu--link ${activeLink === text ? "active" : ""}`}
          onClick={() => onClick(text)}
        >
          <li className="sidebar__menu--item">
            {icon}
            <span className="sidebar__menu--text">{text}</span>
          </li>
        </Link>
      );
}

export default SidebarItem
