import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { book } = this.props
    return (
      <div>
        <img src={book.imageLinks.smallThumbnail} alt={book.title}/>
        <p>{book.title}</p>
        <p>{book.authors}</p>
      </div>
    )
  }
}

export default Book