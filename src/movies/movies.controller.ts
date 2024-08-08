import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() movie: Partial<Movie>): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Movie>,
  ): Promise<[number]> {
    return this.moviesService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.moviesService.delete(id);
  }
}
