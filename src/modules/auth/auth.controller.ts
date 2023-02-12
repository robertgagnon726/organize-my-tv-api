import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { UsersService } from 'src/modules/users/users.service';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './response/login.response';
import { SignupResponse } from './response/signup.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Res() res,
    @Body() signupDto: SignupDto,
  ): Promise<SignupResponse> {
    try {
      await this.usersService.create(signupDto);
      const session = await this.authService.login(signupDto);

      return res.status(HttpStatus.OK).json(session);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message || 'There was an error',
        status: 400,
      });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword( @Body() changePasswordDto: ChangePasswordDto): Promise<User | string> {
    return this.authService.changePassword(changePasswordDto)
  }
}
