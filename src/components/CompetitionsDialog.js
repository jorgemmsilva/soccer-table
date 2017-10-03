import React from 'react'
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Avatar } from 'material-ui'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as seasonsActions from "../store/actions/seasonsActions"


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

@connect((store) => {
  return {
    leagueSeasonsList: store.seasons.leagueSeasonsList,
    currentPhase: store.seasons.currentPhase,
    seasonData: store.seasons.seasonData,
    
    fetching: store.seasons.fetching,
    error: store.seasons.error,
  }
}, (dispatch) => {
  return {
    actions: bindActionCreators(seasonsActions, dispatch),
  }
})
export default class CompetitionsDialog extends React.Component {

  render() {
    let { team, players } = this.props

    let actions = [
      <Button
        label="Close"
        onClick={this.handleClose}
      />
    ]

    return (
      <Dialog
        title="Change listing"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        transition={Slide}
      >
        <AppBar style={styles.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" style={styles.flex}>
              Change listing
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          mudar season (ano) -> leagueSeasonsList
          mudar fase (phase) -> seasonData (deve ser atualizado quando se muda a season)
        </div>
      </Dialog>
    )
  }
}