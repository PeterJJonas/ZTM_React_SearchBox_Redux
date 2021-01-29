import { CHANGE_SEARCH_FIELD} from './constants.js'

const initialState = {
  searchField: ''
}

export const searchMonsters = (state=initialState, action={}) => {
  console.log(action.type);
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, {searchField:action.payload})
    default:
      return state;
  }
}