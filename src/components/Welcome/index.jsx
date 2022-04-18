import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user, getDoc } from "../Firebase/firebase";

import Logout from "../Logout";
import Quiz from "../Quiz";
import Loader from "../Loader";

const Welcome = () => {
  const redirection = useNavigate();

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user
        ? setUserSession(user)
        : setTimeout(() => {
            redirection("/");
          }, 1000);
    });

    //Pour recuperer les données dans firebase
    if (userSession !== null) {
      getDoc(user(userSession.uid))
        .then((doc) => {
          if (doc.exists()) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [userSession]);

  return userSession === null ? (
    <Loader
      loadingMsg="Authentification ..."
      styling={{ color: "#FFFFFF", textAlign: "center" }}
    />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
