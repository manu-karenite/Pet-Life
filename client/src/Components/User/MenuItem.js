import React from "react";

function MenuItem({ image, name, price }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1> {name} </h1>
      <h2> {`${price}`} </h2>
    </div>
  );
}

export default MenuItem;
