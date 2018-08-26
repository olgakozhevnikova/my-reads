import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { filteredBooks } = this.props

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredBooks.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  {book.imageLinks.thumbnail && (
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  )}
                  <div className="book-shelf-changer">
                    <select
                        name="shelf"
                        onChange={event => this.props.changeShelf(event, book)}
                        value={book.shelf}>
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
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Book