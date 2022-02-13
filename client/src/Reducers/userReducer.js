const user = (state = null, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    default:
      return state;
  }
};

export default user;
