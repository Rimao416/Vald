import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";
// import { logIn } from "../redux/actions/AuthAction";
import MainButton from "../components/MainButton";
import { login } from "../redux/slice/authSlice";
import AuthLayout from "../layout/AuthLayout";
// import { login } from "../redux/slice/authSlice";
function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user?.user);
  const {loading}=useSelector((state)=>state.auth)
  console.log(user);
  useEffect(() => {
    if (user) {
      // Après une authentification réussie, redirection vers la page spécifique en fonction du rôle de l'utilisateur
      const { role } = user;
      if (role === "Student") {
        navigate("/payment", { replace: true });
      } else if (role === "Teacher") {
        navigate("/home", { replace: true });
      } else if (role === "Admin") {
        navigate("/payments", { replace: true });
      }
    }
  }, [user, navigate]);
  const [type, setType] = useState("password");
  const dispatch = useDispatch();
  // const user=

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    // console.log(user)
    dispatch(login(data));
  };
  const isButtonDisabled =
    data.identifier.length == 0 || data.password.length == 0;
  console.log(isButtonDisabled);
  return (
    <AuthLayout
      title={"Connexion"}
      subtitle={"Utiliser votre adresse de connexion ou votre adresse mail"}
    >
      <form className="auth__form u-margin-top-extra" onSubmit={handleSubmit}>
        <label htmlFor="" className="auth__form--label label">
          Adresse mail
        </label>
        <input
          type="text"
          className={`auth__form--input input--form u-margin-top-small`}
          name="identifier"
          onChange={handleChange}
        />
        <label
          htmlFor=""
          className="auth__form--label u-margin-top-medium label"
        >
          Mot de passe
        </label>
        <div className="auth__password input--form u-block u-margin-top-small">
          <input
            type={type}
            name="password"
            className="auth__password--input"
            onChange={handleChange}
          />
          <span
            className="auth__password--eye"
            onClick={() => setType(type === "password" ? "text" : "password")}
          >
            {type === "password" ? <PiEyeSlash /> : <PiEye />}
          </span>
        </div>
        <Link to="/password-forgot" className="auth__register-link u-block">
          Mot de passe Oublié
        </Link>
        <MainButton text="Connexion" isDisabled={isButtonDisabled} type="submit" classname="main-button"  loading={loading}/>
      </form>
    </AuthLayout>
  );
}

export default Login;
