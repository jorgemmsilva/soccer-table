import React from 'react'

import Table from '../components/Table'
import TeamDialog from '../components/TeamDialog'
import CompetitionsDialog from '../components/CompetitionsDialog'


export default class Root extends React.Component {
  state = {
    teamsDialog:{
      opened: false,
      currentTeam: null
    },
    competitionsDialog:{
      opened: false,
    },
  }

  handleTeamDialogOpen = (team) => this.setState({teamsDialog:{ opened: true, currentTeam: team }})

  handleTeamDialogClose = () => {
    let teamsDialog =  this.state.teamsDialog
    teamsDialog.opened = false
    this.setState({teamsDialog: teamsDialog})
  }

  handleCompetitionsDialogOpen = () => this.setState({competitionsDialog: {opened: true}})

  handleCompetitionsDialogClose = () => this.setState({competitionsDialog: {opened: false}})

  render() {
    return (
      <div>
        {/* COMPETITIONS DIALOG */}
        <CompetitionsDialog
          open={this.state.competitionsDialog.opened}
          handleClose={this.handleCompetitionsDialogClose}
        />

        {/* TABLE */}
        <Table
          openTeamDialog={this.handleTeamDialogOpen}
          openCompetitionsDialog={this.handleCompetitionsDialogOpen}
        />

        {/* TEAM DIALOG */}
        <TeamDialog
          open={this.state.teamsDialog.opened}
          currentTeam={this.state.teamsDialog.currentTeam}
          handleClose={this.handleTeamDialogClose}
        />
      </div>
    )
  }
}
