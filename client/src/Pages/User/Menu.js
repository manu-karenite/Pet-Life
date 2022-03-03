import React from "react";
import { MenuList } from "../../Components/Helpers/MenuList.js";
import MenuItem from "../../Components/User/MenuItem.js";
import "../../Styles/Menu.css";

function Menu() {
  return (
    <div className="menu">
      <h1 className="menuTitle">Hotels</h1>
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
