const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_GAMES":
      return {
        ...state,
        games: action.payload,
      };
    case "CHOOSE_TEAM": {
      // put in backend
      let homeTeamPicksClone;
      let awayTeamPicksClone;
      let chosenTeamClone;
      let notChosenTeamClone;
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
        homeTeamPicksClone = [...pick.homeTeam.picks, action.payload.userId];
        chosenTeamClone = { ...pick.homeTeam, picks: homeTeamPicksClone };
        awayTeamPicksClone = pick.awayTeam.picks.filter((id) => {
          return id !== action.payload.userId;
        });
        notChosenTeamClone = { ...pick.awayTeam, picks: awayTeamPicksClone}
        newGame = {
          ...pick,
          homeTeam: chosenTeamClone,
          awayTeam: notChosenTeamClone,
        };
      } else if (action.payload.teamChoice === "away-team") {
        if (pick.awayTeam.picks.includes(action.payload.userId)) {
          return {
            ...state,
          };
        }
        awayTeamPicksClone = [...pick.awayTeam.picks, action.payload.userId];
        chosenTeamClone = { ...pick.awayTeam, picks: awayTeamPicksClone };
        homeTeamPicksClone = pick.homeTeam.picks.filter((id) => {
          return id !== action.payload.userId;
        });
        notChosenTeamClone = { ...pick.homeTeam, picks: homeTeamPicksClone}
        newGame = {
          ...pick,
          awayTeam: chosenTeamClone,
          homeTeam: notChosenTeamClone,
        };
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
