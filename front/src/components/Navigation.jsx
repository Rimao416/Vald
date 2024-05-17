import { useState, useRef, useEffect } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Link } from "react-router-dom";
import inbox from "../assets/icons/inbox.svg";
import profile from "../assets/icons/profile.svg";
import logout from "../assets/icons/logout.svg";
import settings from "../assets/icons/settings.svg";
import task from "../assets/icons/task.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Navigation({ inactive, setInactive }) 
{
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.clear()
    window.location.href = "/login"
    
  }
  const menuRef = useRef(null);
  const linkRef = useRef(null);
  const user = useSelector((state) => state.auth.user?.user);
  console.log(user);
  useEffect(() => {
    // Ajouter un écouteur d'événements au document pour détecter les clics
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false); // Fermer le menu si le clic est en dehors du menu
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      // Supprimer l'écouteur d'événements lorsque le composant est démonté
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);
  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setToggle((toggle) => !toggle); // Inverser la valeur de showMenu lorsqu'on clique sur l'élément <a>
  };
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className={`layout  ${inactive ? "layout--inactive" : ""}`}>
        <div className="layout__navigation">
          <span
            className="layout__navigation--left"
            onClick={() => setInactive(!inactive)}
          >
            <CgMenuLeftAlt />
          </span>

          <div className="layout__navigation--right">
            <div
              className="layout__navigation__users"
              onClick={handleMenuToggle}
              ref={linkRef}
            >
              {/* <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="layout__navigation__users--img"
              /> */}
              <div className="layout__navigation__users--details">
                <p>{user.name + " " + user.lastname}</p>
                <p>{user.role === "Student" ? "Etudiant" : "Administrateur"}</p>
              </div>
            </div>
            {toggle && (
              <ul ref={menuRef} className="users__profile">
                <Link to="/" className="users__profile--link">
                  <li className="users__profile--item">
                    <img src={profile} className="users__profile--img" alt="" />
                    Profile
                  </li>
                </Link>
                <Link to="/" className="users__profile--link">
                  <li className="users__profile--item">
                    <img src={inbox} className="users__profile--img" alt="" />
                    Messagerie
                  </li>
                </Link>
                <Link to="/" className="users__profile--link">
                  <li className="users__profile--item">
                    <img src={task} className="users__profile--img" alt="" />
                    Gestionnaire
                  </li>
                </Link>
                <Link to="/" className="users__profile--link">
                  <li className="users__profile--item">
                    <img
                      src={settings}
                      className="users__profile--img"
                      alt=""
                    />
                    Paramètres
                  </li>
                </Link>
                <Link to="#" className="users__profile--link">
                  <li className="users__profile--item" onClick={handleLogout}>
                    <img src={logout} className="users__profile--img" alt="" />
                    Déconnexion
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Navigation.propTypes = {
  inactive: PropTypes.bool.isRequired,
  setInactive: PropTypes.func.isRequired,
};
export default Navigation;
