import axios from 'axios'

export function fetchSeason(season){

  return {
    type:"FETCH_SEASONS",
    payload: axios.get("https://soccer.sportmonks.com/api/v2.0/standings/season/" + season + "?api_token=" + process.env.API_KEY)
  }


  // return function(dispatch) {
  //   axios.get("https://soccer.sportmonks.com/api/v2.0/standings/season/" + season + "?api_token=" + process.env.API_KEY)
  //     .then((response) => {
  //       dispatch({type: "FETCH_TEAMS_FULFILLED", payload: response.data})
  //     })
  //     .catch((err) => {
  //       dispatch({type: "FETCH_TEAMS_REJECTED", payload: err})
  //     })
  // }
}

