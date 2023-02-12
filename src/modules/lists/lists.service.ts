import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { AddListDTO } from './dto/add-list.dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listsRepository: Repository<List>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(list: AddListDTO): Promise<List[]> {
    try {
      const user = await this.usersRepository.findOneBy({ accountId: list.owner })

      const _list = new List();
      _list.owner = user;
      _list.listName = list.listName
      await this.listsRepository.save(_list);

      return this.listsRepository.find({
        where: {
          owner: {
            accountId: list.owner
          }
      },
    })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async delete(id: number, owner: number): Promise<List[]> {
    try {
      await this.listsRepository.delete(id);
      return this.listsRepository.find({
        where: {
          owner: {
            accountId: owner
          }
      },
      })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async getByAccountId(owner: number): Promise<List[]> {
    try {
      return this.listsRepository.find({
        where: {
          owner: {
            accountId: owner
          }
      },
      })
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }
}
