import React, {Component} from 'react'
import { Card } from 'material-ui/Card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataTables from 'material-ui-datatables'

import * as seasonsActions from "../store/actions/seasonsActions"

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
}


const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
    alignRight: true,
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
]


const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
]

const TABLE_DATA_NEXT = [
  {
    name: 'Marshmallow',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
]

@connect((store) => {
  return {
      seasonId: store.seasons.seasonId,
      fetchingData: store.seasons.fetching,
      season: store.seasons.season,
      error: store.seasons.error,
  }
}, (dispatch) => {
  return {
      actions: bindActionCreators(seasonsActions, dispatch)
  }
})
export default class Table extends Component {
  state = {
    data: TABLE_DATA,
    page: 1,
  }
  
  componentWillMount(){
    this.props.actions.fetchSeason(this.props.seasonId)
  }

  handleSortOrderChange = (key, order) => {
    console.log('key:' + key + ' order: ' + order)
  }

  handleFilterValueChange = (value) => {
    console.log('filter value: ' + value)
  }

  handleCellClick = (rowIndex, columnIndex, row, column) => {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleCellDoubleClick = (rowIndex, columnIndex, row, column) => {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex)
  }

  handleRowSelection = (selectedRows) => {
    console.log('selectedRows: ' + selectedRows)
  }

  handlePreviousPageClick = () => {
    console.log('handlePreviousPageClick')
    this.setState({
      data: TABLE_DATA,
      page: 1,
    })
  }

  handleNextPageClick = () => {
    console.log('handleNextPageClick')
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    })
  }

  handleInfoClick = () => {
    console.log('handleInfoClick')
  }

  render() {
    
    if(this.props.fetchingData || (!this.props.error && !this.props.season))
      return <div>Loading...</div>
    
    var season = this.props.season[0];

    if(!season)
      return <div>{this.props.error}</div>

    return (
      <div style={styles.container}>
        <div style={styles.component}>
          <Card style={{margin: 12}}>
            <DataTables
              title={'Team Standings: Season ' + this.props.seasonId + ' - ' + season.name}
              height={'auto'}
              selectable={false}
              showRowHover={true}
              columns={TABLE_COLUMNS}
              data={TABLE_DATA}
              showCheckboxes={false}
              showHeaderToolbar={true}
              onCellClick={this.handleCellClick}
              onCellDoubleClick={this.handleCellDoubleClick}
              onFilterValueChange={this.handleFilterValueChange}
              onSortOrderChange={this.handleSortOrderChange}
              count={1001}
              onNextPageClick={this.handleNextPageClick}
              onPreviousPageClick={this.handlePreviousPageClick}
              onRowSelection={this.handleRowSelection}
            />
          </Card>
        </div>
      </div>
    )
  }
}