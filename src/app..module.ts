import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [BooksModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
