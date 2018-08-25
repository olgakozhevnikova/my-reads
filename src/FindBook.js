import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class FindBook extends Component {
	state = {
		books: [],
		currentBooks: []
	}

	// componentDidMount() {
	// 	BooksAPI.getAll()
	// 	.then(books => {
	// 		// Get rid of all other properties except book id
	// 		const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
	// 		this.setState({ currentBooks: booksId })
	// 	})
	// }

	// search for a book
	onSearch = (event) => {
		const value = event.target.value

		BooksAPI.search(value)
		.then(books => {
			this.setState({ books: books })
			console.log(this.state)
		})
	}

  render() {
		const { books, currentBooks } = this.state

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={this.onSearch}
						/>

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid" data={books.title}>
						{books.map(book => (
							<li key={book.id}>
								<img src={book.imageLinks.smallThumbnail} alt={book.title}/>
								<p>{book.title}</p>
								<p>{book.authors}</p>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default FindBook
