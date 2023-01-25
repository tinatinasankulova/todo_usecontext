import { Fragment, useReducer, useContext } from 'react';
import style from './AddToDo.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import ErrorModal from './ui/ErrorModal';
import ToDoContext from '../state/ToDoContext';


const userInputReducer = (state, action) => {
  if(action.type === 'INPUT_VALUE') {
    return {
      ...state,
      inputValue: action.payload
    }
  }
  if(action.type === 'CLEANUP') {
    return {
      ...state,
      inputValue: ''
    }
  }
  if(action.type === 'MODAL') {
    return {
      ...state,
      error: {
        title: 'Invaid value, inputs should not be empty!',
        message: 'Please, type something!',
      }
    }
  }
  if(action.type === 'CONFRIM') {
    return {
      ...state,
      error: null
    }
  }

}


const AddToDo = () => {

const cxtData = useContext(ToDoContext)  

const [userInput, dispatchUserInput] = useReducer(userInputReducer, {
  inputValue: '',
  error: null
})

const inputChangeHandler = (event) => {
  dispatchUserInput({type: 'INPUT_VALUE', payload: event.target.value})
}

const submitHandler = (event) => {
  event.preventDefault()
  if(userInput.inputValue.trim().length === 0) {
    dispatchUserInput({type: 'MODAL'})
    return
  }
  const todoData = {
    todo: userInput.inputValue,
    completed: false,
    date: new Intl.DateTimeFormat('ru-RU').format(),
    id: Math.random().toString()
  }
  cxtData.onGet(todoData)
    dispatchUserInput({type: 'CLEANUP'})
}

const closeModalHandler = () => {
  dispatchUserInput({type: 'CONFRIM'})
}

  return (
    <Fragment>
      {userInput.error && <ErrorModal title={userInput.error.title} message={userInput.error.message} onConfirm={closeModalHandler}/>}
    <Card className={style.card}>
      <form onSubmit={submitHandler}>
        <h1>Let's do it</h1>
        <input type="text" placeholder='Gonna do...' onChange={inputChangeHandler} value={userInput.inputValue}/>
        <Button >Add ToDo</Button>
      </form>
    </Card>
    </Fragment>
  );
};

export default AddToDo;