import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default class App extends Component {
  state = {
    items: localStorage.getItem("react-todo-list")
      ? JSON.parse(localStorage.getItem("react-todo-list"))
      : [],
    id: uuidv4(),
    item: "",
    editItem: false,
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("In handlesubmit");
    const newItem = {
      id: this.state.id,
      title: this.state.item,
    };
    const updatedItems = [...this.state.items, newItem];
    this.setState(
      {
        items: updatedItems,
        item: "",
        id: uuidv4(),
        editItem: false,
      },
      () => {
        localStorage.setItem(
          "react-todo-list",
          JSON.stringify(this.state.items)
        );
      }
    );
  };

  clearList = () => {
    this.setState({
      items: [],
    });
  };

  handleEdit = (id) => {
    if (this.state.editItem === true) {
      return;
    }
    const filterItems = this.state.items.filter((item) => item.id !== id);
    const selectedItem = this.state.items.find((item) => item.id === id);
    this.setState({
      items: filterItems,
      item: selectedItem.title,
      id: id,
      editItem: true,
    });
  };

  handleDelete = (id) => {
    const filterItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filterItems,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-5">
            <h3 className="text-capitalize text-center">Todo Input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              editItem={this.state.editItem}
            />
          </div>
        </div>
      </div>
    );
  }
}
