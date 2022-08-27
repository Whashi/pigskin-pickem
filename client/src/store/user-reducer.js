const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
