import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { UpdateCatDto } from 'src/cats/dto/update-cat.dto';
import { CatsService } from 'src/cats/cats.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';
import { Cat } from './entities/cat.entity';

//The controllers are the handlers who receibes the incoming request, each method of a controller class is a controller method who handle a route
//The controllers support Dependency injection
//With the decorator UseFilters we can register a exception filter to a controller
//With the decorator UseGuards we can register a guard to a controller
@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  //The method controller is defined with a http method Decorator, as Get()
  //The HttpCode Decorator abble us to specify the status code that returns the controller method
  //The params of the methods can receibe Decorators params, as Query who inject the query's of the incoming request
  //With the DefaultValuePipe we can define a default value to a pipe if the incoming value can be null or undefined as query param
  @Get()
  @HttpCode(200)
  findAll(
    @Query('age', new DefaultValuePipe(0), ParseIntPipe) age: number,
    @Query('breed') breed: string,
  ): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('error')
  getError() {
    //With the HttpException exception we can launch exceptions in run time who are handled by NestJS
    //The first argument can be a string or a object, this is the respose body
    //The second argument is the status code to response in the request
    //The constructor accept a third optional parameter named causes, this can be used to logging purposes and is not serialized in the responde body
    throw new HttpException(
      {
        error: 'this is an error',
        reason: 'I dont know',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  //We can specify a route parameter with the :name syntax, to access to a url param we can use the Param Decorator
  //The pipes are classes anotateds with the @Injectable() decorator, which implements the PipeTransform interface.
  //The pipes able us to transform or validate the incoming data in the parameters from a incoming request
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat | null> {
    return this.catsService.findOne(id);
  }

  //We can specify the structure of the espected body with the dto's
  //With a custom decorator we can attach metadata to the handler or the class controller, this metadata can be accesed by the ExecutionContext
  @Post()
  @Roles(['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    // const newCat = this.catsService.create(createCatDto);
    // return newCat;
  }

  //With the UsePipes decorator we can add a pipe to a request handler
  //When we use the UsePipes directive, the pipe will be applied to each param of the handler
  @Put(':id')
  // @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);

    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
