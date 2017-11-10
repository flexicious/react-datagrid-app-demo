export default function graphReducer (state = initialState, action) {
  if(action && action.type === "fetch_data")
    return state;
  return state;
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
