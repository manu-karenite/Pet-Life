const hotel = (state = null, action) => {
  switch (action.type) {
    case "HOTEL":
      return action.payload;
    default:
      return state;
  }
};

export default hotel;
