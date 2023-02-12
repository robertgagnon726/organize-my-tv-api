import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/user.entity';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginResponse } from './response/login.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.checkPassword(pass)) {
      return user;
    }
    return null;
  }

  async signup(user: SignupDto): Promise<User> {
    try {
      await this.usersService.create(user);

      const userRes = await this.usersService.findByEmail(user.email);
      return userRes;
    } catch (e) {
      return e.message || 'There was an error';
    }
  }

  async login(user: any): Promise<LoginResponse> {
    const resUser = await this.usersService.findByEmail(user.email);

    const payload = { email: resUser?.email, _id: resUser?.accountId };
    const token = this.jwtService.sign(payload);

    if (!resUser) {
      return {
        token: null,
        user: null,
      }
    } else {
      return {
        token,
        user: resUser,
      };
    }

  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<User | string> {
    try {
      const { accountId } = changePasswordDto;
      const user = await this.usersService.findById(accountId);
      if (!user) {
        return 'There was no user with that ID';
      }

      if (!user.checkPassword(changePasswordDto.currentPassword)) {
        return 'That current password is not correct'
      }
      if (user && user.checkPassword(changePasswordDto.currentPassword)) {
        const updates: UpdateUserDto = {
          accountId,
          password: changePasswordDto.newPassword,
        }
        await this.usersService.updateUser(updates)
        return user;
      }

      return null
    } catch (e) {
      return e.message || 'There was an error';
    }
  }
}
