import React, { Component } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

class SignUp extends Component {
  state = {
    email: {
      recipient: "",
      sender: "",
      subject: "",
      text: "",
    },
  };

  sendEmail = (_) => {
    const { email } = this.state;
    fetch(
      `http://127.0.0.1:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`
    ) //query string url
      .catch((err) => console.error(err));
  };

  render() {
    const { email } = this.state;
    const paperStyle = {
      padding: "30px 20px",
      width: 600,
      margin: "20px auto",
    };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    return (
      <Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form>
            <TextField fullWidth placeholder="Enter your name" />
            <br></br>
            <br></br>
            <TextField
              fullWidth
              placeholder="Enter your email"
              value={email.recipient}
              onChange={(e) =>
                this.setState({
                  email: { ...email, recipient: e.target.value },
                })
              }
            />
            <br></br>
            <br></br>
            <TextField
              type="password"
              fullWidth
              placeholder="Enter your password"
            />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.sendEmail}
            >
              Sign up
            </Button>
          </form>
        </Paper>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Grid>
    );
  }
}

export default SignUp;
