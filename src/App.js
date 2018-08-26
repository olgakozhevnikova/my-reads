import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import FindBook from './FindBook'
import * as BooksAPI from './BooksAPI'


class App extends Component {
  state = {
		books: []
  }

  componentDidMount() {
		BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeShelf = (e, selectedBook) => {
    const books = this.state.books
    const shelf = e.target.value;
    selectedBook.shelf = e.target.value
    this.setState({ books })
    
    BooksAPI.update(selectedBook, shelf)
    .then(() => {
      this.setState(state => ({
        books: state.books
          .filter(e => e.id !== selectedBook.id)
          .concat([selectedBook])
      }))
    })
  }  

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books = {this.state.books}
            changeShelf = {this.changeShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <FindBook
            books = {this.state.books}
            changeShelf = {this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default App
