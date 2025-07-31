import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Module({
  controllers: [DogsController],
  providers: [
    DogsService,
    //We can register global guards to a module this way if the guard implement a Dependency that must be injected
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class DogsModule {}
