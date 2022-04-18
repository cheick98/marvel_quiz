import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser, user, setDoc } from "../Firebase/firebase";

const SignUp = () => {
  const redirection = useNavigate();

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signupUser(email, password)
      .then((authUser) => {
        return setDoc(
          user(authUser.user.uid),
          { pseudo: pseudo, email: email },
          { merge: true },
          { capital: true }
        );
      })
      .then(() => {
        setLoginData(data);
        setError("");
        redirection("/welcome");
      })
      .catch((error) => {
        setError(error.message);
        // setLoginData(data);
      });
  };

  // gestion des erreurs
  const errorMsg = error !== "" && <span> {error} </span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={pseudo}
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={password}
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={confirmPassword}
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
