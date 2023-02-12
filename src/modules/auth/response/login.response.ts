import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class LoginResponse {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly user: User;
}
