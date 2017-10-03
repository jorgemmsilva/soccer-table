import React from 'react'

import Table from '../components/Table'
import TeamDialog from '../components/TeamDialog'



export default class Root extends React.Component {
  state = {
    teamsDialog:{
      opened: false,
      currentTeam: null
    },
    competitionsDialog:{
      opened: false,
      currentCompetition: null
    },
  }

  handleOpenTeamDialog = (team) => this.setState({teamsDialog:{ opened: true, currentTeam: team }})

  handleCloseTeamDialog = () => {
    let teamsDialog =  this.state.teamsDialog
    teamsDialog.opened = false
    this.setState({teamsDialog: teamsDialog})
  }


  render() {
    return (
      <div>
        {/* COMPETITIONS DIALOG */}
        {/* <CompetitionsDialog
          open={this.state.teamsdialogOpened}
          currentCompetition={this.state.currentTeam}
          handleClose={this.handleDialogClose}
        /> */}

        {/* TABLE */}
        <Table
          openTeamDialog={this.handleOpenTeamDialog}
        />

        {/* TEAM DIALOG */}
        <TeamDialog
          open={this.state.teamsDialog.opened}
          currentTeam={this.state.teamsDialog.currentTeam}
          handleClose={this.handleCloseTeamDialog}
        />
      </div>
    )
  }
}
