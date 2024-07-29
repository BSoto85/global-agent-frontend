import React from "react";
import Home from "../Components/Home";

const HomePage = ({user}) => {
  return (
    <div>
      <Home user={user}/>
    </div>
  );
};

export default HomePage;
