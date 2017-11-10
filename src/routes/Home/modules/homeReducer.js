
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function homeReducer (state = initialState, action) {
  if(action.type == 'data_fetch')
    return state.data;

  return state
}
