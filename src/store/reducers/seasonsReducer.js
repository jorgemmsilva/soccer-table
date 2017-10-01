export default function reducer(
  state = {
    fetching: false,
    seasonId: 825,
    season: null,
    error: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_SEASONS_PENDING':{
      return{...state, fetching: true}
    }

    case 'FETCH_SEASONS_FULFILLED':{
      return{
        ...state, 
        fetching: false, 
        season: action.payload.data.data
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