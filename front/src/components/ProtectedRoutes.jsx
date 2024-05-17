import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';


function ProtectedRoutes({roles}) {
   const isAuthenticated = useSelector((state) => state.auth.user?.user);

  console.log(isAuthenticated);
  return isAuthenticated?.role.includes(roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

ProtectedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoutes


// function ProtectedRoutes ({ roles })  {
//   const isAuthenticated = useSelector((state) => state.authReducer.authData);

//   console.log(isAuthenticated);
//   return isAuthenticated.roles.includes(roles) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// export default ProtectedRoutes;
