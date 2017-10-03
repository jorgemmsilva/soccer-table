import axios from 'axios'

export function fetchSeason(season) {
  return {
    type: "FETCH_SEASON",
    payload: axios.get("https://soccer.sportmonks.com/api/v2.0/standings/season/" + season + "?api_token=" + process.env.API_KEY),
    meta: {seasonId: season},
  }
}

export function fetchSeasonList() {
  return {
    type: "FETCH_SEASON_LIST",
    payload: axios.get("https://soccer.sportmonks.com/api/v2.0/seasons?api_token=" + process.env.API_KEY)
  }
}

export function changePhase(phase) {
  return {
    type: "CHANGE_SEASON_PHASE",
    payload: phase
  }
}