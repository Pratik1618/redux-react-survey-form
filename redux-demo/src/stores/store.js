// store.js
import { configureStore } from '@reduxjs/toolkit';
import { addPremisesData } from '../slices/premiseSlice';
import premisesReducer from '../slices/premiseSlice'
import surveyReducer from '../slices/surveySlice'
export const store = configureStore({
  reducer: {
    premises: premisesReducer,
    survey :surveyReducer,
  },
});
