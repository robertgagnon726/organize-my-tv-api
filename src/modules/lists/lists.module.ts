import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { List } from './list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List]), TypeOrmModule.forFeature([User])],
  providers: [ListsService],
  exports: [TypeOrmModule],
  controllers: [ListsController],
})
export class ListsModule {}
