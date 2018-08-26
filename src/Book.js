import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  changeShelf = (book, shelf) => {
		const newBooks = []
		BooksAPI.update(book, shelf)
		.then(books => {
			Object.keys(books).forEach(shelf => {
				const book = books[shelf].map(id => ({ id: id, shelf: shelf}))
        newBooks.push(book)
        this.props.onShelfChange(newBooks)
      })
		})
  }

  render() {
    const { book, onShelfChange } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select 
                onChange={event => this.changeShelf(book, event.target.value)}
                value={book.shelf ? book.shelf : ''}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book