import React from "react";
import { useState, useEffect } from "react";

const ToDoContext = React.createContext({
    onGet: () => {},
    toggle: () => {},
    delete: () => {},
    todos: [],
});


export const ToDoContextProvider = (props) => {
  const [todos, setToDos] = useState([])
  useEffect(() => {
    const init = localStorage.getItem('todos')
    if(init) {
      setToDos(JSON.parse(init))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  const addUserHandler = (todo) => {
    setToDos([...todos, todo])
    
  }
  
  const toggleHandler = (id) => {
    setToDos([
      ...todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : {...todo})
    ])
  }
  
  const deleteHandler = (id) => {
    setToDos(prevstate => {
      const dltTodo = prevstate.filter(todo => todo.id !== id)
      return dltTodo
    })
  }
  return <ToDoContext.Provider value={{
    onGet: addUserHandler,
    todos: todos,
    delete: deleteHandler,
    toggle: toggleHandler,
  }}>
    {props.children}
  </ToDoContext.Provider>
}

export default ToDoContext;