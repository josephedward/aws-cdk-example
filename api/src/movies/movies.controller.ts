import { Controller, Get } from '@nestjs/common';
import {MovieService, Movie} from './movies.service';


@Controller()
export class AppController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(): Movie[] {
    return this.movieService.getMovies();
  }
}