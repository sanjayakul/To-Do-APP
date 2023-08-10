import { ACTIONS } from "../reducer/actions"
import EditForm from "./EditForm"
import DeleteTask from "./DeleteTask"
import React, {useState} from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faTrash, faCheck, faPenToSquare, faStar } from "@fortawesome/free-solid-svg-icons"

function TaskList({todos, dispatch, sortAZ, sortPriority, darkMode}){
    const [edit, setEdit] = useState(false)
    const [editTaskId, setEditTaskId] = useState(null);
    const [deleteTask, setDeleteTask] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState(null)

    const handleStartEdit = (taskId) => {
      setEdit(true)
      setEditTaskId(taskId);
    }
  
    const handleFinishEdit = () => {
      setEdit(false)
    }

    const handleStartDelete = (taskId) => {
        setDeleteTask(true)
        setDeleteTaskId(taskId)
    }

    const handleCancelDelete = () => {
        setDeleteTask(false)
    }

    const handleComplete = (todoId) => {
        dispatch({type: ACTIONS.COMPLETE_TODO, payload: {id: todoId}})
    }

    return(
        <>
            {todos.length >= 1 ? todos
                .sort((a, b) => {
                    if(sortAZ === false && sortPriority === false ){
                        return new Date(b.id) - new Date(a.id)
                    }
                    if(sortAZ){
                        const valueA = a.value.toUpperCase()
                        const valueB = b.value.toUpperCase()
                        if (valueA < valueB) {
                            return -1; 
                        } 
                        if (valueA > valueB) {
                            return 1; 
                          }
                        return 0;
                    }
                    if(sortPriority){
                        const priorityOrder = ['high', 'medium', 'low']; 

                        const priorityA = priorityOrder.indexOf(a.priority);
                        const priorityB = priorityOrder.indexOf(b.priority);
                      
                        if (priorityA < priorityB) {
                          return -1;
                        } else if (priorityA > priorityB) {
                          return 1; 
                        } else {
                          return 0;
                        }
                    }
                })
                .map(todo => {
                    return (<div key={todo.id} className="tasklist__task">
                        <FontAwesomeIcon icon={faCircle} className="tasklist__circle"/> 
                        <strong> {todo.value.toUpperCase()} </strong> 
                        - Your task has priority: 
                        {
                            todo.priority === 'low' && <span className="tasklist__priority"> <FontAwesomeIcon icon={faStar} /> </span>
                        }
                        {
                        todo.priority === 'medium' && <span className="tasklist__priority"> <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> </span>
                        }
                        {
                        todo.priority === 'high' && <span className="tasklist__priority"> <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> </span>
                        }
                        - Complete your task by: <strong>{todo.calendar.replace(/T/g, " ")}</strong>  
                        <div className="tasklist__icons">
                            <FontAwesomeIcon icon={faCheck} 
                                className="tasklist__complete"
                                onClick={() => handleComplete(todo.id)}
                            />
                            <FontAwesomeIcon 
                                icon={faPenToSquare} className="tasklist__edit"
                                onClick={() => handleStartEdit(todo.id)}
                            />
                            <FontAwesomeIcon 
                                icon={faTrash} className="tasklist__delete"
                                onClick={() => handleStartDelete(todo.id)}
                            />
                        </div>
                        {deleteTaskId === todo.id && deleteTask ? <DeleteTask handleCancelDelete={handleCancelDelete} todoId={todo.id} dispatch={dispatch} darkMode={darkMode}/>: null}
                        {editTaskId === todo.id && edit ? <EditForm dispatch={dispatch} todoId={todo.id} oldValue={todo.value} handleFinishEdit={handleFinishEdit} darkMode={darkMode}/> : null}
                    </div>
                    )
            }) : <p>You currently have no active tasks, click <strong style={{textDecoration: 'underline'}}>'ADD TASK'</strong> to add a task</p>}

        </>
    )
}

export default TaskList
