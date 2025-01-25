// surveySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPremisesData: [],  // Array to hold data for all premises
  currentPremisesIndex: 0,  
  // Tracks the index of the current form
};

const premisesSlice = createSlice({
  name: 'premises',
  initialState,
  reducers: {
    setAllPremisesData(state, action) {
      state.allPremisesData = action.payload;
    },
    addPremisesData(state, action) {
      state.allPremisesData.push(action.payload);
    },
    setCurrentPremisesIndex(state, action) {
      state.currentPremisesIndex = action.payload;
    },
    updatePremisesData(state, action) {
      const { index, data } = action.payload;
      state.allPremisesData[index] = data;
    },
  },
});

export const {
  setAllPremisesData,
  addPremisesData,
  setCurrentPremisesIndex,
  updatePremisesData,
} = premisesSlice.actions;

export default premisesSlice.reducer;
