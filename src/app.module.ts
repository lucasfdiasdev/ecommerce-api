import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AllExceptionFilter } from './httpExceptionFilter';

const mongodbUrl = process.env.MONGODB_URL;

@Module({
  imports: [MongooseModule.forRoot(mongodbUrl)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
