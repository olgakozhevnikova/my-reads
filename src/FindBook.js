import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class FindBook extends Component {
	state = {
    query: '',
    searchedBooks: []
	}

	// search for a book
	searchBook = (event) => {
		const value = event.target.value

		if (value) {
			BooksAPI.search(value)
			.then(books => {
				if(!books || books.hasOwnProperty('error')) {
					this.setState({ searchedBooks: [] })
				} else {
          books.map(book => {
            if (!('imageLinks' in book)) {
              book['imageLinks'] = {thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtHwSGWmOPJ5I7NHC-a7bJzUf4MnEDTDOP5_3ySSwxklK19PU'}
            }
            book.shelf = this.addShelf(book)
            return book
          })
          this.setState({ searchedBooks: books })
				}
			})
		}
		else {
			this.setState( { searchedBooks: [] })
    }
    this.setState({ query: value.trim() })
	}

	addShelf(item) {
    let shelf = this.props.books.filter(book => book.id === item.id)
    return shelf.length ? shelf[0].shelf : 'none'
	}

  render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={this.searchBook}
						/>

					</div>
				</div>
				<div className="search-books-results">
          <Book
            filteredBooks={this.state.searchedBooks}
            changeShelf={this.props.changeShelf}
          />
				</div>
			</div>
		)
	}
}

export default FindBook