import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { DataSource, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async findById(accountId: number): Promise<User> {
    return this.usersRepository.findOneBy({ accountId })
  }

  async create(user: SignupDto): Promise<void> {
    try {
      await this.usersRepository.save(user);
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async updateUser(userDto: UpdateUserDto): Promise<User> {
    const { accountId } = userDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(userDto);  
      await queryRunner.commitTransaction();
    } catch (err) {

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return this.usersRepository.findOneBy({ accountId });
  }

  async setConfirmationCode(email: string, confirmationCode: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save({ email, confirmationCode });
      await queryRunner.commitTransaction();
    } catch (err) {

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    
    return;
  }
}
