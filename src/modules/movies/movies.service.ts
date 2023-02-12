import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../lists/list.entity';
import { AddMovieDTO } from './dto/add-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @InjectRepository(List) private listsRepository: Repository<List>,
  ) {}

  async create(movie: AddMovieDTO): Promise<Movie[]> {
    try {
      const list = await this.listsRepository.findOneBy({ id: movie.list })

      const _movie = new Movie();
      _movie.list = list;
      _movie.movieName = movie.movieName;

      await this.moviesRepository.save(_movie);

      return this.moviesRepository.find({
        where: {
          list: {
            id: movie.list
          }
      },
    })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async delete(id: number, listId: number): Promise<Movie[]> {
    try {
      await this.moviesRepository.delete(id);
      return this.moviesRepository.find({
        where: {
          list: {
            id: listId
          }
      },
    })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async getByListId(listId: number): Promise<Movie[]> {
    try {
      return this.moviesRepository.find({
        where: {
          list: {
            id: listId
          }
      },
      })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }
}
