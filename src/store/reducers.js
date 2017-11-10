import { combineReducers } from 'redux'
import locationReducer from './location'
import graphsReducer from '../routes/Graphs/modules/graphs';
import homeReducer from '../routes/Home/modules/homeReducer';


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    graph:graphsReducer,
    home:homeReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
