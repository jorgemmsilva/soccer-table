export default function reducer(
  state = {
    fetching: false,
    seasonId: 825,
    season: null,
    phase : 0,
    error: null,
    data: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_SEASONS_PENDING':{
      return{...state, fetching: true}
    }

    case 'FETCH_SEASONS_FULFILLED':{
      var season = action.payload.data.data
      var data = season[state.phase].standings.data.sort((a, b) => (a.postition < b.postition ? -1 : 1))
      return{
        ...state, 
        fetching: false, 
        season: season,
        data: data,
      }
    }

    case 'FETCH_SEASONS_REJECTED':{
      return{
        ...state, 
        fetching: false, 
        error: action.payload
      }
    }
    
  }
  
  return state
}