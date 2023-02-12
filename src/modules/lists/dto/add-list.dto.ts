import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddListDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly owner: number;

  @IsString()
  @IsNotEmpty()
  readonly listName: string;
}
