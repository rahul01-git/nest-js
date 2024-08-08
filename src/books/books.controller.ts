import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './books.service';
import { Book } from './fakeBooksDB';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  getBook(@Param('id') id: string): Book {
    return this.booksService.getBook(+id);
  }

  @Post()
  addBook(@Body() book: Partial<Book>): Book {
    const bookData = book;

    if (!book.title || !book.author || !book.publicationYear)
      throw new Error('Title, author and year required');
    return this.booksService.create(bookData);
  }

  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body() book: Partial<Book>,
  ): Book | undefined {
    return this.booksService.update(+id, book);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string): Book[] {
    return this.booksService.delete(+id);
  }
}
