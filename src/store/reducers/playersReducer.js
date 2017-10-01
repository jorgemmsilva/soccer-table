export default function reducer(
  state = {
    fetching: false,
    fetched: false,
    players: [],
    error: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_PLAYERS_PENDING':{
      return Object.assign(state,{
        fetching: true
      })
    }

    case 'FETCH_PLAYERS_FULFILLED':{
      return Object.assign(state,{
        fetching: false, 
        fetched: true,
        players: action.payload
      })
    }

    case 'FETCH_PLAYERS_REJECTED':{
      return Object.assign(state,{
        fetching: false, 
        fetched:true, 
        error: action.payload
      })
    }

  }
  
  return state
}