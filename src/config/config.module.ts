import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './config.injectable';

@Module({})
export class ConfigModule {
  //We can create a dynamic module who able us to handle the registration of a module as an import in another module
  //register must return an object who implements the DynamicModule interface
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
