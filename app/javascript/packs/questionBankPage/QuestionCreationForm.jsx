import React, { useState, useContext } from 'react'
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { AwardContext } from '../context/AwardContext'
import { McqOptionsForm } from './McqOptionsForm'
import { MrqOptionsForm } from './MrqOptionsForm'
import { OpenEndedForm } from './OpenEndedForm'

/*To create new questions and add them into the question bank
*/
const QuestionCreationForm = () => {
  const cookies = new Cookies()
  const [award, setAward] = useContext(AwardContext)
  const [type, setType] = new useState("")

  //If there is no ongoing session go to login page
  if (cookies.get('Token') == null) {
    window.location.href = '/'
  }

  function setFormType(e) {
    e.preventDefault()
    document.getElementsByClassName('create-question-form__type')[0].value = e.target.className
    setType(e.target.className)
  }

  //Sends the information from the form to the backend to try and create a question
  //If the form is not fully filled returns an alert to the user
  function submitForm(e) {
    e.preventDefault()
    if (e.target[0].value != '' && e.target[1].value != '' && e.target[2].value != '') {
      let answer = []
      //Need to check which type of question it is and then subsequently check all fields thereafter
      if (e.target[0].value == 'Open-ended') {
        answer.push(e.target[3].value)
      }
      else if (e.target[0].value == 'MRQ' || e.target[0].value == 'MCQ') {
        let i = 3
        while(e.target[i] != null) {
          if (e.target[i].value != '') {
            answer.push({'correct': e.target[i].checked, 'option': e.target[i + 1].value})
          }
          i += 2
        }
      }
      axios.post('/api/question/0/create_question', {
        question_type: e.target[0].value,
        question: e.target[1].value,
        marks: e.target[2].value,
        award: award,
        answer: answer
      })
      .then(resp => {
        //Reset all the input fields
        console.log(resp.data)
      })
      .catch(resp => console.log(resp.response.statusText))
    }
    else {
      alert("Please fill in all fields first")
    }
  }

  return(
    <form className='create-question-form' onSubmit={ submitForm }>
      <label>Add a question into the question bank</label>
      <Popup className='question-type-popup' trigger={<input className='create-question-form__type' placeholder='MCQ/MRQ/Open-ended'></input>} position="bottom">
        <p className='MCQ' onClick={setFormType}>MCQ</p>
        <p className='MRQ' onClick={setFormType}>MRQ</p>
        <p className='Open-ended' onClick={setFormType}>Open-ended</p>
      </Popup>
      <input className='create-question-form__question' placeholder='question'></input>
      <input className='create-question-form__marks' placeholder='marks'></input>
      {type == "MCQ" && <McqOptionsForm/>}
      {type == "MRQ" && <MrqOptionsForm/>}
      {type == "Open-ended" && <OpenEndedForm/>}
      <button className='create-question-form-submit__button'>Create Question</button>
    </form>
  )
}

export { QuestionCreationForm }