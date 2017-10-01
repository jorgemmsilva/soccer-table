import { applyMiddleware, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from "./reducers/reducers_index"

var middleWare

if(process.env.NODE_ENV != "production"){
  middleWare = applyMiddleware(promise(), thunk, createLogger())  
}
else{
  middleWare = applyMiddleware(promise(), thunk)
}

export default createStore(reducers, middleWare)