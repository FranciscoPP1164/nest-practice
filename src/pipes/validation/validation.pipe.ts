import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

//We can create custom pipes who can modify the data from the incoming request, is implemented like the basic pipes
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Logica de validación');
    console.log(value);
    return value;
  }
}
