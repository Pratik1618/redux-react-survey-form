import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSurveyData,addSurveyData,setNumOfPremises,updateSurveyData } from '../slices/surveySlice';
import { data, useNavigate } from 'react-router-dom';

const Survey = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        surveyData
    } = useSelector((state)=>state.survey)

    const formData = surveyData || {
        name:'',
        clientname:'',
        sitename:"",
        numOfPremises:""
    }



    const handleNext =()=>{
        if (parseInt(formData.numOfPremises) > 0) {
           
            navigate('/premises');
          }
    }
  return (
    <div>
       <label htmlFor="name">Survey Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => dispatch(updateSurveyData({  data: { ...formData, name: e.target.value } }))}
                />
             <form>
             <label htmlFor="name">Client Name</label>
                <input
                  type="text"
                  id="clientname"
                  value={formData.clientname}
                  onChange={(e) => dispatch(updateSurveyData({  data: { ...formData, clientname: e.target.value } }))}
                />
                   <label htmlFor="name">Site Name</label>
                <input
                  type="text"
                  id="sitename"
                  value={formData.sitename}
                  onChange={(e) => dispatch(updateSurveyData({ data: { ...formData, sitename: e.target.value } }))}
                />
                 <label htmlFor="name">Premise No</label>
                <input
                  type="number"
                  id="numOfPremises"
                  value={formData.numOfPremises}
                  onChange={(e) => {
                    dispatch(updateSurveyData({ 
                        data: { 
                            ...formData, 
                            numOfPremises: e.target.value 
                        } 
                    }));
                    dispatch(setNumOfPremises(e.target.value));
                }}
                />
                  <div>
          {/* <button type="button" onClick={handlePrev}>Previous</button> */}
          <button type="button" onClick={handleNext}>Next</button>
          <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Survey
