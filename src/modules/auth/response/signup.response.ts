import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class SignupResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly user: User;
}
