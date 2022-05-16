const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_GAMES":
      return {
        ...state,
        games: action.payload,
      };
    case "CHOOSE_TEAM": {
      let picksClone;
      let teamClone;
      let newGame;
      let pick;
      let i;
      let newGames;
      state.games.forEach((game, index) => {
        if (game._id === action.payload.gameId) {
          pick = game;
          i = index;
        }
      });
      if (action.payload.teamChoice === "home-team") {
        if (pick.homeTeam.picks.includes(action.payload.userId)) {
          return {
            ...state,
          };
        }
        picksClone = [...pick.homeTeam.picks, action.payload.userId];
        teamClone = { ...pick.homeTeam, picks: picksClone };
        newGame = { ...pick, homeTeam: teamClone };
        if (pick.awayTeam.picks.includes(action.payload.userId)) {
          newGame.awayTeam.picks.filter((id) => {
            return id !== action.payload.userId;
          });
        }
      } else if (action.payload.teamChoice === "away-team") {
        if (pick.awayTeam.picks.includes(action.payload.userId)) {
          return {
            ...state,
          };
        }
        picksClone = [...pick.homeTeam.picks, action.payload.userId];
        teamClone = { ...pick.homeTeam, picks: picksClone };
        newGame = { ...pick, homeTeam: teamClone };
        if (pick.homeTeam.picks.includes(action.payload.userId)) {
          newGame.homeTeam.picks.filter((id) => {
            return id !== action.payload.userId;
          });
        }
      }

      newGames = [...state.games];
      newGames[i] = newGame;
      return {
        ...state,
        games: newGames,
      };
    }

    default:
      return state;
  }
};

export default gameReducer;
