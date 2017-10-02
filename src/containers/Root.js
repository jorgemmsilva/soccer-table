import React from 'react'

import Table from '../components/Table'
import TeamDialog from '../components/TeamDialog'



export default class Root extends React.Component {
  state = {
    dialogOpened: false,
    openedTeam: null,
  }

  handleOpenTeamDialog = (team) => this.setState({dialogOpened: true, openedTeam: team})

  handleDialogClose = () => this.setState({dialogOpened: false})

  render() {
    return (
      <div>
        <Table
          openTeamDialog={this.handleOpenTeamDialog}
        />

        {/* DIALOG */}
        <TeamDialog
          open={this.state.dialogOpened}
          openedTeam={this.state.openedTeam}
          handleClose={this.handleDialogClose}
        />
      </div>
    )
  }
}
