const verification = (state = null, action) => {
  switch (action.type) {
    case "VERIFICATION":
      return action.payload;
    default:
      return state;
  }
};

export default verification;
