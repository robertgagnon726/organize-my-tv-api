import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from '../lists/list.entity';
import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TypeOrmModule.forFeature([List])],
  providers: [MoviesService],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
