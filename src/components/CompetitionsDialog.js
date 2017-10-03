import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Input, InputLabel, FormControl } from 'material-ui'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as seasonsActions from "../store/actions/seasonsActions"



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

@connect((store) => {
  return {
    leagueSeasonsList: store.seasons.leagueSeasonsList,
    currentPhase: store.seasons.currentPhase,
    seasonId: store.seasons.seasonId,
    seasonData: store.seasons.seasonData,
    fetching: store.seasons.fetching,
    error: store.seasons.error,
  }
}, (dispatch) => {
  return {
    actions: bindActionCreators(seasonsActions, dispatch),
  }
})
class CompetitionsDialog extends React.Component {

  onSeasonChange = (event) => {
    if(event.target.value != this.props.seasonId)
      this.props.actions.fetchSeason(event.target.value)
  }

  onPhaseChange = (event) => this.props.actions.changePhase(event.target.value)

  render() {
    let { classes, leagueSeasonsList, seasonId, currentPhase, seasonData } = this.props

    if (!seasonData || !leagueSeasonsList)
      return <div></div>

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
        <DialogTitle>Change listing</DialogTitle>
        <DialogContent>

          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="season">Season</InputLabel>
              <Select
                value={seasonId}
                onChange={this.onSeasonChange}
                input={<Input id="season" />}
              >
                {leagueSeasonsList.map((season, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      value={season.id}
                    >
                      {season.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>

          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="phase">Phase</InputLabel>
              <Select
                value={currentPhase}
                onChange={this.onPhaseChange}
                input={<Input id="phase" />}
              >
                {seasonData.map((phase, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      value={idx
                      }>
                      {phase.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

CompetitionsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompetitionsDialog);