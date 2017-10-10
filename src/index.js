import "../config"
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { Provider } from "react-redux"
import store from './store/store'

import Root from './containers/Root'

import './css/main.css'

const render = Component => {

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)


if (process.env.NODE_ENV != "production") {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default
    render(NextApp)
  })
}
