import { useEffect, useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import AuthLayout from "../layout/AuthLayout";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../redux/slice/authSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/alert/Message";

function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.user);
  const { loading, errorType, error } = useSelector((state) => state.auth);
  console.log(errorType);
  useEffect(() => {
    if (user) {
      // Après une authentification réussie, redirection vers la page spécifique en fonction du rôle de l'utilisateur
      const { role } = user;
      if (role === "Student") {
        navigate("/student", { replace: true });
      } else if (role === "Teacher") {
        navigate("/teacher", { replace: true });
      } else if (role === "Admin") {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, navigate]);
  const [type, setType] = useState("password");
  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const isButtonDisabled = data.password == 0 && data.passwordConfirm == 0;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    const userData = { token, ...data };
    dispatch(resetPassword(userData));
    event.preventDefault();
    // console.log(token,identifier);
  };
  return (
    <AuthLayout
      title="Changement du mot de passe"
      subtitle="Nous vous encourageons à mettre à jour votre mot de passe pour renforcer la sécurité de votre compte."
    >
      <form className="auth__form u-margin-top-extra" onSubmit={handleSubmit}>
        <label htmlFor="" className="auth__form--label label">
          Nouveau mot de passe
        </label>
        <div
          className={`auth__password input--form u-block u-margin-top-small ${
            error && "error"
          }`}
        >
          <input
            type={type}
            name="password"
            value={data.password}
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
        {error && <Message type="error" message={errorType} />}
        <label
          htmlFor=""
          className="auth__form--label label u-block u-margin-top-big"
        >
          Confirmez votre nouveau mot de passe
        </label>
        <div
          className={`auth__password input--form u-block u-margin-top-small ${
            error && "error"
          }`}
        >
          <input
            type={type}
            name="passwordConfirm"
            value={data.passwordConfirm}
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
        Demander un nouveau lien
      </Link>

        <MainButton
          text="Changer le mot de passe"
          isDisabled={isButtonDisabled}
          loading={loading}
        />
      </form>
    </AuthLayout>
  );
}

export default PasswordReset;
