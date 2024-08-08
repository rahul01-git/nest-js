import { Injectable } from '@nestjs/common';
import { Book, books } from './fakeBooksDB';

@Injectable()
export class BookService {
  getAllBooks(): Book[] {
    return books;
  }

  getBook(id: number): Book | undefined {
    return books.find((book) => book.id === id);
  }

  create(book: Partial<Book>): Book {
    const newId = books[books.length - 1].id + 1;
    const newBook: Book = {
      id: newId,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };
    books.push(newBook);
    return newBook;
  }

  update(id: number, book: Partial<Book>): Book | undefined {
    const currentBook = books.find((book) => book.id === id);
    const updatedBook = {
      id,
      title: book.title ?? currentBook.title,
      author: book.author ?? currentBook.author,
      publicationYear: book.publicationYear ?? currentBook.publicationYear,
    };
    books[id - 1] = updatedBook;
    return updatedBook;
  }

  delete(id: number): Book[] {
    const idx = books.findIndex((book) => book.id === id);
    if (idx !== -1) books.splice(idx, 1);
    return books;
  }
}
