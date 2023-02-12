import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddMovieDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly list: number;

  @IsString()
  @IsNotEmpty()
  readonly movieName: string;
}
