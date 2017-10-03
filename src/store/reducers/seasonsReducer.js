export default function reducer(
  state = {
    currentLeagueId: 501,
    currentLeagueName: "Premiership",
    seasonsList: [],
    currentSeasonId: null,
    currentSeasonName: null,
    currentSeason: null,
    currentPhase : 0,
    fetching: false,
    error: null,
    data: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_SEASON_PENDING':{
      return{...state, fetching: true}
    }

    case 'FETCH_SEASON_FULFILLED':{
      var seasonData = action.payload.data.data
      var data = seasonData[state.currentPhase].standings.data.sort((a, b) => (a.position < b.position ? -1 : 1))
      return{
        ...state, 
        fetching: false, 
        currentSeason: seasonData,
        data: data,
      }
    }

    case 'FETCH_SEASON_REJECTED':{
      return{
        ...state, 
        fetching: false, 
        error: action.payload
      }
    }

    case 'CHANGE_SEASON_PHASE':{
      return{
        ...state,
        currentPhase: action.payload.phase,
        data: state.season[action.payload.phase].standings.data.sort((a, b) => (a.position < b.position ? -1 : 1))
      }
    }

    case 'FETCH_SEASON_LIST_PENDING':{
      return{...state, fetching: true}
    }

    case 'FETCH_SEASON_LIST_FULFILLED':{
      let payloadData = action.payload.data.data
      let currentSeasonData = payloadData.find((x)=> x.league_id === state.currentLeagueId && x.is_current_season )

      return{
        ...state, 
        fetching: false, 
        seasonsList: payloadData,
        currentSeasonId: currentSeasonData.id,
        currentSeasonName: currentSeasonData.name,
      }
    }

    case 'FETCH_SEASON_LIST_REJECTED':{
      return{
        ...state, 
        fetching: false, 
        error: action.payload
      }
    }
    
  }
  
  return state
}