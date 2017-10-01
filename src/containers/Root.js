import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Table from '../components/Table'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  // palette: {
  //   textColor: '#333'
  // },
})

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Table/>
  </MuiThemeProvider>
)

export default Root