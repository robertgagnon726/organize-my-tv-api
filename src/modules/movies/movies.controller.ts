import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    Query,
    Get,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddMovieDTO } from './dto/add-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
  
  @ApiTags('movie')
  @Controller('movie')
  export class MoviesController {
    constructor(
      private moviesService: MoviesService,
    ) {}
  
    // @UseGuards(JwtAuthGuard)
    @Post()
    async add(
      @Body() movie: AddMovieDTO,
    ): Promise<Movie[]> {
      return this.moviesService.create(movie);
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id/:listId')
    remove(@Param('id') id: number, @Query('listId') listId: number): Promise<Movie[]> {
      return this.moviesService.delete(id, listId);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':listId')
    getByAccountId(@Param('listId') listId: number): Promise<Movie[]> {
      return this.moviesService.getByListId(listId);
    }
  }
  