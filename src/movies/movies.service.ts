import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './movie.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: typeof Movie,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll();
  }

  async findOne(id: number): Promise<Movie | undefined> {
    return this.movieModel.findByPk(id);
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    return this.movieModel.create(movie);
  }

  async update(id: number, updateData: Partial<Movie>): Promise<Movie> {
    const [affectedCount] = await this.movieModel.update(updateData, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    await movie.destroy();
  }
}
