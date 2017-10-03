import React from 'react'
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Avatar } from 'material-ui'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as teamsActions from "../store/actions/teamsActions"


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  list: {
    minWidth: 400,
  },
  listWrapper: {
    overflowY: "scroll",    
  },
  teamAvatar: {
    height: 100,
    width: 100,
  },
  playerAvatar: {
    height: 60,
    width: 60,
  }
};

@connect((store) => {
  return {
    team: store.teams.team,
    players: store.teams.players,
    fetching: store.teams.fetching,
    error: store.teams.error,
  }
}, (dispatch) => {
  return {
    actions: bindActionCreators(teamsActions, dispatch),
  }
})
export default class CompetitionsDialog extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.openedTeam && nextProps.openedTeam != this.props.openedTeam)
      this.props.actions.fetchTeam(nextProps.openedTeam)
  }

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
        title=""
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        transition={Slide}
        fullScreen={true}
      >
        <AppBar style={styles.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" style={styles.flex}>
              Team Details
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.listWrapper}>
          <List style={styles.list}>
            <ListItem>
              <Avatar alt={team.name} src={team.image} style={styles.teamAvatar} />
              <ListItemText primary={team.name} />
            </ListItem>
            {players.map((p, idx) => {
              const secText = p.birthplace + " - " + p.birthcountry + " - " + p.birthdate
              return (
                <ListItem key={idx}>
                  <Avatar
                    src={p.image_path}
                    style={styles.playerAvatar}
                  />
                  <ListItemText
                    primary={p.fullname}
                    secondary={secText}
                  />
                </ListItem>
              )

            })}
          </List>
        </div>
      </Dialog>
    )
  }
}