import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserResponse } from './response/update-user.response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('update-user')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const user = await this.usersService.updateUser(updateUserDto);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }
}
