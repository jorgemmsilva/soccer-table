export default function reducer(
  state = {
    fetching: false,
    fetched: false,
    teams: [],
    error: null,
  }
  , action){

  switch(action.type){

    case 'FETCH_TEAMS_PENDING':{
      return Object.assign(state,{
        fetching: true
      })
    }

    case 'FETCH_TEAMS_FULFILLED':{
      return Object.assign(state,{
        fetching: false, 
        fetched: true,
        teams: action.payload
      })
    }

    case 'FETCH_TEAMS_REJECTED':{
      return Object.assign(state,{
        fetching: false, 
        fetched:true, 
        error: action.payload
      })
    }
    
  }
  
  return state
}