import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieService } from './movies/movies.service';

@Module({
  imports: [MovieService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
