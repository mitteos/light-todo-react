import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/store";
import TodoItem from "./todoItem/todoItem";
import {ITodo} from "../types/types";
import {TodoSlice} from "../store/reducers/TodoSlice";
import plusIcon from '../static/plus.svg';

const TodoList = () => {

    const {todos} = useAppSelector(state => state.TodoSlice)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')

    const createTodo = (e: FormEvent<HTMLFormElement> | null = null) => {
        e?.preventDefault()
        const todo: ITodo = {
            id: Date.now(),
            title: value,
            status: false
        }
        value && dispatch(TodoSlice.actions.addTodo(todo))
        setValue('')
    }

    return (
        <div className="list">
            <div className="list__header">
                Todo list
            </div>
            <form onSubmit={(e) => createTodo(e)} className="list__form">
                <input type="text" placeholder='Create new todo...' value={value} onChange={(e) => setValue(e.target.value)} className="list__form-input"/>
                <img src={plusIcon} alt='' onClick={() => createTodo()} className="list__form-button" />
            </form>
            <div className="list__wrapper">
                {todos.length
                    ? todos.map(todo =>
                        <TodoItem  todo={todo}/>
                    )
                    : <div className="list__empty">Empty</div>
                }
            </div>
        </div>
    );
};

export default TodoList;