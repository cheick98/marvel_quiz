import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Firebase/firebase";

const Login = () => {
  const redirection = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");

        redirection("/welcome");
      })
      .catch((error) => {
        setError(error.message);

        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span> {error} </span>}
            <h2>Connexion</h2>
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
              <div className="inputBox">
                <input
                  type="password"
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled>Connexion</button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié ? Récupérez-le ici
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
