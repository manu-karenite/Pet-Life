import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MenuItem from "../../Components/User/MenuItem.js";
import "../../Styles/Menu.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {FetchHotels} from "../../Axios/User/Authentication.js";
 

function Menu() {
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
  });

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await FetchHotels();
      setData(response?.data?.hotels);
      console.log(response);
    }
    fetch()
  },[]);
  // Sample options for search box
  const myOptions = [];
  return (
   <div className="menu">
      <h1 className="menuTitle">Hotels</h1>
      <div className="menuList">
        {data?.map((menuItem, key) => {
          return (
            <Link to={`/presentation/${menuItem._id}`} state = {{id: menuItem._id}}>
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              contact={menuItem.contact}
            />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
