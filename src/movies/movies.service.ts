import { Injectable } from '@nestjs/common';
import { Movie, movies } from './fakeMoviesDB';

@Injectable()
export class MoviesService {
  getAllMovies(): Movie[] {
    return movies;
  }

  getMovie(id: number): Movie | undefined {
    return movies.find((movie) => movie.id === id);
  }

  create(movie: Partial<Movie>): Movie {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie: Movie = {
      id: newId,
      title: movie.title ?? '',
    };
    movies.push(newMovie);
    return newMovie;
  }

  update(id: number, movie: Partial<Movie>): Movie | undefined {
    const idx = movies.findIndex((mov) => mov.id === id);
    movies[idx].title = movie.title;
    return movies[idx];
  }

  delete(id: number): Movie[] {
    const idx = movies.findIndex((mov) => mov.id === id);
    if (idx !== -1) movies.splice(idx, 1);
    return movies;
  }
}
