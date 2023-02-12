import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    Get,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddListDTO } from './dto/add-list.dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';
  
  @ApiTags('list')
  @Controller('list')
  export class ListsController {
    constructor(
      private listsService: ListsService,
    ) {}
  
    // @UseGuards(JwtAuthGuard)
    @Post()
    async addList(
      @Body() list: AddListDTO,
    ): Promise<List[]> {
      return this.listsService.create(list);
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id/:owner')
    remove(@Param('id') id: number, @Param('owner') owner: number): Promise<List[]> {
      return this.listsService.delete(id, owner);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':owner')
    getByAccountId(@Param('owner') owner: number): Promise<List[]> {
      return this.listsService.getByAccountId(owner);
    }
  }
  