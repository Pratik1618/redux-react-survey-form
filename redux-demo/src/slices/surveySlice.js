// surveySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    surveyData: {
        name: '',
        clientname: '',
        sitename: '',
        numOfPremises: '', 
    },  // Array to hold data for all premises

  // Tracks the index of the current form
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveyData(state, action) {
      state.surveyData = action.payload;
    },
    addSurveyData(state, action) {
      state.surveyData.push(action.payload);
    },
 
    updateSurveyData(state, action) {
      const { data } = action.payload;
      state.surveyData = data;
    },
    
    setNumOfPremises: (state, action) => {
        state.surveyData.numOfPremises = action.payload;
      }

  },
});

export const {
    setSurveyData,
    addSurveyData,

  updateSurveyData,
  setNumOfPremises
} = surveySlice.actions;

export default surveySlice.reducer;
