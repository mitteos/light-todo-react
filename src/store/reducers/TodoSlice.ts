import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../../types/types";

interface InitialStateInterface {
    todos: ITodo[]
}

const initialState: InitialStateInterface = {
    todos: []
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(el => el.id !== action.payload)
        },
        editTodoStatus(state, action: PayloadAction<number>) {
            const value = state.todos.find(el => el.id === action.payload)!.status
            state.todos.find(el => el.id === action.payload)!.status = !value
        },
        editTodo(state, action: PayloadAction<ITodo>) {
            state.todos.find(el => el.id === action.payload.id)!.title = action.payload.title
        }
    }
})

export default TodoSlice.reducer;