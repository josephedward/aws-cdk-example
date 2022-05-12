import { Logger, Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

  
  getHello(): string {
    this.logger.log('TEST');
    return 'Hello World!';
  }
}
