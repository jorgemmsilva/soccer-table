import axios from 'axios'

export function fetchPlayers(){
  console.log(process.env.API_KEY)
  return function(dispatch) {
    axios.get("https://soccer.sportmonks.com/api/v2.0/teams/53?api_token="+ process.env.API_KEY +"&include=squad")
      .then((response) => {
        dispatch({type: "FETCH_PLAYERS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PLAYERS_REJECTED", payload: err})
      })
  }
}

