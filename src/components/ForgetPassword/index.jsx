import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { passwordReset } from "../Firebase/firebase";

const ForgetPassword = () => {
  const redirection = useNavigate();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consulter votre email ${email} pour changer le mot de passe`
        );
        setEmail("");

        setTimeout(() => {
          redirection("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error.message);
        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
                {success}
              </span>
            )}
            {error && <span> {error} </span>}
            <h2>Mot de passe oublié ?</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit ? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
