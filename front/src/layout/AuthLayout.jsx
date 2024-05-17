import Alumi from "../assets/img/diploma.png";
import PropTypes from "prop-types";
function AuthLayout({title,subtitle,children}) {
  return (
    <div className="auth">
    <div className="auth__wrapper u-center-text">
      <img src={Alumi} alt="" className="auth__logo" />

      <div className="auth__header u-margin-top-big">
        <span className="auth__header--title">{title}</span>
        <span className="auth__header--sub-title">
          
          {subtitle}
        </span>
      </div>
      {children}
      
    </div>
  </div>
  )
}
AuthLayout.propTypes = {
  // Déclarez toutes les props attendues avec leurs types
  title: PropTypes.string.isRequired,
  subtitle:PropTypes.string.isRequired,
  children:PropTypes.node.isRequired
};

export default AuthLayout
