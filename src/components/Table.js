import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import ChangeListSettingsIcon from 'material-ui-icons/Menu';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as seasonsActions from "../store/actions/seasonsActions"

import TeamDialog from "./TeamDialog"


//----------------------------------------------------------------------
//
//
//                            DATA DEFINITION
//
//
//----------------------------------------------------------------------

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'position', numeric: true, disablePadding: false, label: 'Position' },
  { id: 'team_name', numeric: false, disablePadding: false, label: 'Team Name' , width: 5},
  { id: 'group_name', numeric: false, disablePadding: false, label: 'Group Name' },
  { id: 'overall.games_played', numeric: true, disablePadding: false, label: 'Played' },
  { id: 'overall.won', numeric: true, disablePadding: false, label: 'Won' },
  { id: 'overall.draw', numeric: true, disablePadding: false, label: 'Drawn' },
  { id: 'overall.lost', numeric: true, disablePadding: false, label: 'Lost' },
  { id: 'overall.goals_scored', numeric: true, disablePadding: false, label: 'Goals' },
  { id: 'total.goal_difference', numeric: true, disablePadding: false, label: 'Difference' },
  { id: 'total.points', numeric: true, disablePadding: false, label: 'Points' },
];



//----------------------------------------------------------------------
//
//
//                            TABLE HEAD
//
//
//----------------------------------------------------------------------

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            if(column.id !== 'group_name' || this.props.drawGroupCol)
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
  theme.palette.type === 'light'
    ? {
      color: theme.palette.secondary.A700,
      backgroundColor: theme.palette.secondary.A100,
    }
    : {
      color: theme.palette.secondary.A100,
      backgroundColor: theme.palette.secondary.A700,
    },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
            <Typography type="title">{props.title}</Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Change listing">
          <IconButton
            aria-label="Change listing"
            onClick={props.openCompetitionsDialog}
          >
            <ChangeListSettingsIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);




//----------------------------------------------------------------------
//
//
//                    DATA TABLE
//
//
//----------------------------------------------------------------------



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

@connect((store) => {
  return {
    currentLeagueName: store.seasons.currentLeagueName,
    seasonId: store.seasons.seasonId,
    seasonName: store.seasons.seasonName,
    fetchingData: store.seasons.fetching,
    seasonData: store.seasons.seasonData,
    phaseIdx: store.seasons.currentPhase,
    standings: store.seasons.standings,
    error: store.seasons.error,
  }
}, (dispatch) => {
  return {
    actions: bindActionCreators(seasonsActions, dispatch),
  }
})
class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'position',
    selected: [],
    page: 0,
    rowsPerPage: 10,
    dialogOpened: false,
    openedTeam: null,
  }

  componentWillMount() {
    this.props.actions.fetchSeasonList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seasonId != this.props.seasonId)
      this.props.actions.fetchSeason(nextProps.seasonId)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const standings =
      order === 'desc'
        ? this.props.standings.sort((a, b) => (this.getDataById(b, orderBy) < this.getDataById(a, orderBy) ? -1 : 1))
        : this.props.standings.sort((a, b) => (this.getDataById(a, orderBy) < this.getDataById(b, orderBy) ? -1 : 1));

    this.setState({ standings, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, obj) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, obj);
    }
  };

  handleClick = (event, obj) => this.props.openTeamDialog(obj.team_id)

  handleDialogClose = () => this.setState({ dialogOpened: false })


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  getDataById = (obj, value) => [obj].concat(value.split('.')).reduce(function (a, b) { return a[b] })

  checkIfGroupsExist = () =>{
    
    for(var i = 0; i < this.props.standings.length; i++){
      if(this.props.standings[i].group_name)
        return true
    }
    return false
  }

  render() {

    if (this.props.fetchingData && (!this.props.error && !this.props.standings))
      return <div>Loading...</div>

    if (this.props.error)
      return <div>Error! Something went Wrong. {this.props.error}</div>
    
    const { classes, standings, currentLeagueName, seasonName, seasonData } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

    if(seasonData)
    var phase = seasonData[this.props.phaseIdx];

    //check whether current standings have groups
    let drawGroupCol = this.checkIfGroupsExist()

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={'Standings for: ' + currentLeagueName + ' Season: ' + seasonName + ', ' + (phase ? phase.name : '')}
          openCompetitionsDialog={this.props.openCompetitionsDialog}
        />
        <div className={classes.tableWrapper}>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={standings.length}
              drawGroupCol={drawGroupCol}
            />
            <TableBody>
              {standings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowObj, idx) => {
                const isSelected = this.isSelected(rowObj.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, rowObj)}
                    onKeyDown={event => this.handleKeyDown(event, rowObj)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={idx}
                    selected={isSelected}
                  >

                    {columnData.map((x, idx) => {
                      if(x.id !== 'group_name' || drawGroupCol)
                      return (
                        <TableCell
                          key={idx}
                          numeric={x.numeric}
                        >
                          {this.getDataById(rowObj, x.id)}
                        </TableCell>
                      )
                    })}

                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TablePagination
                count={standings.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);