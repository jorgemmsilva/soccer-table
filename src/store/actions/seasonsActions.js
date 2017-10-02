import axios from 'axios'

export function fetchSeason(season) {
  return {
    type: "FETCH_SEASON",
    payload: axios.get("https://soccer.sportmonks.com/api/v2.0/standings/season/" + season + "?api_token=" + process.env.API_KEY)
  }
}

