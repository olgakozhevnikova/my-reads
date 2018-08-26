import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: []
	}

	showShelf(books, shelfTitle) {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<Book
					books={books}
					changeShelf={this.props.changeShelf}
				/>
			</div>
		)
	}

	render() {
		const { books } = this.props

		const matchCurrentlyReading = new RegExp(escapeRegExp('currentlyReading'));
		let currentlyReading = books ? books.filter(book => matchCurrentlyReading.test(book.shelf)) : null;

		const matchWantToRead = new RegExp(escapeRegExp('wantToRead'));
		let wantToRead = books ? books.filter(book => matchWantToRead.test(book.shelf)) : null;

		const matchRead = new RegExp(escapeRegExp('read'));
		let read = books ? books.filter(book => matchRead.test(book.shelf)) : null;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{this.showShelf(currentlyReading, 'Currently Reading')}
						{this.showShelf(wantToRead, 'Want to read')}
						{this.showShelf(read, 'Read')}
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
