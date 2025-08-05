import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './config.injectable';
import { ModuleRef } from '@nestjs/core';
import { CatsService } from 'src/cats/cats.service';

@Injectable()
export class ConfigService {
  //In a service from a dynamic module we can use dependency injection with all of providers
  //ModuleRef is a injectable class who able us to access to any providers from the current module
  constructor(
    @Inject(CONFIG_OPTIONS) private options: Record<string, any>,
    private moduleRef: ModuleRef,
  ) {
    //With the get method we can acess to an instance of an provider from the current module
    const anotherOptions =
      this.moduleRef.get<Record<string, any>>(CONFIG_OPTIONS);
    //With the config strict: false we can search providers instances from the global scope
    const catService = this.moduleRef.get(CatsService, { strict: false });
  }
}
