import React, {FC, useState} from 'react';
import cl from './todoItem.module.sass';
import {ITodo} from "../../types/types";
import {useAppDispatch} from "../../hooks/store";
import {TodoSlice} from "../../store/reducers/TodoSlice";
import editIcon from '../../static/edit.svg';
import completeIcon from '../../static/complete.svg';
import removeIcon from '../../static/remove.svg';

interface TodoItemProps {
    todo: ITodo
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {

    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(todo.title)

    const removeTodo = () => {
        dispatch(TodoSlice.actions.removeTodo(todo.id))
    }
    const editTodo = () => {
        const newTodo: ITodo = {
            id: todo.id,
            title: value,
            status: todo.status
        }
        dispatch(TodoSlice.actions.editTodo(newTodo))
        setEditMode(false)
    }
    const editTodoStatus = () => {
        dispatch(TodoSlice.actions.editTodoStatus(todo.id))
    }

    return (
        <div className={[cl.todo, todo.status ? cl.active : ''].join(' ')}>
            <div className={cl.todo__body}>
                <div className={cl.todo__status} onClick={editTodoStatus}>
                    {todo.status && <svg className={cl.todo__status_inner} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                </div>
                {!editMode
                    ? <div className={cl.todo__title}>{todo.title}</div>
                    : <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={cl.todo__edit}/>
                }
            </div>
            <div className={cl.todo__navigate}>
                {!editMode
                    ? <img
                        src={editIcon}
                        alt=""
                        onClick={() => setEditMode(true)}
                        className={cl.todo__navigate_edit}/>
                    : <img
                        src={completeIcon}
                        alt=""
                        onClick={editTodo}
                        className={cl.todo__navigate_complete}/>
                }
                <img src={removeIcon} alt='' className={cl.todo__navigate_remove} onClick={removeTodo}/>
            </div>
        </div>
    );
};

export default TodoItem;