export default function reducer(
  state = {
    fetching: false,
    players: [],
    error: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_PLAYERS_PENDING':{
      return{
        ...state, 
        fetching: true
      }
    }

    case 'FETCH_PLAYERS_FULFILLED':{
      return{
        ...state, 
        fetching: false, 
        players: action.payload
      }
    }

    case 'FETCH_PLAYERS_REJECTED':{
      return{
        ...state, 
        fetching: false, 
        error: action.payload
      }
    }

  }
  
  return state
}