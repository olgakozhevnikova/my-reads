import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class FindBook extends Component {
	state = {
		books: [],
		currentBooks: []
	}

	// search for a book
	onSearch = (event) => {
		const value = event.target.value

		if (value) {
			BooksAPI.search(value)
			.then(books => {
				if(!books || books.hasOwnProperty('error')) {
					this.setState({ books: [] })
				} else {
					this.setState({ books: books })
				}
			})
		}
		else {
			this.setState( { books: [] })
		}
		
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
