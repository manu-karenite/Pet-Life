import * as React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from "@mui/material";
import { getDetails } from "../../Axios/User/Authentication.js";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from './DatePicker';

const Booking = (props) => {
  const { className, size } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const location = useLocation()
  const { id } = location.state;
  const { hotels } = useSelector((state) => ({ ...state }))
  const [coupons,setCoupons]=useState([]);
  const [servicedb, setServicesdb] = useState([])

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const getData = () => {
    getDetails(id)
      .then((res) => {
        console.log(res.data);
        setCoupons(res.data.coupons);
        setServicesdb(res.data.services)
        console.log(res.data.services)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [hotels]);

  const [num, setNum] = React.useState('');
  const handleChange = (event) => {
    setNum(event.target.value);
  };

  const [service, setService] = React.useState('');
  const handleChanges = (event) => {
    setNum(event.target.value);
  };

  return (
    <div>
      <Button 
      style={{ color: "black",
      border: "none",
      justifyContent: "center",
      backgroundColor: "#121619",
      height: "50px",
      width: "180px",
      color: "white",
      fontSize: "20px" }}
      type="submit"
      size={size} 
      onClick={toggle}>
        BOOK NOW
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          Book for a service
        </ModalHeader>
        <ModalBody>
          <br></br>
          <DatePicker />
          <br></br>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Number of pets</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={num}
                label="Num"
                onChange={handleChange}
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
          </Box>
          <br></br>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Service Required</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service.serviceName}
                label="Service"
                onChange={handleChanges}
                >
                  {servicedb?.map(service => (
                <MenuItem value={10}>{service.serviceName}</MenuItem>
                )
                  )}
                </Select>
            </FormControl>
          </Box>
          <br></br>

          <TextField id="outlined-basic" label="Do you have a coupon?" variant="outlined" />
<br></br><br></br>
          <TextField id="outlined-basic" label="Total Amount" variant="outlined" />
          <br></br><br></br>
          <button 
                    style={{ color: "black",
                        border: "none",
                        justifyContent: "center",
                        backgroundColor: "#121619",
                        height: "50px",
                        width: "180px",
                        color: "white",
                        fontSize: "20px" }}
                    type="submit"
                    > BOOK NOW </button>

        </ModalBody>
      </Modal>
    </div>
  );
};

export default Booking;