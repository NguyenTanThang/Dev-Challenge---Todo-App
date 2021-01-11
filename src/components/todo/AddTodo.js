import React, { Component } from 'react'

class AddTodo extends Component {

    state = {
        task: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {task} = this.state;
        const {addTodo} = this.props;
        addTodo({task});
    }

    render() {
        const {onSubmit, onChange} = this;

        return (
            <div>
                <form id="add-todo-form" method="POST" onSubmit={onSubmit}>
                    <div className="add-todo-form__container">
                        <input className="add-todo-form-container__input form-control" name="task" id="task" placeholder="Add todo" onChange={onChange}/>
                        <button type="submit" className="btn btn-primary add-todo-form-container__button">Add</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTodo;
