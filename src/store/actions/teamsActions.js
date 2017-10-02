import axios from 'axios'

export function fetchTeam(team) {
  return function (dispatch) {
    axios.get("https://soccer.sportmonks.com/api/v2.0/teams/" + team + "?api_token=" + process.env.API_KEY + "&include=squad")
      .then((response) => {
        var teamData = response.data.data
        var players = teamData.squad.data
        var requestArr = players.map((x) => axios.get("https://soccer.sportmonks.com/api/v2.0/players/" + x.player_id + "?api_token=" + process.env.API_KEY))

        var playersArr = []

        axios.all(requestArr)
          .then(axios.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
              playersArr.push(args[i].data.data)
            }
          }))
          .then(() => {
            teamData.players = playersArr
            dispatch({ type: "FETCH_TEAM_FULFILLED", payload: teamData })
          })

      })
      .catch((err) => {
        dispatch({ type: "FETCH_TEAM_REJECTED", payload: err })
      })
  }

}