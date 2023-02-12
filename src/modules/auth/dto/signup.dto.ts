import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string
}
