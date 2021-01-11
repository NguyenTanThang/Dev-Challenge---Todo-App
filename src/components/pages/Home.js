import React, { Component } from 'react';
import TodoItem from "../todo/TodoItem";
import TabGenerator from "../partials/TabGenerator";
import AddTodo from "../todo/AddTodo";
import shortid from "shortid";

class Home extends Component {

    state = {
        todoList: []
    }

    componentDidMount() {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        
        if (storedTodos && storedTodos.length >= 1) {
            this.setState({
                todoList: storedTodos
            })
        } else {
            this.setState({
                todoList: [
                    {
                        id: shortid.generate(),
                        task: "Active Task",
                        isCompleted: false
                    },
                    {
                        id: shortid.generate(),
                        task: "Completed Task",
                        isCompleted: true
                    }
                ]
            })
        }
    }

    renderAllTodo = () => {
        const {completeTodo} = this;
        const {todoList} = this.state;

        return todoList.map((todoItem) => {
            return <TodoItem todoItem={todoItem} key={todoItem.id} completeTodo={completeTodo}/>
        })
    }

    renderActiveTodo = () => {
        const {completeTodo} = this;
        const {todoList} = this.state;

        return todoList.filter(todoItem => {
            return todoItem.isCompleted === false;
        }).map((todoItem) => {
            return <TodoItem completeTodo={completeTodo} todoItem={todoItem} key={todoItem.id}/>
        })
    }

    renderCompletedTodo = () => {
        const {completeTodo, deleteTodo} = this;
        const {todoList} = this.state;

        return todoList.filter(todoItem => {
            return todoItem.isCompleted === true;
        }).map((todoItem) => {
            return <TodoItem completeTodo={completeTodo} todoItem={todoItem} key={todoItem.id} withDelete deleteTodo={deleteTodo}/>
        })
    }

    addTodo = (newTodo) => {
        const {task} = newTodo;
        const initTodo = {
            id: shortid.generate(),
            task,
            isCompleted: false
        }

        let storedTodos = JSON.parse(localStorage.getItem("todos"));
        
        if (storedTodos) {
            localStorage.setItem("todos", JSON.stringify([initTodo, ...storedTodos]));
        } else {
            localStorage.setItem("todos", JSON.stringify([initTodo]));
        }

        storedTodos = JSON.parse(localStorage.getItem("todos"));

        this.setState({
            todoList: [...storedTodos]
        })
    }

    completeTodo = (todo) => {
        const {id} = todo;

        let storedTodos = JSON.parse(localStorage.getItem("todos"));

        storedTodos = storedTodos.map(storedTodoItem => {
            if (storedTodoItem.id === id) {
                return {
                    ...storedTodoItem,
                    isCompleted: !storedTodoItem.isCompleted
                }
            }
            return storedTodoItem
        })

        localStorage.setItem("todos", JSON.stringify([...storedTodos]));

        this.setState({
            todoList: [...storedTodos]
        })
    }

    deleteTodo = (todo) => {
        const {id} = todo;

        let storedTodos = JSON.parse(localStorage.getItem("todos"));

        storedTodos = storedTodos.filter(storedTodoItem => {
            return storedTodoItem.id !== id;
        })

        localStorage.setItem("todos", JSON.stringify([...storedTodos]));

        this.setState({
            todoList: [...storedTodos]
        })
    }

    deleteAllCompletedTodo = () => {
        let storedTodos = JSON.parse(localStorage.getItem("todos"));

        storedTodos = storedTodos.filter(storedTodoItem => {
            return !storedTodoItem.isCompleted;
        })

        localStorage.setItem("todos", JSON.stringify([...storedTodos]));

        this.setState({
            todoList: [...storedTodos]
        })
    }

    renderTabGen = () => {
        const {renderAllTodo, renderActiveTodo, renderCompletedTodo, addTodo, deleteAllCompletedTodo} = this;

        const tabHeaders = [
            "All",
            "Active",
            "Completed"
        ]

        const tabContents = [
            (
                <>
                    <AddTodo addTodo={addTodo}/>
                    <ul>
                        {renderAllTodo()}
                    </ul>
                </>
            ),
            (
                <>
                    <ul>
                        {renderActiveTodo()}
                    </ul>
                </>
            ),
            (
                <>
                    <ul>
                        {renderCompletedTodo()}
                    </ul>
                    <div className="tab-content__footer">
                        <button className="btn btn-danger btn--icon" onClick={deleteAllCompletedTodo}>
                            <span className="material-icons">
                                delete
                            </span>
                            <p>delete all</p>
                        </button>
                    </div>
                </>
            ),
        ]

        return <TabGenerator tabHeaders={tabHeaders} tabContents={tabContents}/>
    }

    render() {
        const {renderTabGen} = this;

        return (
            <div className="home">
                <h1 className="home__title">#todo</h1>
                {renderTabGen()}
            </div>
        )
    }
}

export default Home;
