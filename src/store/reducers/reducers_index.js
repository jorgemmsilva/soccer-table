import { combineReducers } from 'redux'

import teamsReducer from "./teamsReducer"
import seasonsReducer from "./seasonsReducer"

export default combineReducers({
  teams: teamsReducer,
  seasons: seasonsReducer,
})
