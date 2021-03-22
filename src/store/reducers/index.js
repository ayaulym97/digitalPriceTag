// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import permanentReducer from './permanentReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  permanent: permanentReducer,
});

// Exports
export default rootReducer;
