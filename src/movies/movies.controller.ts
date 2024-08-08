import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './fakeMoviesDB';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Get('/:id')
  getMovie(@Param('id') id: string): Movie | undefined {
    return this.moviesService.getMovie(+id);
  }

  @Post()
  addMovie(@Body() body: Partial<Movie>): Movie {
    if (!body.title) throw new Error('movie title is required');
    return this.moviesService.create(body);
  }

  @Put('/:id')
  updateMovie(
    @Param('id') id: string,
    @Body() body: Partial<Movie>,
  ): Movie | undefined {
    return this.moviesService.update(+id, body);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string): Movie[] {
    return this.moviesService.delete(+id);
  }
}
