import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
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
			console.log(this.state)
		})
	}

	showShelf(books, shelfTitle) {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						<li>
							{books.map(book => (
								<Book book={book}/>
							))}
						</li>
					</ol>
				</div>
			</div>
		)
	}

  render() {
		const { currentlyReading, wantToRead, read } = this.props
		console.log(currentlyReading)
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{/* {this.showShelf(currentlyReading, 'Currently Reading')}
						{this.showShelf(wantToRead, 'Want to read')}
						{this.showShelf(read, 'Read')} */}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks
