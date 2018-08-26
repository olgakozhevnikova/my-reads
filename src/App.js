import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import FindBook from './FindBook'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'


class App extends Component {
  state = {
		currentlyReading: [],
		wantToRead: [],
		read: []
  }

  componentDidMount() {
		this.getBooks()
  }

  getBooks() {
		BooksAPI.getAll().then(books => {
			// escapeRegExp means: if there are any special characters (backslash, etc) inside the query,
      // then go ahead and escape them,
      // so we use those special characters as a string literal
      // rather than these special regexp characters
			const matchCurrentlyReading = new RegExp(escapeRegExp('currentlyReading'));
			let currentlyReading = books ? books.filter(book => matchCurrentlyReading.test(book.shelf)) : null;

			const matchWantToRead = new RegExp(escapeRegExp('wantToRead'));
			let wantToRead = books ? books.filter(book => matchWantToRead.test(book.shelf)) : null;

			const matchRead = new RegExp(escapeRegExp('read'));
			let read = books ? books.filter(book => matchRead.test(book.shelf)) : null;

			this.setState({ currentlyReading, wantToRead, read });
		})
	}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
          />
        )}/>
        <Route path="/search" component={FindBook}/>
      </div>
    )
  }
}

export default App
