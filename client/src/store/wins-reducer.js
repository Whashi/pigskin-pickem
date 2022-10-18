const winsReducer = (state, action) => {
    switch (action.type) {
      case "SET_WINS_DATA":
        return {
          wins: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default winsReducer;
  