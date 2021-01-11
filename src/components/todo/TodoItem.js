import React, { Component } from 'react'

class TodoItem extends Component {

    render() {
        const {todoItem, completeTodo, withDelete} = this.props;
        const {
            id,
            task,
            isCompleted
        } = todoItem;

        const inputElement = isCompleted ? (
            <input type="checkbox" defaultChecked="checked" onChange={() => completeTodo(todoItem)} />
        ) : (
            <input type="checkbox" onChange={() => completeTodo(todoItem)} />
        )
        const completedClass = isCompleted ? "completed" : "";

        if (isCompleted && withDelete) {
            const {deleteTodo} = this.props;

            return (
                <li className={`todo-item with-delete ${completedClass}`}>
                    <label className="container-checkbox">
                        <p>{task}</p>
                        {inputElement}
                        <span className="checkmark"></span>
                    </label>
                    <span className="material-icons" onClick={() => deleteTodo(todoItem)}>
                        delete
                    </span>
                </li>
            )
        }

        return (
            <li className={`todo-item ${completedClass}`}>
                <label className="container-checkbox">
                    <p>{task}</p>
                    {inputElement}
                    <span className="checkmark"></span>
                </label>
            </li>
        )
    }
}

export default TodoItem;