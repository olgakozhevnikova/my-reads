import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
	state = {}

	showShelf(books, shelfTitle) {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<Book
					filteredBooks={books}
					changeShelf={this.props.changeShelf}
				/>
			</div>
		)
	}

	render() {
		const { books } = this.props

		const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const read = books.filter(book => book.shelf === "read")
    const wantToRead = books.filter(book => book.shelf === "wantToRead")

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
