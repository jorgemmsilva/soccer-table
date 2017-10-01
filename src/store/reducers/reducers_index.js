import { combineReducers } from 'redux'

import playersReducer from "./playersReducer"
import teamsReducer from "./teamsReducer"

export default combineReducers({
  players: playersReducer,
  teams: teamsReducer,
})
