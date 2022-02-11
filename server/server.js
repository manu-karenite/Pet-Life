const app = require("./app.js");

// CREATING A SERVER TO LISTEN TO ALL THE BACKEND REQUESTS
app.listen(process.env.PORT, () => {
  console.log(`Server is Running @ Port ${process.env.PORT}`);
});
