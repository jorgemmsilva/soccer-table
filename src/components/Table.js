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
import FilterListIcon from 'material-ui-icons/FilterList';

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
  { id: 'team_name', numeric: false, disablePadding: false, label: 'Team Name' },
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
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}
          {columnData.map(column => {
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
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
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
    seasonId: store.seasons.seasonId,
    fetchingData: store.seasons.fetching,
    season: store.seasons.season,
    phase: store.seasons.phase,
    data: store.seasons.data,
    error: store.seasons.error,
  }
}, (dispatch) => {
  return {
    seasonsActions: bindActionCreators(seasonsActions, dispatch),
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
    this.props.seasonsActions.fetchSeason(this.props.seasonId)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.props.data.sort((a, b) => (this.getDataById(b, orderBy) < this.getDataById(a, orderBy) ? -1 : 1))
        : this.props.data.sort((a, b) => (this.getDataById(a, orderBy) < this.getDataById(b, orderBy) ? -1 : 1));

    this.setState({ data, order, orderBy });
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
  // {
  //   this.props.teamsActions.fetchTeam()
  //   this.props.handleOpenTeamDialog(obj.team_id)
  //   this.setState({
  //     dialogOpened: true,
  //   })
  //   // const { selected } = this.state;
  //   // const selectedIndex = selected.indexOf(id);
  //   // let newSelected = [];

  //   // if (selectedIndex === -1) {
  //   //   newSelected = newSelected.concat(selected, id);
  //   // } else if (selectedIndex === 0) {
  //   //   newSelected = newSelected.concat(selected.slice(1));
  //   // } else if (selectedIndex === selected.length - 1) {
  //   //   newSelected = newSelected.concat(selected.slice(0, -1));
  //   // } else if (selectedIndex > 0) {
  //   //   newSelected = newSelected.concat(
  //   //     selected.slice(0, selectedIndex),
  //   //     selected.slice(selectedIndex + 1),
  //   //   );
  //   // }

  //   // this.setState({ selected: newSelected });
  // };

  handleDialogClose = () => this.setState({ dialogOpened: false })


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  getDataById = (obj, value) => [obj].concat(value.split('.')).reduce(function (a, b) { return a[b] })

  render() {

    if (this.props.fetchingData || (!this.props.error && !this.props.season))
      return <div>Loading...</div>

    var season = this.props.season[this.props.phase];

    if (!season)
      return <div>{this.props.error}</div>

    const { data, classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={'Team Standings: Season ' + this.props.seasonId + ' - ' + season.name}
        />
        <div className={classes.tableWrapper}>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, idx) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    onKeyDown={event => this.handleKeyDown(event, n)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={idx}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell> */}
                    {columnData.map((x, idx) => {
                      return (
                        <TableCell
                          key={idx}
                          numeric={x.numeric}
                        >
                          {this.getDataById(n, x.id)}
                        </TableCell>
                      )
                    })}

                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TablePagination
                count={data.length}
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