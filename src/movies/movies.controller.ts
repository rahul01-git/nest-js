import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<{ message: string; data: Movie[] }> {
    const data = await this.moviesService.findAll();
    return {
      message: 'Movies fetched successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<{ message: string; data?: Movie }> {
    const movie = await this.moviesService.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return {
      message: 'Movie fetched successfully',
      data: movie,
    };
  }

  @Post()
  async create(
    @Body() movie: Partial<Movie>,
  ): Promise<{ message: string; data: Movie }> {
    const createdMovie = await this.moviesService.create(movie);
    return {
      message: 'Movie created successfully',
      data: createdMovie,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Movie>,
  ): Promise<{ message: string; data?: Movie }> {
    const data = await this.moviesService.update(id, updateData);
    return {
      message: 'Movie updated successfully',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const movie = await this.moviesService.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    await this.moviesService.delete(id);
    return {
      message: 'Movie deleted successfully',
    };
  }
}
