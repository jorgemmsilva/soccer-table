export default function reducer(
  state = {
    currentLeagueId: 501,
    currentLeagueName: "Premiership",
    leagueSeasonsList: [],
    seasonId: null,
    seasonName: null,
    seasonData: null,
    currentPhase: 0,
    standings: [],
    fetching: false,
    error: null,
  }
  , action) {

  switch (action.type) {

    case 'FETCH_SEASON_PENDING': {
      return { ...state, fetching: true }
    }

    case 'FETCH_SEASON_FULFILLED': {
      var seasonData = action.payload.data.data
      let seasonName = state.leagueSeasonsList.find((x) => x.id === action.meta.seasonId).name;
      var standings = []
      if (seasonData.length)
        standings = seasonData[0].standings.data.sort((a, b) => (a.position < b.position ? -1 : 1))
      return {
        ...state,
        fetching: false,
        currentPhase: 0,
        seasonId: action.meta.seasonId,
        seasonName: seasonName,
        seasonData: seasonData,
        standings: standings,
      }
    }

    case 'FETCH_SEASON_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

    case 'CHANGE_SEASON_PHASE': {
      return {
        ...state,
        currentPhase: action.payload,
        standings: state.seasonData[action.payload].standings.data.sort((a, b) => (a.position < b.position ? -1 : 1))
      }
    }

    case 'FETCH_SEASON_LIST_PENDING': {
      return { ...state, fetching: true }
    }

    case 'FETCH_SEASON_LIST_FULFILLED': {
      let payloadData = action.payload.data.data.filter((x) => x.league_id === state.currentLeagueId)
      let seasonData = payloadData[payloadData.length - 1]

      return {
        ...state,
        fetching: false,
        leagueSeasonsList: payloadData,
        seasonId: seasonData.id,
        seasonName: seasonData.name,
      }
    }

    case 'FETCH_SEASON_LIST_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

  }

  return state
}