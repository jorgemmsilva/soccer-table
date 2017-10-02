import "../config"
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { Provider } from "react-redux"
import store from './store/store'

import Root from './containers/Root'

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




// if (module.hot) {
//   module.hot.accept('./containers/Root', () => { render(Root) })
// }

// if (module.hot) {
//   module.hot.accept(() => {
//       render(Root)
//   })
// }

module.hot.accept('./containers/Root', () => {
  const NextApp = require('./containers/Root').default
  render(NextApp)
})


// if (module.hot) {
//   module.hot.accept('./containers/Root', () => {
//     const NextApp = require('./containers/Root').default;
//     ReactDOM.render(
//       <AppContainer>
//         <NextApp/>
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }