import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
	changeShelf = (book, shelf) => {
		const newBooks = []
		BooksAPI.update(book, shelf)
		.then(books => {
			Object.keys(books).forEach(shelf => {
				const book = books[shelf].map(id => ({ id: id, shelf: shelf}))
				newBooks.push(book)
			})
			return newBooks
		})
	}

	showShelf(books, shelfTitle) {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book => (
							<li key={book.id}>
								<Book 
									book={book}
									onShelfChange={this.changeShelf}/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}

  render() {
		const { currentlyReading, wantToRead, read } = this.props

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
