import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import ForgetPassword from "../ForgetPassword";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import SignUp from "../Signup";
import Welcome from "../Welcome";
import "../../App.css";
import { IconContext } from "react-icons";

const App = () => {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
};

export default App;
