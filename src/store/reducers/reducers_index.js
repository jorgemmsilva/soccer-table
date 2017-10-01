import { combineReducers } from 'redux'

import playersReducer from "./playersReducer"
import seasonsReducer from "./seasonsReducer"

export default combineReducers({
  players: playersReducer,
  seasons: seasonsReducer,
})
