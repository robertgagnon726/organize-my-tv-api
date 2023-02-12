import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber()
  @IsNotEmpty()
  readonly accountId: number;

  @IsString()
  @IsNotEmpty()
  readonly currentPassword: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly newPassword: string;
}
