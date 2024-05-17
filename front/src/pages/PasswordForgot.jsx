import MainButton from "../components/MainButton";
import AuthLayout from "../layout/AuthLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../components/alert/Message";
import { toast } from "react-toastify";
function PasswordForgot() {
  const [identifier, setIdentifier] = useState("");
  const [userExists, setUserExists] = useState({
    exists: null,
    status: "sdfsd",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const isButtonDisabled = identifier.length == 0;
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const API = axios.create({ baseURL: "http://localhost:5000" });
    try {
      await API.post("/api/v1/users/forgotPassword", {
        identifier,
      }).then((res) => {
        console.log(res);
        res.data.status === "success"
          ? setUserExists({
              exists: true,
              message: res.data.message,
              status: res.data.status,
            })
          : setUserExists({
              exists: false,
              message: res.data.message,
              status: res.data.status,
            });
      });
    } catch (error) {
      setUserExists({
        exists: false,
        message: error.response.data.message,
        status: error.response.data.status,
      });
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <AuthLayout
      title="Mot de passe oublié ?"
      subtitle={
        userExists.exists
          ? userExists.message
          : "Veuillez entrer votre adresse e-mail ou votre numéro de code afin de procéder à la réinitialisation de votre mot de passe"
      }
    >
      {!userExists.exists && (
        <form className="auth__form u-margin-top-extra" onSubmit={handleSubmit}>
          <label htmlFor="" className="auth__form--label label">
            Adresse mail / Code Unique
          </label>
          <input
            type="text"
            className={`auth__form--input input--form u-margin-top-small ${
              userExists.status === "fail" && "error"
            }`}
            name="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Link to="/login" className="auth__register-link u-block">
            Retourner à la connexion
          </Link>
          <MainButton
            text="Envoyer"
            isDisabled={isButtonDisabled}
            loading={loading}
          />
        </form>
      )}
    </AuthLayout>
  );
}

export default PasswordForgot;
