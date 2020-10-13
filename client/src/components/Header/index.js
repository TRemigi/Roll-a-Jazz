import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "../Nav";

const Header = () => {
  return (
    <header>
      <div>
        {/* <Link to= '/'>
          <h1>Roll-a-jazz</h1>
        </Link> */}

        <Navigation />
      </div>
    </header>
  );
};

export default Header;
