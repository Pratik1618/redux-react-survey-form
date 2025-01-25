// Premises.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPremisesData,updatePremisesData,addPremisesData,setCurrentPremisesIndex } from '../slices/premiseSlice';
import { useNavigate } from 'react-router-dom';

const Premises = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    allPremisesData,
    currentPremisesIndex,
   
  } = useSelector((state) => state.premises);
  const numOfPremises = useSelector((state) => 
    parseInt(state.survey.surveyData.numOfPremises) || 0
); // Access
  const formData = allPremisesData[currentPremisesIndex] || {
    // Default form data structure if no data exists
    name: '',
    buildings: 1,
    employees: 0,
    operatingShifts: 1,
    shifts: [{ startTime: '', endTime: '' }],
    grade: '',
    tier: '',
    surveyDate: '',
    surveyBy: '',
  };
console.log('premiseno',numOfPremises)
  useEffect(() => {
    // When the premises index changes, ensure we update the form data
    if (formData) {
      // Update form data in the Redux store if necessary
      dispatch(updatePremisesData({ index: currentPremisesIndex, data: formData }));
    }
  }, [currentPremisesIndex, formData, dispatch]);

  const handleNext = () => {
    if (currentPremisesIndex < numOfPremises) {
      const newindex = currentPremisesIndex+1
      dispatch(setCurrentPremisesIndex(newindex));
    } 
  };

  const handlePrev = () => {
    if (currentPremisesIndex > 0) {
      dispatch(setCurrentPremisesIndex(currentPremisesIndex - 1));
    } else {
      navigate('/survey');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add data to Redux when the form is submitted
    dispatch(addPremisesData(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <h1>Premise {currentPremisesIndex + 1}</h1>
          <label htmlFor="name">Premises Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, name: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="buildings">Number of Buildings</label>
          <input
            type="number"
            id="buildings"
            value={formData.buildings}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, buildings: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="employees">Number of Employees</label>
          <input
            type="number"
            id="employees"
            value={formData.employees}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, employees: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="operatingShifts">Operating Shifts</label>
          <input
            type="number"
            id="operatingShifts"
            value={formData.operatingShifts}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, operatingShifts: e.target.value } }))}
          />
        </div>

        {formData.shifts.map((shift, index) => (
          <div key={index}>
            <label htmlFor={`startTime-${index}`}>Shift {index + 1} Start Time</label>
            <input
              type="time"
              id={`startTime-${index}`}
              value={shift.startTime}
              onChange={(e) => {
                const updatedShifts = formData.shifts.map((s, i) =>
                  i === index ? { ...s, startTime: e.target.value } : s
                );
                dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, shifts: updatedShifts } }));
              }}
            />
            <label htmlFor={`endTime-${index}`}>Shift {index + 1} End Time</label>
            <input
              type="time"
              id={`endTime-${index}`}
              value={shift.endTime}
              onChange={(e) => {
                const updatedShifts = formData.shifts.map((s, i) =>
                  i === index ? { ...s, endTime: e.target.value } : s
                );
                dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, shifts: updatedShifts } }));
              }}
            />
          </div>
        ))}

        <div>
          <label htmlFor="grade">Grade</label>
          <input
            type="text"
            id="grade"
            value={formData.grade}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, grade: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="tier">Tier</label>
          <input
            type="text"
            id="tier"
            value={formData.tier}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, tier: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="surveyDate">Survey Date</label>
          <input
            type="date"
            id="surveyDate"
            value={formData.surveyDate}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, surveyDate: e.target.value } }))}
          />
        </div>

        <div>
          <label htmlFor="surveyBy">Survey By</label>
          <input
            type="text"
            id="surveyBy"
            value={formData.surveyBy}
            onChange={(e) => dispatch(updatePremisesData({ index: currentPremisesIndex, data: { ...formData, surveyBy: e.target.value } }))}
          />
        </div>

        <div>
          <button type="button" onClick={handlePrev}>Previous</button>
          <button type="button" onClick={handleNext}>Next</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );

};

export default Premises;
