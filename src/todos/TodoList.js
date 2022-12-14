import React, { useEffect } from 'react';
import './TodoList.css'
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos,markTodoAsCompletedRequest,removeTodoRequest } from './thunks';

const TodoList = ({ todos=[],onRemovePressed,onCompletedPressed,isLoading,startLoadingTodos }) => {
    useEffect(()=>{
        startLoadingTodos();
    },[])
    const loadingMessage = <div>Loading Todos...</div>
    const content = 
        <div className='list-wrapper'>
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed}/>)}
        </div>
    return isLoading?loadingMessage:content
}

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading:state.isLoading
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed:id=>dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos:()=>dispatch(loadTodos())
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);