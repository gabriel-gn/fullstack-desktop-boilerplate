import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRoutingModule } from './app.routing.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    AppRoutingModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    AppGateway,
  ]
})
export class AppModule {
}
