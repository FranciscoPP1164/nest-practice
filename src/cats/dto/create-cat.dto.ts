import { IsInt, IsString } from 'class-validator';

//dto is the acronym of Data Transfer Object, with a dto we can specify the spected body from the incoming request
//Using the depency class-validator we can validate each body field from the incoming request
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
