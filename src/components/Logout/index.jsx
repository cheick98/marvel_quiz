import React, { useEffect, useState } from "react";
import { logoutUser } from "../Firebase/firebase";
import ReactToolTip from "react-tooltip";

const Logout = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      logoutUser();
    }
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactToolTip place="left" effect="solid" />
    </div>
  );
};

export default Logout;
