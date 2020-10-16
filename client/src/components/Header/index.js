import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "../Nav";

const Header = () => {
  return (
    <header>
      <div className="w-100">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
