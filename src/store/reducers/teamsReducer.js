export default function reducer(
  state = {
    fetching: false,
    team: {},
    players: [],
    error: null,
  }
  , action) {

  switch (action.type) {

    case 'FETCH_TEAM_PENDING': {
      return {
        ...state,
        fetching: true,
      }
    }

    case 'FETCH_TEAM_FULFILLED': {
      const {id, name, logo_path, players} = action.payload

      return {
        ...state,
        fetching: false,
        team: {
          id: id,
          name: name,
          image: logo_path,
        },
        players: players,
      }
    }

    case 'FETCH_TEAM_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    }

  }

  return state
}