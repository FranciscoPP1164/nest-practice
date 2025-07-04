import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { UpdateCatDto } from 'src/cats/dto/update-cat.dto';
import { Cat } from 'src/cats/interfaces/cat';
import { CatsService } from 'src/cats/cats.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('cats')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Query('age') age: number, @Query('breed') breed: string): string {
    return `finded all cats filtereds by ${age} and ${breed}!`;
  }

  @Get('error')
  getError() {
    throw new HttpException(
      {
        error: 'this is an error',
        reason: 'I dont know',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): string {
    console.log(id);

    return `find the cat with id ${id}`;
  }

  @Post()
  @Roles(['admin'])
  create(@Body() createCatDto: CreateCatDto): Cat {
    const newCat = this.catsService.create(createCatDto);
    return newCat;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);

    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
